<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <header class="flex items-center gap-2">
    <button class="text-neutral-400 hover:text-white">
      <Icon icon="material-symbols:arrow-back" class="text-2xl" />
    </button>
    <button class="text-neutral-400 hover:text-white">
      <Icon icon="material-symbols:arrow-forward" class="text-2xl" />
    </button>
  </header>
</template>
