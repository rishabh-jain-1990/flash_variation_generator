import { useApp } from '../context/useApp';
import VariationList from './VariationList';

export default function FavoritesView() {
  const { getFilteredFavorites } = useApp();

  return (
    <VariationList
      items={getFilteredFavorites()}
      emptyIcon="⭐"
      emptyTitle="No favorites yet"
      emptySubtitle="Save variants you love to find them here"
      badge={() => <span className="text-amber-500 text-sm">★</span>}
    />
  );
}
