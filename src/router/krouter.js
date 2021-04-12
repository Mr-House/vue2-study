let Vue
export default class VueRouter {
  constructor(options = {}) {
    this.$options = options
    this.routeMap = {}
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
    console.log(window.location)
    this.current = window.location.hash.slice(1) || '/'
    // 当前地址匹配到的路由数组matched, matched应该是响应式的，这样在路由变化的时候才会触发route-view重新渲染
    Vue.util.defineReactive(this, 'matched', [])

    this.match()

    // 监听哈希路由变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }

  onHashChange() {
    this.current = window.location.hash.slice(1)
    this.matched = []
    this.match()
  }

  match(routes) {
    routes = routes || this.$options.routes
    for(const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
      } 
    }
  }
}

VueRouter.install = _Vue => {
  Vue = _Vue
  // 1. 挂载一个路由器实例$router
  Vue.mixin({
    beforeCreate() {
      // 在组件创建前将路由对象代理到this上，方便使用
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 2. 注册全局组件router-link、router-view
  Vue.component('routerLink', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      return h('a', { attrs: { href: `#${this.to}` } }, this.$slots.default)
    }
  })

  Vue.component('routerView', {
    render(h) {
      this.$vnode.data.routerView = true

      let depth = 0
      let parent = this.$parent
      while(parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data
        if (vnodeData && vnodeData.routerView) {
          depth++
        }
        parent = parent.$parent
      }

      const route = this.$router.matched[depth]
      const component = route ? route.component : null
      return h(component)
    }
  })
}

