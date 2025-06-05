<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { generateMockData } from '@/data/mockData';

import type { IAlbum } from '@/types/IAlbum';
import type { ISong } from '@/types/ISong';

import { usePlayerStore } from '@/stores/player.store';

const route = useRoute();
const playerStore = usePlayerStore();

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
  <div>
    <template v-if="isLoading">
      <p>Cargando álbum...</p>
    </template>
    <template v-else-if="selectedAlbum">
      <h1>{{ selectedAlbum.title }}</h1>
      <h2>{{ selectedAlbum.artist }}</h2>

      <h3>Canciones:</h3>
      <ul>
        <li v-for="song in selectedAlbum.songs" :key="song.id" @click="reproduceSong(song)">
          {{ song.title }} - {{ song.duration }}
        </li>
      </ul>
    </template>

    <template v-else>
      <p>Álbum no encontrado.</p>
    </template>
  </div>
</template>
