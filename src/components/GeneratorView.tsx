import { useState } from 'react';
import { useApp } from '../context/useApp';
import VariationCard from './VariationCard';

export default function GeneratorView() {
  const { currentVariation, isGenerating, generate } = useApp();
  const [renderKey, setRenderKey] = useState(0);

  const handleGenerate = () => {
    setRenderKey((k) => k + 1);
    generate();
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`
          relative px-8 py-4 rounded-2xl text-lg font-bold uppercase tracking-wider
          transition-all duration-300 cursor-pointer
          ${
            isGenerating
              ? 'bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-500 cursor-wait'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105 active:scale-95'
          }
        `}
      >
        {isGenerating ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin-slow" />
            Shuffling...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span className="text-xl">🎰</span>
            Generate Variant
          </span>
        )}
      </button>

      {isGenerating && (
        <div className="w-full max-w-md mx-auto">
          <div className="rounded-2xl bg-slate-200 dark:bg-slate-800 p-6 animate-shimmer h-80 flex items-center justify-center">
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-20 h-28 rounded-xl bg-slate-300 dark:bg-slate-700 animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {!isGenerating && currentVariation && (
        <VariationCard
          key={`${currentVariation.id}-${renderKey}`}
          variation={currentVariation}
        />
      )}

      {!isGenerating && !currentVariation && (
        <div className="text-center mt-8 px-4">
          <p className="text-4xl mb-4">🃏</p>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Hit the button to discover a new Flash variant
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
            Each generation reveals a unique way to play
          </p>
        </div>
      )}
    </div>
  );
}
