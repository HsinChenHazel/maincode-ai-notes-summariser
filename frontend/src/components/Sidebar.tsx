import { HomeIcon, HistoryIcon, PlusIcon } from './icons';

type AppView = 'home' | 'history';

interface SidebarProps {
  activeView: AppView;
  onChange: (view: AppView) => void;
  onCreateNew: () => void;
  canCreateNew: boolean;
}

export const Sidebar = ({ activeView, onChange, onCreateNew, canCreateNew }: SidebarProps) => {
  const items: Array<{ view: AppView; label: string; Icon: typeof HomeIcon }> = [
    { view: 'home', label: 'Home', Icon: HomeIcon },
    { view: 'history', label: 'Summary History', Icon: HistoryIcon },
  ];

  return (
    <aside className="flex w-full justify-center self-start md:w-[68px] md:justify-start">
      <div className="flex flex-col items-center gap-3">
        <div className="inline-flex h-fit w-fit items-center justify-center gap-3 rounded-full bg-white p-3 shadow-sm md:flex-col md:items-center md:gap-3 md:rounded-[20px] md:p-4 md:shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)]">
          {items.map(({ view, label, Icon }) => {
            const isActive = activeView === view;
            return (
              <div
                key={view}
                className="group relative flex items-center justify-center"
              >
                <button
                  type="button"
                  onClick={(event) => {
                    onChange(view);
                    (event.currentTarget as HTMLButtonElement).blur();
                  }}
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition md:h-10 md:w-10 ${
                    isActive ? 'bg-[#d3dfed] text-[#0052b3]' : 'text-[#0c4a6e] hover:bg-[#f2f5f9]'
                  }`}
                  aria-pressed={isActive}
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </button>
                <span
                  className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#d3dfed] px-3 py-1 text-xs font-medium text-[#3e3e3e] opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 md:left-full md:top-1/2 md:mt-0 md:ml-3 md:-translate-x-0 md:-translate-y-1/2"
                  role="tooltip"
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="group relative flex w-full items-center justify-center">
          <button
            type="button"
            onClick={(event) => {
              if (!canCreateNew) return;
              onCreateNew();
              (event.currentTarget as HTMLButtonElement).blur();
            }}
            disabled={!canCreateNew}
            className={`flex w-full h-fit items-center justify-center gap-3 rounded-full transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#89b5f5] focus-visible:ring-offset-2
              ${
                canCreateNew
                  ? 'bg-white text-[#005ac2] p-3 shadow-sm hover:bg-[#f5faff] active:bg-[#b6cbe3] md:flex-col md:items-center md:gap-3 md:rounded-[100px] md:p-4 md:shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)]'
                  : 'cursor-not-allowed bg-[#e8e8e8] text-[#b3b3b3] shadow-none p-3 md:p-4 md:rounded-[100px]'
              }`}
            aria-label="Create New Summary"
            aria-disabled={!canCreateNew}
          >
            <PlusIcon className="h-6 w-6" />
          </button>

          <span
            className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#d3dfed] px-3 py-1 text-xs font-medium text-[#3e3e3e] opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 md:left-full md:top-1/2 md:mt-0 md:ml-3 md:-translate-x-0 md:-translate-y-1/2"
            role="tooltip"
          >
            Create New Summary
          </span>
        </div>

      </div>
    </aside>
  );
};