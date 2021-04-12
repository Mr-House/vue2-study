import VueRouter from './krouter'
import Vue from 'vue'
import Home from '@/views/home/Home'
import About from '@/views/about/About'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { 
      path: '/home',
      component: Home
    },
    { 
      path: '/about', 
      component: About,
      children: [
        { 
          path: 'info', 
          component: {
            render(h) {
              return h('div', 'about info')
            }
          }
        }
      ]
    }
  ]
})
