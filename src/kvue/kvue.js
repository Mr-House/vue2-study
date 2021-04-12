
class KVue {
  constructor(options = {}) {
    this.$options = options

    this.$data = options.data

    this.observe(this.$data)

    this.compile(document.querySelector(options.el))
  }

  observe(obj) {
    if (typeof obj !== 'object' || obj === null) return
    Object.keys(obj).forEach(key => {
      this.defineReactive(obj, key, obj[key])
    })
  }

  defineReactive(obj, key, val) {
    this.observe(val)
    const vm = this
    Object.defineProperty(obj, key, {
      get() {
        console.log('get', key, val)
        return val
      },
      set(newVal) {
        if (newVal !== val) {
          console.log('set', key, val)
          val = newVal
          vm.compile(document.querySelector(vm.$options.el))
        }
      }
    })
  }

  compile(root) {
    if (root === undefined || root === null) return
    root.childNodes.forEach(node => {
      if (this.isElement(node)) {
        console.log('node=', node)
      }
      if (this.isInter(node)) {
        node.textContent = this.$data[RegExp.$1]
      }
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  isElement(node) {
    return node.nodeType === 1
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}

console.log(KVue)