import Vue from 'vue'
import App from './App.vue'
import createRouter from './router/router'
import createStore from './store/store'

Vue.config.productionTip = false

// 加一个全局混入，处理客户端asyncData调用
Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options
    console.log(this)
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})

// 返回vue实例工厂函数
export default function createApp(context) {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    context,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
