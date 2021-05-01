import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '@/views/home/Home'
import About from '@/views/about/About'

Vue.use(VueRouter)

//  返回一个工厂函数，可以创建路由实例
export default function createRouter() {
  return new VueRouter({
    mode: 'history',
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
}
