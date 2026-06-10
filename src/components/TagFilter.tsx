import { useApp } from '../context/useApp';

export default function TagFilter() {
  const { allTags, activeTagFilters, toggleTagFilter, clearTagFilters } = useApp();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="ambient-text-muted text-xs font-semibold uppercase tracking-wider">
          Filter by tags
        </span>
        {activeTagFilters.length > 0 && (
          <button
            onClick={clearTagFilters}
            className="text-xs font-medium cursor-pointer transition-colors duration-300"
            style={{ color: 'var(--ambient-accent-from)' }}
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
                transition-all duration-300 cursor-pointer
                ${active ? 'ambient-tag-active shadow-sm' : 'ambient-tag'}
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
