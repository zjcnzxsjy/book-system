import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: r => require(['@/views/home/index'], r)
    },
    {
      path: '/searchBooks',
      name: 'searchBooks',
      component: r => require(['@/views/searchBooks/index'], r)
    },
    {
      path: '/wantToSee',
      name: 'wantToSee',
      component: r => require(['@/views/wantToSee/index'], r)
    },
    {
      path: '/addBook',
      name: 'addBook',
      component: r => require(['@/views/addBook/index'], r)
    },
    {
      path: '/existedBook',
      name: 'existedBook',
      component: r => require(['@/views/addBook/existedBook'], r)
    },
    {
      path: '/similarBook',
      name: 'similarBook',
      component: r => require(['@/views/addBook/similarBook'], r)
    },
    {
      path: '/wantedIntroduction',
      name: 'wantedIntroduction',
      component: r => require(['@/views/addBook/wantedIntroduction'], r)
    },
    {
      path: '/details',
      name: 'details',
      component: r => require(['@/views/bookDetails/index'], r)
    }
  ]
})
