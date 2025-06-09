<!-- src/components/ToastNotification.vue -->
<script setup lang="ts">
import { useToastStore } from '@/stores/toast.store';
import { Icon } from '@iconify/vue';

const toastStore = useToastStore();

function getToastClasses(type: string = 'info') {
  switch (type) {
    case 'success':
      return 'bg-green-600 text-white';
    case 'error':
      return 'bg-red-600 text-white';
    case 'info':
    default:
      return 'bg-neutral-800 text-white';
  }
}

function getIconName(type: string = 'info') {
  switch (type) {
    case 'success':
      return 'material-symbols:check-circle';
    case 'error':
      return 'material-symbols:error-outline';
    case 'info':
    default:
      return 'material-symbols:info-outline';
  }
}

function closeToast(id: number) {
  toastStore.removeToast(id);
}
</script>

<template>
  <div class="fixed top-6 right-6 flex flex-col gap-3 z-50">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      :class="[
        'flex items-start gap-3 px-5 py-4 rounded-xl shadow-lg w-96 relative',
        getToastClasses(toast.type),
      ]"
    >
      <Icon :icon="getIconName(toast.type)" class="w-6 h-6 mt-0.5 shrink-0" />
      <span class="text-base flex-1">{{ toast.message }}</span>
      <button
        @click="closeToast(toast.id)"
        class="absolute top-2 right-2 text-white hover:text-gray-300"
      >
        <Icon icon="material-symbols:close" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
