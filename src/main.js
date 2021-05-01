import Vue from 'vue'
import App from './App.vue'
import createRouter from './router/router'
import createStore from './store/store'

Vue.config.productionTip = false

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
  return { app, router }
}
