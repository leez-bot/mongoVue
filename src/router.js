import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const Book = () => import('./views/Books.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about/:id',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      children: [
        {
          path: 'about-child',
          component: () => import('./views/AboutChild.vue')
        }
      ]
    },
    {
      path: '/books',
      name: 'books',
      component: Book
    }
  ]
})
