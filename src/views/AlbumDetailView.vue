<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { generateMockData } from '@/data/mockData';

import type { IAlbum } from '@/types/IAlbum';
import { usePlayerStore } from '@/stores/player.store';
import type { ISong } from '@/types/ISong';

const route = useRoute();

const playerStore = usePlayerStore();

const albumId = route.params.id as string;

const albums = generateMockData(12);

const selectedAlbum = computed((): IAlbum | undefined => {
  return albums.find((album) => album.id.toString() === albumId);
});

function reproduceSong(song: ISong) {
  playerStore.playSong(song);
}
</script>

<template>
  <div>
    <template v-if="selectedAlbum">
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
