import { createRouter, createWebHistory } from 'vue-router'
import PostsView from '../views/PostsView.vue'
import DetailView from '../views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // project views
    {
      path: '/',
      name: 'home',
      component: PostsView,
    },
    {
      path : '/note/:id' ,
      name : 'note',
      component : DetailView,
    }
    // form test
    ,{
      path: '/form',
      name: 'home',
      component: () => import('../components/FormItem.vue'),
    }
  ],
})

export default router
