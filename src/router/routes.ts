import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/album/:id',
    name: 'AlbumDetailView',
    component: () => import('@/views/AlbumDetailView.vue'),
    props: true, // ⬅️ útil si querés recibir el id como prop
  },
  {
    path: '/library',
    name: 'LibraryView',
    component: () => import('@/views/LibraryView.vue'),
  },
];

export default routes;
