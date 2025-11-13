import { ClearIcon } from './icons';

interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  characterCount: number;
  maxCharacters: number;
  isSubmitting: boolean;
  className?: string;
}

export const NoteInput = ({
  value,
  onChange,
  onSubmit,
  onClear,
  characterCount,
  maxCharacters,
  isSubmitting,
  className,
}: NoteInputProps) => {
  const containerClasses = [
    'flex min-h-0 flex-1 flex-col rounded-2xl border border-[#dddddd] bg-white p-5 shadow-sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <label htmlFor="note-input" className="sr-only">
        Enter your notes
      </label>
      <div className="flex min-h-0 flex-1">
        <textarea
          id="note-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Drop your notes here (e.g., meeting notes, ideas, articles...)"
          maxLength={maxCharacters}
          disabled={isSubmitting}
          className="h-full w-full flex-1 resize-none overflow-y-auto rounded-xl border border-transparent px-4 py-3 text-base text-[#181818] outline-none transition focus:border-[#0065d9] focus:ring-2 focus:ring-[#d3dfed] disabled:cursor-not-allowed disabled:bg-[#f2f2f2]"
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-[#797979]">
          {characterCount} / {maxCharacters} characters
        </span>
        <div className="flex gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={onClear}
            disabled={!value}
            className="flex items-center gap-2 rounded-lg border border-[#0065d9] px-4 py-2 text-sm font-medium text-[#0065d9] transition disabled:border-[#b3b3b3] disabled:text-[#b3b3b3] disabled:opacity-70"
          >
            <ClearIcon className="h-5 w-5" />
            Clear
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!value.trim() || isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-[#0065d9] px-4 py-2 text-sm font-medium text-white transition enabled:hover:bg-[#0052b3] disabled:bg-[#cfd8e6] disabled:text-white/80"
          >
            Generate Summary
          </button>
        </div>
      </div>
    </div>
  );
};

