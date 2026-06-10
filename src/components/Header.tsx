import { useApp } from '../context/useApp';
import type { ViewMode } from '../types';

const NAV_ITEMS: { mode: ViewMode; label: string; icon: string }[] = [
  { mode: 'generator', label: 'Generate', icon: '🎰' },
  { mode: 'daily', label: 'Daily', icon: '📅' },
  { mode: 'history', label: 'History', icon: '📜' },
  { mode: 'favorites', label: 'Favorites', icon: '⭐' },
];

export default function Header() {
  const { viewMode, setViewMode, theme, toggleTheme, history, favorites } = useApp();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 lg:py-4">
          <div className="flex items-center gap-2 lg:gap-3">
            <span className="text-xl lg:text-2xl">🃏</span>
            <h1 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Flash Variants
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer text-sm"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <nav className="flex gap-1 lg:gap-2 pb-2 lg:pb-3 -mx-1">
          {NAV_ITEMS.map(({ mode, label, icon }) => {
            const active = viewMode === mode;
            const badge =
              mode === 'history'
                ? history.length
                : mode === 'favorites'
                  ? favorites.length
                  : 0;
            return (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`
                  flex-1 flex items-center justify-center gap-1.5 px-2 py-2 lg:py-2.5 rounded-xl text-xs lg:text-sm font-semibold
                  transition-all duration-200 cursor-pointer relative
                  ${
                    active
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                <span className="text-sm">{icon}</span>
                <span>{label}</span>
                {badge > 0 && (
                  <span
                    className={`
                      absolute -top-1 -right-0.5 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold
                      flex items-center justify-center px-1
                      ${active ? 'bg-amber-400 text-amber-900' : 'bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-300'}
                    `}
                  >
                    {badge > 99 ? '99+' : badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
