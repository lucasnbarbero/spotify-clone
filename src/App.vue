<script setup lang="ts">
import { useFavotiresStore } from './stores/favorites.store';

import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import PlayerBar from './components/PlayerBar.vue';
import ToastNotification from './components/ToastNotification.vue';

const favoritesStore = useFavotiresStore();

favoritesStore.loadFromLocalStorage();
</script>

<template>
  <div class="h-screen flex flex-col bg-black text-white">
    <div class="flex flex-1 overflow-hidden">
      <Sidebar class="w-64 bg-neutral-900 p-4" />
      <div class="flex-1 flex flex-col overflow-hidden">
        <Header class="bg-neutral-800 p-4" />
        <main class="flex-1 overflow-y-auto p-4 bg-black">
          <RouterView />
        </main>
      </div>
    </div>
    <PlayerBar
      class="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 p-4 z-10"
    />
    <ToastNotification />
  </div>
</template>
