let Vue
class Store {
  constructor(options = {}) {
    this.$options = options

    this._mutations = options.mutations || {}
    this._actions = options.actions || {}
    this._wrappedGetters = options.getters

    this.getters = {}
    const computed = {}

    Object.keys(this._wrappedGetters).forEach(key => {
      const fn = this._wrappedGetters[key]
      computed[key] = () => {
        return fn(this.state)
      }
      Object.defineProperty(this.getters, key, {
        get: () => {
          return this._vm[key]
        }
      })
    })

    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed
    })

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  commit(type, payload) {
    const mutation = this._mutations[type]
    if (!mutation) {
      console.error(`unknow mutation：${type}`);
      return
    }

    mutation(this.state, payload)
  }

  dispatch(type, payload) {
    const action = this._actions[type]
    if (!action) {
      console.error(`unknow action：${type}`);
      return
    }

    return action(this, payload)
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(val) {
    console.error('please use store.replaceState() to explicit replace store state');
  }
}

function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install }