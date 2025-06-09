//  src/stores/favorites.store.ts
import { defineStore } from 'pinia';

const FAVORITES_STORAGE_KEY = 'favoriteSongIds';

export const useFavotiresStore = defineStore('favorites', {
  state: () => ({
    favotireSongIds: [] as (string | number)[],
  }),

  actions: {
    toggleFavorite(songId: string | number) {
      const index = this.favotireSongIds.indexOf(songId);
      if (index === -1) {
        this.favotireSongIds.push(songId);
      } else {
        this.favotireSongIds.splice(index, 1);
      }

      this.saveToLocalStorage();
    },

    isFatorite(songId: string | number): boolean {
      return this.favotireSongIds.includes(songId);
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(this.favotireSongIds));
      } catch (error) {
        console.error('Error guardando favoritos en localStorage', error);
      }
    },

    loadFromLocalStorage() {
      try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);

        if (stored) this.favotireSongIds = JSON.parse(stored);
      } catch (error) {
        console.error('Error cargando favotiros desde localStorage', error);
      }
    },
  },
});
