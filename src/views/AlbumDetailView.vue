<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { generateMockData } from '@/data/mockData';

import type { IAlbum } from '@/types/IAlbum';
import type { ISong } from '@/types/ISong';

import { usePlayerStore } from '@/stores/player.store';
import { useFavotiresStore } from '@/stores/favorites.store';
import { Icon } from '@iconify/vue';

const route = useRoute();
const playerStore = usePlayerStore();
const favoritesStore = useFavotiresStore();

const isLoading = ref(true);
const albumId = route.params.id as string;

const albums = generateMockData(12);
const selectedAlbum = ref<IAlbum | null>(null);

function reproduceSong(song: ISong) {
  playerStore.playSong(song);
}

onMounted(() => {
  isLoading.value = true;

  setTimeout(() => {
    const albums = generateMockData(12);
    selectedAlbum.value = albums.find((album) => album.id.toString() === albumId) || null;
    isLoading.value = false;
  }, 800);
});
</script>

<template>
  <div class="p-6">
    <template v-if="isLoading">
      <p class="text-white">Cargando álbum...</p>
    </template>

    <template v-else-if="selectedAlbum">
      <div class="mb-6">
        <h1 class="text-white text-3xl font-bold">{{ selectedAlbum.title }}</h1>
        <h2 class="text-gray-400 text-xl">{{ selectedAlbum.artist }}</h2>
      </div>

      <h3 class="text-white text-lg font-semibold mb-2">Canciones:</h3>
      <ul class="divide-y divide-gray-700">
        <li
          v-for="song in selectedAlbum.songs"
          :key="song.id"
          @click="reproduceSong(song)"
          class="cursor-pointer px-4 py-3 flex justify-between items-center rounded hover:bg-gray-800 transition-colors duration-150"
          :class="{
            'text-green-500 bg-gray-700': playerStore.currentSong?.id === song.id,
            'text-white': playerStore.currentSong?.id !== song.id,
          }"
        >
          <div class="flex items-center gap-3">
            <button
              @click.stop="favoritesStore.toggleFavorite(song.id)"
              class="text-xl text-red-500 hover:text-red-400 transition-colors"
            >
              <Icon
                class="cursor-pointer"
                :icon="
                  favoritesStore.isFatorite(song.id)
                    ? 'material-symbols:favorite'
                    : 'material-symbols:favorite-outline'
                "
              />
            </button>
            <span class="truncate">{{ song.title }}</span>
          </div>
          <span class="text-sm text-gray-400">{{ song.duration }}</span>
        </li>
      </ul>
    </template>

    <template v-else>
      <p class="text-red-500">Álbum no encontrado.</p>
    </template>
  </div>
</template>
