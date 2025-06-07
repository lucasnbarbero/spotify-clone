<script setup lang="ts">
import { computed, ref } from 'vue';
import { generateMockData } from '@/data/mockData';
import { useSearch } from '@/composables/useSearch';

import type { IAlbum } from '@/types/IAlbum';

const albums = ref<IAlbum[]>(generateMockData(5));
const { searchQuery } = useSearch();

const filteredAlbums = computed(() =>
  albums.value.filter((album) => {
    const query = searchQuery.value.toLowerCase();

    return album.title.toLowerCase().includes(query) || album.artist.toLowerCase().includes(query);
  })
);
</script>

<template>
  <div class="p-6">
    <h2 class="text-white text-2xl font-bold mb-4">Álbumes</h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
      <RouterLink
        v-for="album in filteredAlbums"
        :key="album.id"
        :to="{ name: 'AlbumDetailView', params: { id: album.id } }"
        class="bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 rounded-lg p-4 flex flex-col gap-2 shadow-md"
      >
        <img :src="album.cover" :alt="`Portada de ${album.title}`" class="w-full h-auto rounded" />
        <h3 class="text-white font-bold text-base truncate">{{ album.title }}</h3>
        <p class="text-gray-400 text-sm truncate">{{ album.artist }}</p>
      </RouterLink>
    </div>
  </div>
</template>
