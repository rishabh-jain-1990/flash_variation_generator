import CardLayout from './CardLayout';
import { useApp } from '../context/useApp';
import type { Variation } from '../types';

interface VariationCardProps {
  variation: Variation;
  showActions?: boolean;
}

const COMPLEXITY_STYLES: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  intermediate: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

export default function VariationCard({ variation, showActions = true }: VariationCardProps) {
  const { toggleFavorite, isFavorite } = useApp();
  const favorited = isFavorite(variation.id);

  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto">
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${variation.visual_cues.bg_theme} p-5 sm:p-6 lg:p-8`}
      >
        <div className="absolute top-4 right-4 text-4xl lg:text-5xl opacity-30 select-none">
          {variation.visual_cues.overlay_icon}
        </div>

        <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-8 lg:gap-12 items-start">
          <div className="order-2 md:order-1 w-full flex justify-center">
            <div className="rounded-xl bg-black/10 dark:bg-black/25 backdrop-blur-sm p-5 sm:p-6 lg:p-8 w-full max-w-sm md:max-w-none">
              <CardLayout variation={variation} />
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-4 lg:space-y-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl lg:text-3xl">{variation.visual_cues.overlay_icon}</span>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  {variation.title}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${COMPLEXITY_STYLES[variation.complexity]}`}
                  >
                    {variation.complexity}
                  </span>
                  <span className="text-slate-400 text-xs">{variation.id}</span>
                </div>
              </div>
            </div>

            <p className="text-sm lg:text-base text-slate-200 leading-relaxed">
              {variation.description}
            </p>

            <div className="flex flex-wrap gap-1.5 lg:gap-2">
              {variation.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] lg:text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showActions && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => toggleFavorite(variation)}
            className={`
              flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium
              transition-all duration-200 cursor-pointer
              ${
                favorited
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }
            `}
          >
            <span>{favorited ? '★' : '☆'}</span>
            {favorited ? 'Saved' : 'Save to Favorites'}
          </button>
        </div>
      )}
    </div>
  );
}
