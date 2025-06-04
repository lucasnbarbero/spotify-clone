<script setup lang="ts">
import { usePlayerStore } from './stores/player';

const playerStore = usePlayerStore();

function reproduceSong() {
  playerStore.playSong({ id: 1, title: 'Song Title', duration: '3:45' });
}
</script>

<template>
  <RouterView />
  <div>
    <button @click="reproduceSong">▶️ Reproducir canción</button>
    <button @click="playerStore.togglePlayPause">
      {{ playerStore.isPlaying ? '⏸ Pausar' : '▶️ Reanudar' }}
    </button>

    <p>Canción actual: {{ playerStore.currentSongTitle }}</p>
    <p>Duración: {{ playerStore.currentSongDuration }}</p>
  </div>
</template>
