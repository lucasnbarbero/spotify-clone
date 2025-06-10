//  src/stores/player.store.ts
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { ISong } from '@/types/ISong';

export const usePlayerStore = defineStore('player', () => {
  //  Estado
  const currentSong = ref<ISong | null>(null);
  const currentTime = ref(0);
  const isPlaying = ref(false);
  const isMuted = ref(false);
  const volume = ref(100);

  const playlist = ref<ISong[]>([]);
  const currentIndex = ref<number | null>(null);

  //  Intervalo para la simulación del progreso
  let progessInterval: number | null = null;

  const currentSongTitle = computed(() => currentSong.value?.title ?? 'Sin canción');
  const currentSongDuration = computed(() => currentSong.value?.duration ?? '00:00');

  const durationInSeconds = computed(() => {
    const duration = currentSong.value?.duration;
    if (!duration) return 0;

    const [minStr, secStr] = duration.split(':');
    const min = parseInt(minStr);
    const sec = parseInt(secStr);
    return min * 60 + sec;
  });

  function setPlaylist(songs: ISong[]) {
    playlist.value = songs;
  }

  function playSong(song: ISong) {
    stopProgress();
    currentSong.value = song;
    currentIndex.value = playlist.value.findIndex((s) => s.id === song.id);
    currentTime.value = 0;
    isPlaying.value = true;
    startProgress();
  }

  function togglePlayPause() {
    if (!currentSong.value) return;
    isPlaying.value = !isPlaying.value;
    if (isPlaying.value) startProgress();
    else stopProgress();
  }

  function startProgress() {
    stopProgress();
    progessInterval = setInterval(() => {
      if (currentTime.value < durationInSeconds.value) {
        currentTime.value += 1;
      } else {
        playNextSong();
      }
    }, 1000);
  }

  function stopProgress() {
    if (progessInterval) {
      clearInterval(progessInterval);
      progessInterval = null;
    }
  }

  function setCurrentTime(time: number) {
    currentTime.value = Math.min(time, durationInSeconds.value);
  }

  function setVolume(newVolume: number) {
    volume.value = newVolume;
    isMuted.value = newVolume === 0;
  }

  function toggleMute() {
    isMuted.value = !isMuted.value;
    if (isMuted.value) volume.value = 0;
    else volume.value = 100;
  }

  function playNextSong() {
    if (playlist.value.length === 0 || currentIndex.value === null) return;

    const nextIndex = currentIndex.value + 1;

    if (nextIndex < playlist.value.length) {
      playSong(playlist.value[nextIndex]);
    } else {
      stopProgress();
      isPlaying.value = false;
    }
  }

  function playPreviousSong() {
    if (playlist.value.length === 0 || currentIndex.value === null) return;
    const prevIndex = currentIndex.value - 1;

    if (prevIndex >= 0) {
      playSong(playlist.value[prevIndex]);
    }
  }

  return {
    currentSong,
    currentTime,
    isPlaying,
    isMuted,
    volume,
    playlist,
    currentIndex,

    currentSongTitle,
    currentSongDuration,
    durationInSeconds,

    playSong,
    togglePlayPause,
    startProgress,
    stopProgress,
    setCurrentTime,
    setVolume,
    toggleMute,
    setPlaylist,
    playNextSong,
    playPreviousSong,
  };
});
