// src/components/SummaryPanel.tsx
import { Note } from '../types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TypewriterText } from '@/components/TypewriterText';
import { InfoIcon, RefreshIcon } from '@/components/icons';

interface SummaryPanelProps {
  currentNote: Note | null;
  isLoading: boolean;
  error: string | null;
  onRegenerate: () => void;
  onCopySummary: () => void;
}

const SHIMMER_WIDTHS = [
  '55%',
  '50%',
  '78%',
  '76%',
  '74%',
  '85%',
  '83%',
  '81%',
  '92%',
  '90%',
  '88%',
  '86%',
];

export const SummaryPanel = ({
  currentNote,
  isLoading,
  error,
  onRegenerate,
  onCopySummary,
}: SummaryPanelProps) => {
  const renderSummaryContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-sm text-text-tertiary">
            <p className="text-base shimmer-text">
              Generating summary, this usually takes 10-15 seconds...
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {SHIMMER_WIDTHS.map((width, index) => (
              <div
                key={index}
                className="shimmer-block"
                style={{ width, height: '13px' }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      );
    }

    if (currentNote) {
      return (
        <div className="flex flex-col gap-3">
          {currentNote.title && (
            <h3 className="text-lg font-semibold text-text-primary">
              💡 {currentNote.title}
            </h3>
          )}
          <TypewriterText
            key={currentNote.id}
            text={currentNote.summary}
            className="whitespace-pre-wrap leading-relaxed"
          />
        </div>
      );
    }

    return (
      <p className="text-text-tertiary">
        Enter notes above to generate an AI-powered summary.
      </p>
    );
  };

  const contentKey = currentNote
    ? currentNote.id
    : isLoading
    ? 'loading'
    : 'empty';

  return (
    <Card className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2">
        <p className="text-lg font-medium text-text-primary">AI Summary</p>
        {!isLoading && currentNote && (
          <div className="group relative flex items-center justify-center">
            <InfoIcon className="h-5 w-5 text-text-quaternary" />
            {/* Tooltip */}
            <span
                className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 z-20 whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs font-medium text-text-secondary opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                role="tooltip"
            >
              All summaries are automatically saved to History
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        key={contentKey}
        className="mt-3 flex-1 overflow-y-auto text-base text-text-primary"
      >
        {renderSummaryContent()}
      </div>

      {/* Actions only show when there is a summary and not loading */}
      {!isLoading && currentNote && (
        <div className="mt-5 flex shrink-0 flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onRegenerate}
            icon={<RefreshIcon className="h-5 w-5" />}
            iconPosition="left"
          >
            Regenerate
          </Button>
        </div>
      )}
    </Card>
  );
};
