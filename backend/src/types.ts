export interface Note {
  id: string;
  content: string;
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

