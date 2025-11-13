import { Note } from '../types';

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
  const trimmed = note.content.trim();
  if (!trimmed) return 'Untitled Note';
  const firstSentence = trimmed.split('\n')[0];
  return firstSentence.length > 60 ? `${firstSentence.slice(0, 57)}...` : firstSentence;
};

export const NoteHistoryPanel = ({ notes, selectedId, onSelect }: NoteHistoryProps) => {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-[#dddddd] bg-white p-5 shadow-sm">
      <p className="mb-4 shrink-0 text-lg font-medium text-black">Summary History</p>
      <div className="flex-1 overflow-y-auto pr-1">
        {notes.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg bg-[#f5f6f7] p-6 text-sm text-[#797979]">
            No history yet. Generate a summary to get started.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {notes.map((note) => {
              const isSelected = note.id === selectedId;
              return (
                <button
                  key={note.id}
                  onClick={() => onSelect(note)}
                  className={`flex w-full flex-col gap-2 rounded-lg border px-4 py-3 text-left transition ${
                    isSelected
                      ? 'border-[#d3dfed] bg-[#f4f8fc]'
                      : 'border-transparent hover:border-[#d3dfed] hover:bg-[#f8fafc]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#181818]">{getTitleFromNote(note)}</p>
                    <span className="whitespace-nowrap text-xs font-semibold text-[#858585]">
                      {formatDate(note.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-[#181818] opacity-80 line-clamp-2">
                    {note.summary}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
