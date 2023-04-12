import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import father from '../components/widgets/father.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/HelloWorld'
  },
  {
    path: '/father',
    component: father,
    //redirect:'/HelloWorld',
    // children:[{
    //   path:"/HelloWorld",
    //   component: HelloWorld,
    //   props:true,
    //   children:[{
    //     path: '/cesium1',
    //     component: layoutVue,
    //   }]
    // }]

  },
  {
    path: '/HelloWorld',
    component: HelloWorld,
  },
  {
    path:"/:pathMatch(.*)*",
    redirect: '/HelloWorld'
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
