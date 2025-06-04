<script setup lang="ts">
import { ref } from 'vue';
import { generateMockData } from '@/data/mockData';

import type { IAlbum } from '@/types/IAlbum';

const albums = ref<IAlbum[]>(generateMockData(5));
</script>

<template>
  <div>
    <RouterLink
      v-for="album in albums"
      :key="album.id"
      :to="{ name: 'AlbumDetailView', params: { id: album.id } }"
    >
      <img :src="album.cover" :alt="`Portada de ${album.title}`" />
      <h3>{{ album.title }}</h3>
      <p>{{ album.artist }}</p>
    </RouterLink>
  </div>
</template>
