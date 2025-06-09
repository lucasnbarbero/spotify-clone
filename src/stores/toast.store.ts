//  src/stores/toast.store.ts
import { defineStore } from 'pinia';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type?: ToastType;
}

let toastId = 0;

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
  }),

  actions: {
    showToast(message: string, type: Toast['type'] = 'info', duration = 3000) {
      const id = toastId++;
      this.toasts.push({ id, message, type });

      setTimeout(() => this.removeToast(id), duration);
    },

    removeToast(id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
  },
});
