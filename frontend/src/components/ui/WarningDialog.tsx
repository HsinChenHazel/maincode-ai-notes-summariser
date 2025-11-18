import { useRef, useEffect } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { cn } from '@/utils/cn';

interface WarningDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

/**
 * WarningDialog Component
 * A modal dialog for warning users about potentially destructive actions
 * Matches the design style of the Original Note overlay
 */
export const WarningDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Leave Generation?',
  message = 'Leaving now will stop the summary generation and your progress will be lost.',
  confirmLabel = 'Leave',
  cancelLabel = 'Stay',
}: WarningDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-overlay p-4">
      <div
        ref={dialogRef}
        className="relative flex max-h-[90vh] w-full max-w-md flex-col rounded-2xl bg-background-primary shadow-lg"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 p-5 pb-0">
          <p className="text-lg font-medium text-text-primary">{title}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-5 pt-3">
          <p className="text-base leading-[1.6] text-text-secondary">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 justify-end gap-2 border-t border-border-light p-5 pt-4">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onConfirm}
            className="bg-error hover:bg-error-dark active:bg-error-dark text-text-onPrimary"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

