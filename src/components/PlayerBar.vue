<script setup lang="ts">
import { computed, onUnmounted } from 'vue';
import { usePlayerStore } from '@/stores/player.store';

const playerStore = usePlayerStore();

const isCurrentSong = computed(() => playerStore.currentSong === null);

onUnmounted(() => {
  playerStore.stopProgress();
});
</script>

<template>
  <div class="player-bar">
    <button :disabled="isCurrentSong" @click="playerStore.togglePlayPause">
      {{ playerStore.isPlaying ? '⏸ Pausar' : '▶️ Reanudar' }}
    </button>

    <p>Canción actual: {{ playerStore.currentSongTitle }}</p>
    <p>Duración: {{ playerStore.currentSongDuration }}</p>

    <div class="progress-bar-wrapper">
      <div class="progress-bar" :style="{ width: playerStore.progressPercentage + '%' }"></div>
    </div>
    <small>{{ playerStore.currentTime }}s / {{ playerStore.durationInSeconds }}</small>
  </div>
</template>

<style scoped>
.player-bar {
  padding: 1rem;
  border-top: 1px solid #ccc;
}

.progress-bar-wrapper {
  width: 100%;
  height: 8px;
  background-color: #eee;
  margin: 0.5rem 0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: dodgerblue;
  transition: width 0.4s ease;
}
</style>
