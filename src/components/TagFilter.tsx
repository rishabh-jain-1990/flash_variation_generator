import { useApp } from '../context/useApp';

export default function TagFilter() {
  const { allTags, activeTagFilters, toggleTagFilter, clearTagFilters } = useApp();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Filter by tags
        </span>
        {activeTagFilters.length > 0 && (
          <button
            onClick={clearTagFilters}
            className="text-xs text-amber-500 hover:text-amber-400 font-medium cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {allTags.map((tag) => {
          const active = activeTagFilters.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTagFilter(tag)}
              className={`
                text-[11px] font-medium px-2.5 py-1 rounded-full
                transition-all duration-200 cursor-pointer
                ${
                  active
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                }
              `}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
