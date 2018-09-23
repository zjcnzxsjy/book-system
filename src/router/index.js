import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/views/layout/layout'

Vue.use(Router)

export default new Router({
  mode: "hash",
  routes: [
    {
      path: '/index.html',
      name: 'index',
      redirect: "/home"
    },
    {
      path: '',
      name: 'layout',
      component: layout,
      redirect: '/home',
      children: [{
        path:'home',
        name:'home',
        component:  r => require(['@/views/home/home'], r),
        meta: {
          keepAlive: true,
          index: 0
        }
      }, {
        path:'borrow',
        name:'borrow',
        component:  r => require(['@/views/borrow/index'], r),
        meta: {
          keepAlive: true,
          index: 1
        }
      }]
    },
    {
      path: '/searchBooks',
      name: 'searchBooks',
      component: r => require(['@/views/searchBooks/index'], r),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/wannaSee',
      name: 'wannaSee',
      component: r => require(['@/views/wannaSee/index'], r),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/wannaSee/addBook',
      name: 'addBook',
      component: r => require(['@/views/addBook/index'], r)
    },
    {
      path: '/wannaSee/addBook/addedBook',
      name: 'addedBook',
      component: r => require(['@/views/addBook/addedBook'], r)
    },
    // {
    //   path: '/similarBook',
    //   name: 'similarBook',
    //   component: r => require(['@/views/addBook/similarBook'], r)
    // },
    {
      path: '/wannaSee/addBook/addedBook/wannaIntroduction',
      name: 'wannaIntroduction',
      component: r => require(['@/views/addBook/wannaIntroduction'], r)
    },
    {
      path: '/book/details/:id',
      name: 'details',
      component: r => require(['@/views/bookDetails/details'], r)
    },
    {
      path: '/book/newBooks',
      name: 'newBooks',
      component: r => require(['@/views/newBooks/index'], r)
    },
    {
      path: '/book/allBooks',
      name: 'allBooks',
      component: r => require(['@/views/allBooks/index'], r)
    },
    {
      path: '/borrow/details/:id',
      name: 'borrowDetails',
      component: r => require(['@/views/borrowDetails/index'], r)
    },
    {
      path: '/borrow/comment/:id',
      name: 'comment',
      component: r => require(['@/views/comment/index'], r)
    },
    {
      path: 'borrow/details/confirm/borrow',
      name: 'confirmBorrow',
      component: r => require(['@/views/bookDetails/confirmBorrow'], r)
    },
    {
      path: 'borrow/details/confirm/email',
      name: 'confirmEmail',
      component: r => require(['@/views/bookDetails/confirmEmail'], r)
    },
    {
      path: 'borrow/details/status/Success',
      name: 'borrowSuccess',
      component: r => require(['@/views/bookDetails/borrowSuccess'], r)
    }
  ]
})
