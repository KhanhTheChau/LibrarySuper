import { createRouter, createWebHistory } from "vue-router";
import LibraryView from "../views/LibraryView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  { path: "/", component: LibraryView },
  { path: "/:pathMatch(.*)*", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
