<script setup lang="ts">
import { computed, onUnmounted } from 'vue';
import { usePlayerStore } from '@/stores/player.store';
import { Icon } from '@iconify/vue';

const playerStore = usePlayerStore();

const isCurrentSong = computed(() => playerStore.currentSong === null);

onUnmounted(() => {
  playerStore.stopProgress();
});
</script>

<template>
  <div class="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-white">
    <div class="flex items-center gap-4">
      <button :disabled="isCurrentSong" @click="playerStore.togglePlayPause" class="text-lg">
        <Icon icon="material-symbols:pause" v-if="playerStore.isPlaying" class="text-2xl" />
        <Icon icon="material-symbols:play-arrow" v-else class="text-2xl" />
      </button>
      <div>
        <p class="font-semibold">Canción actual: {{ playerStore.currentSongTitle }}</p>
        <p class="text-sm text-neutral-400">Duración: {{ playerStore.currentSongDuration }}</p>
      </div>
    </div>

    <div class="w-full md:w-1/2">
      <div class="h-1 bg-neutral-700 rounded overflow-hidden">
        <div
          class="h-full bg-green-500"
          :style="{ width: playerStore.progressPercentage + '%' }"
        ></div>
        <small class="text-xs text-gray-400">
          {{ playerStore.currentTime }}s / {{ playerStore.durationInSeconds }}
        </small>
      </div>
    </div>
  </div>
  <!-- 
   <div class="player-bar">


    <div class="progress-bar-wrapper">
      <div class="progress-bar" :style="{ width: playerStore.progressPercentage + '%' }"></div>
    </div>
    <small>{{ playerStore.currentTime }}s / {{ playerStore.durationInSeconds }}</small>
  </div> 
  -->
</template>
