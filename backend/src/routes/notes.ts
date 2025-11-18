import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { OllamaService } from '../services/ollama';
import { StorageService } from '../services/storage';
import { CreateNoteRequest, Note } from '../types';

const router = Router();
const ollamaService = new OllamaService();
const storageService = new StorageService();

// POST /api/notes - Create a new note and generate summary
router.post('/', async (req: Request, res: Response) => {
  try {
    const { content }: CreateNoteRequest = req.body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ error: 'Note content is required and cannot be empty' });
    }

    if (content.length > 10000) {
      return res.status(400).json({ error: 'Note content is too long (max 10000 characters)' });
    }

    // Generate summary using Ollama
    let summaryResult: { title: string; summary: string };
    try {
      summaryResult = await ollamaService.generateSummary(content);
    } catch (error) {
      // If model not found, try to pull it
      if (error instanceof Error && error.message.includes('not found')) {
        console.log('Model not found, attempting to pull...');
        try {
          await ollamaService.ensureModel();
          // Retry generating summary
          summaryResult = await ollamaService.generateSummary(content);
        } catch (pullError) {
          console.error('Failed to pull model:', pullError);
          return res.status(503).json({ 
            error: 'AI model is not available. Please wait a moment and try again.',
            details: pullError instanceof Error ? pullError.message : 'Unknown error'
          });
        }
      } else {
        console.error('Ollama error:', error);
        return res.status(503).json({ 
          error: 'AI service is currently unavailable. Please try again later.',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Create note
    const note: Note = {
      id: uuidv4(),
      content: content.trim(),
      title: summaryResult.title,
      summary: summaryResult.summary,
      createdAt: new Date().toISOString(),
    };

    // Save note
    const savedNote = storageService.createNote(note);

    res.status(201).json({ note: savedNote });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/notes - Get all notes
router.get('/', (req: Request, res: Response) => {
  try {
    const notes = storageService.getAllNotes();
    res.json({ notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/notes/:id - Get a specific note
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = storageService.getNoteById(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;

