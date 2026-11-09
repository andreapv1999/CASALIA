
import { useEffect, useState } from "react";

const STORAGE_KEY = "casalia_favorites";

function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem(STORAGE_KEY);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Error al recuperar favoritos:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
}

export default useFavorites;
