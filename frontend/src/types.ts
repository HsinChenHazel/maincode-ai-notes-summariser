export interface Note {
  id: string;
  content: string;
  summary: string;
  createdAt: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

