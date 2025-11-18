// Using native fetch (Node.js 18+)

const OLLAMA_BASE_URL = process.env.OLLAMA_URL || 'http://ollama:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama3.2:3b';

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export interface SummaryResult {
  title: string;
  summary: string;
}

export class OllamaService {
  async generateSummary(content: string): Promise<SummaryResult> {
    const prompt = `Analyze the following notes and provide a concise title and summary in JSON format.

Requirements:
- Title: A brief, descriptive title (max 60 characters) that captures the main topic
- Summary: An insightful, concise summary focusing on key points and main ideas
- Do NOT include introductory phrases like "Here is a summary" or "Summary:" in the output
- Return ONLY valid JSON in this exact format: {"title": "...", "summary": "..."}

Notes:
${content}

JSON Response:`;

    try {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          prompt: prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json() as OllamaResponse;
      const rawResponse = data.response.trim();

      // Try to parse JSON response
      try {
        // Extract JSON from response (might have markdown code blocks or extra text)
        let jsonStr = rawResponse;
        
        // Remove markdown code blocks if present
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Try to extract JSON object if wrapped in text
        const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonStr = jsonMatch[0];
        }

        const parsed = JSON.parse(jsonStr) as { title?: string; summary?: string };
        
        if (parsed.title && parsed.summary) {
          // Clean up summary - remove any introductory phrases
          let cleanSummary = parsed.summary.trim();
          cleanSummary = cleanSummary.replace(/^(Here is|This is|The following is|Summary:|Here's a concise summary)[\s:]*/i, '');
          cleanSummary = cleanSummary.trim();
          
          // Ensure title is max 60 characters
          let cleanTitle = parsed.title.trim();
          if (cleanTitle.length > 60) {
            cleanTitle = cleanTitle.substring(0, 57) + '...';
          }
          
          return {
            title: cleanTitle,
            summary: cleanSummary,
          };
        }
      } catch (parseError) {
        // JSON parsing failed, try fallback parsing
        console.warn('Failed to parse JSON response, trying fallback parsing:', parseError);
      }

      // Fallback: Try to extract title and summary from text format
      const titleMatch = rawResponse.match(/title["\s:]+(.+?)(?:\n|summary|$)/i);
      const summaryMatch = rawResponse.match(/summary["\s:]+(.+?)$/is);
      
      if (titleMatch && summaryMatch) {
        let title = titleMatch[1].trim();
        let summary = summaryMatch[1].trim();
        
        // Clean up summary
        summary = summary.replace(/^(Here is|This is|The following is|Summary:|Here's a concise summary)[\s:]*/i, '');
        summary = summary.trim();
        
        // Ensure title is max 60 characters
        if (title.length > 60) {
          title = title.substring(0, 57) + '...';
        }
        
        return { title, summary };
      }

      // Final fallback: Use default title and use entire response as summary
      const defaultTitle = 'Note Summary';
      let summary = rawResponse.trim();
      summary = summary.replace(/^(Here is|This is|The following is|Summary:|Here's a concise summary)[\s:]*/i, '');
      summary = summary.trim();
      
      return {
        title: defaultTitle,
        summary: summary || 'No summary generated.',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate summary: ${error.message}`);
      }
      throw new Error('Failed to generate summary: Unknown error');
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async ensureModel(): Promise<void> {
    try {
      // Check if model exists
      const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Ollama service is not available');
      }

      const data = await response.json() as { models: Array<{ name: string }> };
      const modelExists = data.models?.some(m => m.name === MODEL);

      if (!modelExists) {
        console.log(`Model ${MODEL} not found. Pulling model...`);
        
        // Pull the model (Ollama returns streaming JSON even with stream: false)
        const pullResponse = await fetch(`${OLLAMA_BASE_URL}/api/pull`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: MODEL,
            stream: false,
          }),
        });

        if (!pullResponse.ok) {
          const errorText = await pullResponse.text();
          throw new Error(`Failed to pull model: ${errorText}`);
        }

        // Read the response - Ollama may return streaming JSON lines
        const reader = pullResponse.body?.getReader();
        if (reader) {
          const decoder = new TextDecoder();
          let done = false;
          let lastStatus = '';

          while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = streamDone;
            
            if (value) {
              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n').filter(line => line.trim());
              
              for (const line of lines) {
                try {
                  const data = JSON.parse(line);
                  if (data.status) {
                    lastStatus = data.status;
                    if (data.status.includes('pulling') || data.status.includes('downloading')) {
                      process.stdout.write(`\r${data.status}...`);
                    }
                  }
                  if (data.done === true) {
                    console.log(`\nModel ${MODEL} pulled successfully`);
                    done = true;
                    break;
                  }
                } catch (e) {
                  // Skip invalid JSON lines
                }
              }
            }
          }
        } else {
          // Fallback: try to parse as single JSON response
          const pullData = await pullResponse.json();
          console.log(`Model ${MODEL} pulled successfully`);
        }
      } else {
        console.log(`Model ${MODEL} already exists`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error ensuring model: ${error.message}`);
        throw error;
      }
      throw new Error('Failed to ensure model: Unknown error');
    }
  }
}

