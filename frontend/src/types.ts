export interface Note {
  id: string;
  content: string;
  title?: string; // Optional for backward compatibility with existing notes
  summary: string;
  createdAt: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

