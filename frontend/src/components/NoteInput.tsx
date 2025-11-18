import { ClearIcon } from './icons';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { CharacterCount } from '@/components/ui/CharacterCount';
import { cn } from '@/utils/cn';

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

  return (
    <Card className={cn('min-h-0 flex-1', className)}>
      <div className="flex min-h-0 flex-1">
        <Textarea
          id="note-input"
          label="Enter your notes"
          srOnlyLabel={true}
          value={value}
          onChange={onChange}
          placeholder="Drop your notes here (e.g., meeting notes, ideas, articles...)"
          maxLength={maxCharacters}
          disabled={isSubmitting}
          size="md"
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CharacterCount
          characterCount={characterCount}
          maxCharacters={maxCharacters}
        />
        <div className="flex gap-2 self-end sm:self-auto">
          {/* Clear button：secondary variant */}
          <Button
            type="button"
            onClick={onClear}
            disabled={!value}
            variant="secondary"
            size="md"
            className="disabled:opacity-70"
            icon={<ClearIcon className="h-5 w-5" />}
            iconPosition="left"
          >
            Clear
          </Button>

          {/* Generate Summary：primary variant */}
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!value.trim() || isSubmitting}
            loading={isSubmitting}
            variant="primary"
            size="md"
            className="disabled:opacity-80"
          >
            Generate Summary
          </Button>
        </div>
      </div>
    </Card>
  );
};

