//  src/stores/favorites.store.ts
import { defineStore } from 'pinia';
import { useToastStore } from './toast.store';

const FAVORITES_STORAGE_KEY = 'favoriteSongIds';

export const useFavotiresStore = defineStore('favorites', {
  state: () => ({
    favotireSongIds: [] as (string | number)[],
  }),

  actions: {
    toggleFavorite(songId: string | number) {
      const toastStore = useToastStore();
      const index = this.favotireSongIds.indexOf(songId);
      if (index === -1) {
        this.favotireSongIds.push(songId);
        toastStore.showToast('Canción añadida a favoritos', 'success');
      } else {
        this.favotireSongIds.splice(index, 1);
        toastStore.showToast('Canción eliminada de favoritos', 'success');
      }

      this.saveToLocalStorage();
    },

    isFatorite(songId: string | number): boolean {
      return this.favotireSongIds.includes(songId);
    },

    saveToLocalStorage() {
      localStorage.setItem('favoriteSongIds', JSON.stringify(this.favotireSongIds));
    },

    loadFromLocalStorage() {
      const stored = localStorage.getItem('favoriteSongIds');
      if (stored) this.favotireSongIds = JSON.parse(stored);
    },
  },
});
