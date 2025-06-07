<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useSearch } from '@/composables/useSearch';

const { searchQuery } = useSearch();
</script>

<template>
  <header class="flex items-center gap-2">
    <button class="text-neutral-400 hover:text-white">
      <Icon icon="material-symbols:arrow-back" class="text-2xl" />
    </button>
    <button class="text-neutral-400 hover:text-white">
      <Icon icon="material-symbols:arrow-forward" class="text-2xl" />
    </button>

    <input
      type="text"
      placeholder="Buscar álbum o artista..."
      v-model="searchQuery"
      class="bg-neutral-800 text-white text-sm rounded px-3 py-1 outline-none focus:ring-2 focus:ring-green-500"
    />
  </header>
</template>
