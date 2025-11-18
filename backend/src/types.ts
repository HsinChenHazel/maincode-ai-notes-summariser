export interface Note {
  id: string;
  content: string;
  title?: string; // Optional for backward compatibility with existing notes
  summary: string;
  createdAt: string;
}

export interface CreateNoteRequest {
  content: string;
}

export interface CreateNoteResponse {
  note: Note;
}

export interface GetNotesResponse {
  notes: Note[];
}

