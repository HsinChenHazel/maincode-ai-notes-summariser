import { Note } from '../types';
import * as fs from 'fs';
import * as path from 'path';

const DATA_FILE = path.join(__dirname, '../../data/notes.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export class StorageService {
  private notes: Note[] = [];

  constructor() {
    this.loadNotes();
  }

  private loadNotes(): void {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        this.notes = JSON.parse(data);
      } else {
        this.notes = [];
        this.saveNotes();
      }
    } catch (error) {
      console.error('Error loading notes:', error);
      this.notes = [];
    }
  }

  private saveNotes(): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.notes, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving notes:', error);
      throw new Error('Failed to save notes');
    }
  }

  createNote(note: Note): Note {
    this.notes.unshift(note); // Add to beginning for newest first
    this.saveNotes();
    return note;
  }

  getAllNotes(): Note[] {
    return [...this.notes];
  }

  getNoteById(id: string): Note | undefined {
    return this.notes.find(note => note.id === id);
  }
}

