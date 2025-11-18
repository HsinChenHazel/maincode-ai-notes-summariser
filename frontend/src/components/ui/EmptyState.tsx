import { cn } from '@/utils/cn';

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export const EmptyState = ({
  title = 'Nothing here yet',
  description,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex h-full flex-col items-center justify-center rounded-card bg-background-secondary p-6 text-sm text-text-tertiary text-center',
        className
      )}
    >
      <p className="font-medium">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-text-quaternary">{description}</p>
      )}
    </div>
  );
};
