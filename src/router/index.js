import { createRouter, createWebHashHistory } from 'vue-router'
import Connection from "../views/Connection.vue"
import ItemsList from "../views/ItemsList.vue"
import Registration from "../views/Registration.vue"
import ItemDetail from "../views/ItemDetail.vue"
import ItemEdit from "../views/ItemEdit.vue"
import ItemDelete from "../views/ItemDelete.vue"

const routes = [
  { path: '/', name: 'Connection', component: Connection },
  { path: '/inscription', name: 'Registration', component: Registration },
  { path: '/items/:id/details', name: 'ItemDetail', component: ItemDetail, props: true },
  { path: '/items/:id/edit', name: 'ItemEdit', component: ItemEdit, props: true },
  { path: '/items/:id/delete', name: 'ItemDelete', component: ItemDelete, props: true },
  { path: '/items', name: 'ItemsList', component: ItemsList }
]

const router = createRouter({
  history: createWebHashHistory(), // important pour Electron
  routes
})

export default router
