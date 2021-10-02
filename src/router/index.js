import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '@/views/Home.vue'
import Add from '@/views/Add';

// TODO
import TodoIndex from '@/views/Todo/Index';
import TodoDetail from '@/views/Todo/Detail';
// NOTE
import NoteIndex from '@/views/Note/Index';
const routes = [
  {
    path: '/',
    redirect: '/tabs/todo'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/tabs/todo',
    name: 'To Do',
    component: TodoIndex
  },
  {
    path: '/tabs/add',
    name: 'Tambah',
    component: Add
  },
  {
    path: '/tabs/note',
    name: 'Notes',
    component: NoteIndex
  },
  {
    path: '/todo/:id',
    name: 'To Do Detail',
    component: TodoDetail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
