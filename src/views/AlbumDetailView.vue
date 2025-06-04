<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const albumId = computed(() => route.params.id as string);
</script>

<template>
  <div>
    <p>Página de Detalle del Àlbum: [{{ albumId }}]</p>
  </div>
</template>
