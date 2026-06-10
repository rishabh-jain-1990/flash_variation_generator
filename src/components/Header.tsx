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
    <header className="ambient-header sticky top-0 z-50 backdrop-blur-xl border-b transition-[background,border-color,color] duration-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 lg:py-4">
          <div className="flex items-center gap-2 lg:gap-3">
            <span className="text-xl lg:text-2xl">🃏</span>
            <h1 className="ambient-title text-base lg:text-lg font-bold tracking-tight">
              Flash Variants
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className="ambient-icon-btn w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer text-sm"
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
                  transition-all duration-300 cursor-pointer relative
                  ${active ? 'ambient-nav-btn-active shadow-sm' : 'ambient-nav-btn'}
                `}
              >
                <span className="text-sm">{icon}</span>
                <span>{label}</span>
                {badge > 0 && (
                  <span
                    className="absolute -top-1 -right-0.5 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center px-1 transition-colors duration-300"
                    style={{
                      background: active
                        ? 'var(--ambient-badge-active)'
                        : 'var(--ambient-badge)',
                      color: active
                        ? 'var(--ambient-badge-active-text)'
                        : 'var(--ambient-badge-text)',
                    }}
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
