<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { generateMockData } from '@/data/mockData';
import { useFavotiresStore } from '@/stores/favorites.store';
import { usePlayerStore } from '@/stores/player.store';
import type { ISong } from '@/types/ISong';

const favoritesStore = useFavotiresStore();
const playerStore = usePlayerStore();

const favoritesSong = ref<ISong[]>([]);
const isLoading = ref(true);

onMounted(() => {
  isLoading.value = true;
  const albums = generateMockData(12);

  const allSongs = albums.flatMap((album) => album.songs);
  favoritesSong.value = allSongs.filter((s) => favoritesStore.favotireSongIds.includes(s.id));

  isLoading.value = false;
});

function reproduceSong(song: ISong) {
  playerStore.playSong(song);
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl text-white font-bold mb-6">Tu biblioteca</h1>

    <template v-if="isLoading">
      <p class="text-white">Cargando canciones favoritas...</p>
    </template>

    <template v-else-if="favoritesSong.length">
      <ul class="divide-y divide-neutral-700">
        <li
          v-for="song in favoritesSong"
          :key="song.id"
          @click="reproduceSong(song)"
          class="cursor-pointer px-4 py-3 flex justify-between items-center rounded hover:bg-neutral-800 transition-colors duration-150"
          :class="{
            'text-green-500 bg-gray-700': playerStore.currentSong?.id === song.id,
            'text-white': playerStore.currentSong?.id !== song.id,
          }"
        >
          <span class="truncate">{{ song.title }}</span>
          <span class="text-sm text-neutral-400">{{ song.duration }}</span>
        </li>
      </ul>
    </template>

    <template v-else>
      <p class="text-white">No tienes canciones favoritas</p>
    </template>
  </div>
</template>
