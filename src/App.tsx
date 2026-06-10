import { AppProvider } from './context/AppContext';
import { useApp } from './context/useApp';
import Header from './components/Header';
import GeneratorView from './components/GeneratorView';
import DailyView from './components/DailyView';
import HistoryView from './components/HistoryView';
import FavoritesView from './components/FavoritesView';

function AppContent() {
  const { viewMode } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <main className="max-w-lg mx-auto px-4 py-6">
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
