import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'


// HOME
import HomeIndex from "../views/Home/Index";

// ABSENT
import AbsentIndex from "../views/Absent/Index";

// AUTH
import AuthIndex from "../views/Auth/Index";

// OTHERS
import OthersIndex from "../views/Others/Index";

// TODO
import TodoIndex from '@/views/Todo/Index';
import TodoArchive from '@/views/Todo/Archive';
import TodoDetail from '@/views/Todo/Detail';

// NOTE
import NoteIndex from '@/views/Note/Index';

const routes = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => HomeIndex
      },
      {
        path: 'note',
        name: 'Catatan',
        component: () => NoteIndex
      },
      {
        path: 'absent',
        name: 'Absensi',
        component: () => AbsentIndex
      },
      {
        path: 'others',
        name: 'Lainnya',
        component: () => OthersIndex
      },
      {
        path: 'todo',
        name: 'Tugas',
        component: () => TodoIndex
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
