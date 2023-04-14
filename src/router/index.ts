import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import earth from '../components/earth.vue'
import father from '../components/widgets/father.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/earth'
  },
  {
    path: '/father',
    component: father,
    //redirect:'/earth',
    // children:[{
    //   path:"/earth",
    //   component: earth,
    //   props:true,
    //   children:[{
    //     path: '/cesium1',
    //     component: layoutVue,
    //   }]
    // }]

  },
  {
    path: '/earth',
    component: earth,
  },
  {
    path:"/:pathMatch(.*)*",
    redirect: '/earth'
  },
  
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
