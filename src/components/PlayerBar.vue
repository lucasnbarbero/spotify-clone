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
  <div class="w-full bg-neutral-900 border-t border-neutral-800 px-4 py-2 text-white">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <!-- Controles e Info de canción -->
      <div class="flex items-center gap-4">
        <button
          :disabled="isCurrentSong"
          @click="playerStore.togglePlayPause"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black disabled:opacity-50"
        >
          <Icon
            :icon="playerStore.isPlaying ? 'material-symbols:pause' : 'material-symbols:play-arrow'"
            class="w-5 h-5"
          />
        </button>

        <div>
          <p class="text-sm font-semibold text-white">
            {{ playerStore.currentSongTitle }}
          </p>
          <p class="text-sm text-neutral-400">Duración: {{ playerStore.currentSongDuration }}</p>
        </div>
      </div>

      <!-- Barra de progreso -->
      <div class="w-full md:w-1/2">
        <div class="h-1 bg-neutral-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-green-500 rounded-full"
            :style="{ width: playerStore.progressPercentage + '%' }"
          ></div>
        </div>
        <p class="text-xs text-neutral-400 mt-1 text-center md:text-right">
          {{ playerStore.currentTime }}s / {{ playerStore.durationInSeconds }}
        </p>
      </div>
    </div>
  </div>
</template>
