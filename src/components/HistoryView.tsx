import { useApp } from '../context/useApp';
import VariationList from './VariationList';

export default function HistoryView() {
  const { getFilteredHistory } = useApp();

  return (
    <VariationList
      items={getFilteredHistory()}
      emptyIcon="📜"
      emptyTitle="No history yet"
      emptySubtitle="Generated variants will appear here"
      keyFn={(v, i) => `${v.id}-hist-${i}`}
    />
  );
}
