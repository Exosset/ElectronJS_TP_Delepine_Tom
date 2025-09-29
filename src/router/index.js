import { createRouter, createWebHashHistory } from 'vue-router';
import Connection from "../views/Connection.vue";
import ItemsList from "../views/ItemsList.vue";

const routes = [
    { path: '/', name: 'Connection', component: Connection },
    { path: '/items', name: 'ItemsList', component: ItemsList }
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;