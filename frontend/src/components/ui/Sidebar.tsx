import { HomeIcon, HistoryIcon, PlusIcon } from '../icons';
import { cn } from '@/utils/cn';
import { Button } from './Button';

type AppView = 'home' | 'history';

interface SidebarProps {
  activeView: AppView;
  onChange: (view: AppView) => void;
  onCreateNew: () => void;
  canCreateNew: boolean;
}

export const Sidebar = ({
  activeView,
  onChange,
  onCreateNew,
  canCreateNew,
}: SidebarProps) => {
  const items: Array<{ view: AppView; label: string; Icon: typeof HomeIcon }> = [
    { view: 'home', label: 'Home', Icon: HomeIcon },
    { view: 'history', label: 'Summary History', Icon: HistoryIcon },
  ];

  return (
    <aside className="flex w-full justify-center self-start md:w-sidebarWidth md:justify-start">
      <div className="flex flex-col items-center gap-3">
        {/* action buttons container */}
        <div className="inline-flex h-fit w-fit items-center justify-center gap-3 rounded-full bg-background-primary p-3 shadow-sm md:flex-col md:items-center md:gap-3 md:rounded-[20px] md:p-4 md:shadow">
          {items.map(({ view, label, Icon }) => {
            const isActive = activeView === view;
            return (
              <div
                key={view}
                className="group relative flex items-center justify-center"
              >
                <Button
                type="button"
                variant="sidebarNav"
                size={undefined}
                iconOnly
                onClick={(event) => {
                    onChange(view);
                    (event.currentTarget as HTMLButtonElement).blur();
                }}
                aria-pressed={isActive}
                aria-label={label}
                icon={<Icon className="h-5 w-5" />}
                className={cn(
                    isActive && 'bg-secondary text-primary-dark'
                  )}
                  
                />

                {/* tooltip */}
                <span
                  className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs font-medium text-text-secondary opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 md:left-full md:top-1/2 md:mt-0 md:ml-3 md:-translate-x-0 md:-translate-y-1/2"
                  role="tooltip"
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Create New Summary Button */}
        <div className="group relative flex w-full items-center justify-center">
            <Button
                type="button"
                variant="sidebarAdd"
                iconOnly={false}             
                disabled={!canCreateNew}
                onClick={onCreateNew}
                icon={<PlusIcon className="h-6 w-6" />}
                aria-label="Create New Summary"
            />

          <span
            className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs font-medium text-text-secondary opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 md:left-full md:top-1/2 md:mt-0 md:ml-3 md:-translate-x-0 md:-translate-y-1/2"
            role="tooltip"
          >
            Create New Summary
          </span>
        </div>
      </div>
    </aside>
  );
};
