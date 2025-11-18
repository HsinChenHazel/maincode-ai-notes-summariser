import { cn } from '@/utils/cn';

interface CharacterCountProps {
  characterCount: number;
  maxCharacters: number;
  className?: string;
}

/**
 * CharacterCount component
 * Displays character count with color coding:
 * - Green: < 80% of maxCharacters
 * - Yellow: >= 80% and < 100% of maxCharacters
 * - Red: >= 100% of maxCharacters
 */
export const CharacterCount = ({
  characterCount,
  maxCharacters,
  className,
}: CharacterCountProps) => {
  // Calculate thresholds (80% and 100% of maxCharacters)
  const warningThreshold = Math.floor(maxCharacters * 0.8);
  const errorThreshold = maxCharacters;

  // Determine color based on character count
  const getColorClass = () => {
    if (characterCount >= errorThreshold) {
      return 'text-error'; // Red: >= 100%
    } else if (characterCount >= warningThreshold) {
      return 'text-warning'; // Yellow: >= 80% and < 100%
    } else if (characterCount == 0) {
      return 'text-text-tertiary'; // default color: 0
    } else {
      return 'text-success'; // Green: < 80%
    }
  };

  return (
    <span className={cn('text-sm', getColorClass(), className)}>
      {characterCount} / {maxCharacters} characters
    </span>
  );
};

