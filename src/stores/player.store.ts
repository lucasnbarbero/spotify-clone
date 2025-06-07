//  src/stores/player.store.ts
import { defineStore } from 'pinia';
import type { ISong } from '@/types/ISong';

interface PlayerState {
  currentSong: ISong | null;
  isPlaying: boolean;
  currentTime: number;
  intervalId: number | null;
  volume: number;
  isMuted: boolean;
  previousVolume: number;
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => ({
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    intervalId: null,
    volume: 100,
    isMuted: false,
    previousVolume: 100,
  }),

  getters: {
    currentSongTitle: (state) => (state.currentSong ? state.currentSong.title : 'Niguna'),
    currentSongDuration: (state) => (state.currentSong ? state.currentSong.duration : '--:--'),
    durationInSeconds: (state) => {
      if (!state.currentSong) return 0;
      const [min, sec] = state.currentSong.duration.split(':').map(Number);
      return min * 60 + sec;
    },
    progressPercentage: (state): number => {
      const total = (state as any).durationInSeconds;
      return total === 0 ? 0 : Math.min((state.currentTime / total) * 100, 100);
    },
  },

  actions: {
    playSong(song: ISong) {
      this.stopProgress();
      this.currentSong = song;
      this.currentTime = 0;
      this.isPlaying = true;
      this.startProgress();
    },

    togglePlayPause() {
      this.isPlaying = !this.isPlaying;
      this.isPlaying ? this.startProgress() : this.stopProgress();
    },

    updateProgress(time: number) {
      this.currentTime = time;
    },

    startProgress() {
      if (this.intervalId) return;

      this.intervalId = window.setInterval(() => {
        if (!this.isPlaying) return;

        if (this.currentTime >= this.durationInSeconds) {
          this.stopProgress();
          this.isPlaying = false;
          return;
        }

        this.currentTime++;
      }, 1000);
    },

    stopProgress() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },

    setVolume(value: number) {
      this.volume = value;
      this.isMuted = value === 0;
    },

    toggleMute() {
      if (this.isMuted) {
        this.volume = this.previousVolume || 100;
        this.isMuted = false;
      } else {
        this.previousVolume = this.volume;
        this.volume = 0;
        this.isMuted = true;
      }
    },
  },
});
