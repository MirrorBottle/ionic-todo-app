import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'


// HOME
import HomeIndex from "../views/Home/Index";

// ABSENT
import AbsentIndex from "../views/Absent/Index";

// AUTH
import AuthLogin from "../views/Auth/Login";

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
    redirect: '/login',
    meta: {
      auth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: AuthLogin,
    meta: {
      auth: false
    }
  },
  {
    path: '/tabs/',
    component: TabsPage,
    meta: {
      auth: true
    },
    children: [
      {
        path: '',
        redirect: '/tabs/home',
        meta: {
          auth: true
        }
      },
      {
        path: 'home',
        name: 'Home',
        meta: {
          auth: true
        },
        component: () => HomeIndex
      },
      {
        path: 'note',
        name: 'Catatan',
        meta: {
          auth: true
        },
        component: () => NoteIndex
      },
      {
        path: 'absent',
        name: 'Absensi',
        meta: {
          auth: true
        },
        component: () => AbsentIndex
      },
      {
        path: 'others',
        name: 'Lainnya',
        meta: {
          auth: true
        },
        component: () => OthersIndex
      },
      {
        path: 'todo',
        name: 'Tugas',
        meta: {
          auth: true
        },
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
