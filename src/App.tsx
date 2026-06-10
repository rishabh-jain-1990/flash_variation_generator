import { useEffect, useMemo } from 'react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/useApp';
import Header from './components/Header';
import GeneratorView from './components/GeneratorView';
import DailyView from './components/DailyView';
import HistoryView from './components/HistoryView';
import FavoritesView from './components/FavoritesView';
import { getVariationMood, type AmbientMood } from './utils/variationMood';

function AppContent() {
  const {
    viewMode,
    currentVariation,
    dailyVariation,
    isGenerating,
    listFocusVariation,
    theme,
  } = useApp();

  const ambientVariation = useMemo(() => {
    if (viewMode === 'generator' && currentVariation && !isGenerating) {
      return currentVariation;
    }
    if (viewMode === 'daily') return dailyVariation;
    if (
      (viewMode === 'history' || viewMode === 'favorites') &&
      listFocusVariation
    ) {
      return listFocusVariation;
    }
    return null;
  }, [
    viewMode,
    currentVariation,
    dailyVariation,
    isGenerating,
    listFocusVariation,
  ]);

  const ambientMood: AmbientMood = ambientVariation
    ? getVariationMood(ambientVariation)
    : 'default';

  useEffect(() => {
    if (!ambientVariation) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      return;
    }

    const mood = getVariationMood(ambientVariation);
    if (mood === 'intense') {
      document.documentElement.classList.add('dark');
    } else if (mood === 'playful') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [ambientVariation, theme]);

  return (
    <div
      className="ambient-shell min-h-screen transition-[background,color] duration-700"
      data-ambient={ambientMood}
    >
      <Header />
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {viewMode === 'generator' && <GeneratorView />}
        {viewMode === 'daily' && <DailyView />}
        {viewMode === 'history' && <HistoryView />}
        {viewMode === 'favorites' && <FavoritesView />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
