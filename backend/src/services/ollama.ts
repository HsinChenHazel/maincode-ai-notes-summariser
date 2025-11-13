// Using native fetch (Node.js 18+)

const OLLAMA_BASE_URL = process.env.OLLAMA_URL || 'http://ollama:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama3.2:3b';

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export class OllamaService {
  async generateSummary(content: string): Promise<string> {
    const prompt = `Please provide a concise summary of the following notes. Focus on the key points and main ideas. Keep it brief and clear.

Notes:
${content}

Summary:`;

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
      return data.response.trim();
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

