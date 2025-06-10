<script setup lang="ts">
import { computed, onUnmounted } from 'vue';
import { usePlayerStore } from '@/stores/player.store';
import { Icon } from '@iconify/vue';
import { formatTime } from '@/utils/formatTime';

const playerStore = usePlayerStore();

const isCurrentSong = computed(() => playerStore.currentSong === null);

const volumeValue = computed({
  get: () => playerStore.volume,
  set: (value: number) => playerStore.setVolume(value),
});

function toggleMute() {
  playerStore.toggleMute();
}

function onSeek(e: Event) {
  const value = Number((e.target as HTMLInputElement).value);
  playerStore.setCurrentTime(value);
}

onUnmounted(() => {
  playerStore.stopProgress();
});
</script>

<template>
  <div class="w-full bg-neutral-900 border-t border-neutral-800 px-4 py-3 text-white">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <!-- Controles -->
      <div class="flex items-center gap-2">
        <button @click="playerStore.playPreviousSong" :disabled="isCurrentSong" title="Anterior">
          <Icon icon="material-symbols:skip-previous" class="w-6 h-6" />
        </button>

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

        <button @click="playerStore.playNextSong" :disabled="isCurrentSong" title="Siguiente">
          <Icon icon="material-symbols:skip-next" class="w-6 h-6" />
        </button>
      </div>

      <!-- Info de la canción -->
      <div class="text-center flex flex-col items-center md:items-start">
        <p class="text-sm font-semibold">
          {{ playerStore.currentSongTitle }}
        </p>
        <p class="text-xs text-neutral-400">Duración: {{ playerStore.currentSongDuration }}</p>
      </div>

      <!-- Barra de progreso -->
      <div class="flex flex-col w-full md:w-1/2 gap-1">
        <input
          type="range"
          min="0"
          :max="playerStore.durationInSeconds"
          :value="playerStore.currentTime"
          @input="onSeek"
          class="w-full appearance-none h-1 bg-neutral-700 rounded"
          :disabled="isCurrentSong"
        />
        <div class="flex justify-between text-xs text-neutral-400">
          <span>{{ formatTime(playerStore.currentTime) }}</span>
          <span>{{ formatTime(playerStore.durationInSeconds) }}</span>
        </div>
      </div>

      <!-- Volumen -->
      <div class="flex items-center gap-2">
        <button @click="toggleMute" :title="playerStore.isMuted ? 'Desmutear' : 'Mutear'">
          <Icon
            :icon="
              playerStore.isMuted || playerStore.volume === 0
                ? 'material-symbols:volume-off'
                : playerStore.volume <= 50
                  ? 'material-symbols:volume-down'
                  : 'material-symbols:volume-up'
            "
            class="w-5 h-5"
          />
        </button>
        <input
          type="range"
          min="0"
          max="100"
          v-model="volumeValue"
          class="w-24"
          :disabled="isCurrentSong"
        />
      </div>
    </div>
  </div>
</template>
