import { Note } from '@/types';
import { cn } from '@/utils/cn';

interface NoteHistoryItemProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
  formatDate: (dateString: string) => string;
  getTitleFromNote: (note: Note) => string;
}

export const NoteHistoryItem = ({
  note,
  isSelected,
  onClick,
  formatDate,
  getTitleFromNote,
}: NoteHistoryItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-[100px] w-full flex-col gap-2 rounded-card border px-4 py-3 text-left transition',
        isSelected
          ? 'border-secondary bg-secondary-bg'
          : 'border-transparent bg-background-primary hover:border-secondary hover:bg-secondary-lighter'
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold text-text-primary">
          {getTitleFromNote(note)}
        </p>
        <span className="whitespace-nowrap text-xs font-semibold text-text-secondary">
          {formatDate(note.createdAt)}
        </span>
      </div>

      <p className="text-sm text-text-primary opacity-80 line-clamp-2">
        {note.summary}
      </p>
    </button>
  );
};
