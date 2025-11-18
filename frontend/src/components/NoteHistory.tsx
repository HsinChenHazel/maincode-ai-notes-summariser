import { Note } from '../types';
import { Card } from '@/components/ui/Card';
import { NoteHistoryItem } from '@/components/ui/NoteHistoryItem';
import { EmptyState } from '@/components/ui/EmptyState';


interface NoteHistoryProps {
  notes: Note[];
  selectedId: string | null;
  onSelect: (note: Note) => void;
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

const getTitleFromNote = (note: Note) => {
  // Use note.title if available (new notes), otherwise extract from content (old notes)
  if (note.title) {
    return note.title;
  }
  
  // Fallback: Extract title from content for backward compatibility
  const trimmed = note.content.trim();
  if (!trimmed) return 'Untitled Note';
  const firstSentence = trimmed.split('\n')[0];
  return firstSentence.length > 60 ? `${firstSentence.slice(0, 57)}...` : firstSentence;
};

export const NoteHistoryPanel = ({ notes, selectedId, onSelect }: NoteHistoryProps) => {
  return (
    <Card className="flex h-full min-h-0 flex-col">
      {/* <p className="mb-4 shrink-0 text-lg font-medium text-text-primary">Summary History</p> */}
      <h2 className="mb-4 shrink-0 text-lg font-medium text-text-primary">
        Summary History
      </h2>
      <div className="flex-1 overflow-y-auto pr-1">
        {notes.length === 0 ? (
          <EmptyState
            title="No history yet"
            description="Generate a summary to get started."
          />
        ) : (
          <div className="flex flex-col gap-1">
            {notes.map((note) => (
              <NoteHistoryItem
                key={note.id}
                note={note}
                isSelected={note.id === selectedId}
                onClick={() => onSelect(note)}
                formatDate={formatDate}
                getTitleFromNote={getTitleFromNote}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
