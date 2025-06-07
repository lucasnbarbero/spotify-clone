//  src/stores/favorites.store.ts
import { defineStore } from 'pinia';

export const useFavotiresStore = defineStore('favorites', {
  state: () => ({
    favotireSongIds: [] as (string | number)[],
  }),

  actions: {
    toggleFavorite(songId: string | number) {
      const index = this.favotireSongIds.indexOf(songId);
      if (index === -1) this.favotireSongIds.push(songId);
      else this.favotireSongIds.splice(index, 1);
    },

    isFatorite(songId: string | number): boolean {
      return this.favotireSongIds.includes(songId);
    },
  },
});
