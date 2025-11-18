import { Note } from '../types';
import { Card } from '@/components/ui/Card';


interface SummaryDisplayProps {
  note: Note | null;
  isLoading: boolean;
  error: string | null;
}

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ note, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card className="flex h-full min-h-0 flex-col">
        <h2 className="mb-4 text-lg font-medium text-text-primary">AI Summary</h2>
        <div className="space-y-3">
          <div className="h-3 rounded-full bg-background-secondary animate-pulse" />
          <div className="h-3 w-5/6 rounded-full bg-background-secondary animate-pulse" />
          <div className="h-3 w-4/6 rounded-full bg-background-secondary animate-pulse" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex h-full min-h-0 flex-col border-error bg-error-light">
        <h2 className="mb-2 text-lg font-medium text-error-dark">Error</h2>
        <p className="text-sm text-error">{error}</p>
      </Card>
    );
  }
  
  if (!note) {
    return (
      <Card className="flex h-full min-h-0 flex-col">
        <h2 className="mb-4 text-lg font-medium text-text-primary">AI Summary</h2>
        <p className="text-text-secondary">
          Enter notes above to generate an AI-powered summary.
        </p>
      </Card>
    );
  }

  return (
    <Card className="flex h-full min-h-0 flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-text-primary">AI Summary</h2>
        <span className="text-xs text-text-secondary">
          {new Date(note.createdAt).toLocaleString()}
        </span>
      </div>
  
      <div className="flex-1 overflow-y-auto">
        <p className="whitespace-pre-wrap leading-relaxed text-text-primary opacity-80">
          {note.summary}
        </p>
      </div>
    </Card>
  );
};

