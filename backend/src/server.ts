import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import notesRouter from './routes/notes';
import { OllamaService } from './services/ollama';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', async (req, res) => {
  const ollamaService = new OllamaService();
  const ollamaHealthy = await ollamaService.checkHealth();
  
  res.json({
    status: 'ok',
    ollama: ollamaHealthy ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/notes', notesRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: err.message 
  });
});

// Initialize Ollama model on startup
async function initializeModel() {
  const ollamaService = new OllamaService();
  
  // Wait for Ollama to be ready (with retries)
  let retries = 30;
  while (retries > 0) {
    try {
      const isHealthy = await ollamaService.checkHealth();
      if (isHealthy) {
        console.log('Ollama service is ready');
        break;
      }
    } catch (error) {
      // Continue retrying
    }
    
    retries--;
    if (retries > 0) {
      console.log(`Waiting for Ollama service... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  if (retries === 0) {
    console.warn('Warning: Ollama service not available. Model will be pulled on first request.');
    return;
  }

  // Ensure model is available
  try {
    await ollamaService.ensureModel();
  } catch (error) {
    console.error('Failed to ensure model on startup:', error);
    console.warn('Model will be pulled on first request.');
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  
  // Initialize model asynchronously (don't block server startup)
  initializeModel().catch(err => {
    console.error('Model initialization error:', err);
  });
});

