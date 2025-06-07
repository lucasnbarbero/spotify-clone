//  src/stores/favorites.store.ts
import { defineStore } from 'pinia';

export const useFavotiresStore = defineStore('favorites', {
  state: () => ({
    favotireSongIds: new Set<string | number>(),
  }),

  actions: {
    toggleFavorite(songId: string | number) {
      if (this.favotireSongIds.has(songId)) {
        this.favotireSongIds.delete(songId);
      } else {
        this.favotireSongIds.add(songId);
      }
    },

    isFatorite(songId: string | number): boolean {
      return this.favotireSongIds.has(songId);
    },
  },
});
