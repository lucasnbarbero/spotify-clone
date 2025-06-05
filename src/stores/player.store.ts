//  src/stores/player.ts
import { defineStore } from 'pinia';

import type { ISong } from '@/types/ISong';

interface PlayerState {
  currentSong: ISong | null;
  isPlaying: boolean;
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => ({
    currentSong: null,
    isPlaying: false,
  }),

  getters: {
    currentSongTitle: (state) => (state.currentSong ? state.currentSong.title : 'Niguna'),
    currentSongDuration: (state) => (state.currentSong ? state.currentSong.duration : '--:--'),
  },

  actions: {
    playSong(song: ISong) {
      this.currentSong = song;
      this.isPlaying = true;
    },

    togglePlayPause() {
      this.isPlaying = !this.isPlaying;
    },
  },
});
