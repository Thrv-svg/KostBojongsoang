import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'kost_bojongsoang_favorites_v1';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Gagal membaca data favorit dari localStorage:', err);
    }
    return [];
  });

  // Keep localStorage in sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (err) {
      console.warn('Gagal menyimpan data favorit ke localStorage:', err);
    }
  }, [favoriteIds]);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds]
  );

  const toggleFavorite = useCallback((id: string): boolean => {
    let isNowFavorited = false;
    setFavoriteIds((prev) => {
      if (prev.includes(id)) {
        isNowFavorited = false;
        return prev.filter((item) => item !== id);
      } else {
        isNowFavorited = true;
        return [...prev, id];
      }
    });
    return isNowFavorited;
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
  }, []);

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
    favoritesCount: favoriteIds.length,
  };
}
