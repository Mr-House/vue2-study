function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return;

  new Observer(obj);
}

function defineReactive(obj, key, val) {
  observe(val);
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      Dep.target && dep.addWatchers(Dep.target);

      console.log('get', key, val);

      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key, val);

        // 传入新值v可能还是对象
        observe(newVal);

        val = newVal;

        // 通知更新
        dep.notify();
      }
    },
  });
}

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(newVal) {
        vm.$data[key] = newVal;
      },
    });
  });
}

class KVue {
  constructor(options = {}) {
    this.$options = options;

    this.$data = options.data;

    // 响应式处理
    observe(this.$data);

    // 代理$data到vue实例
    proxy(this);

    // 编译
    new Compile(this, options.el);
  }
}

class Observer {
  constructor(value) {
    this.value = value;
    this.walk(value);
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

class Compile {
  constructor(vm, el) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    if (this.$el) {
      this.compile(this.$el);
    }
  }

  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        this.compileElement(node);

        if (node.childNodes && node.childNodes.length > 0) {
          this.compile(node);
        }
      } else if (this.isInterpolation(node)) {
        this.compileText(node);
      }
    });
  }

  isElement(node) {
    return node.nodeType === 1;
  }

  isInterpolation(node) {
    console.log(node);
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  compileText(node) {
    this.update(node, RegExp.$1, 'text');
  }

  compileElement(node) {
    const attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      const attrName = attr.name;
      const exp = attr.value;
      if (this.isDirection(attrName)) {
        const dir = attrName.slice(1);
        this[dir] && this[dir](node, exp);
      }
    });
  }

  isDirection(name) {
    return name.startsWith('k-');
  }

  text(node, exp) {
    this.update(node, exp, 'text');
  }

  html(node, exp) {
    this.update(node, exp, 'html');
  }

  update(node, exp, dir) {
    const fn = this[dir + 'Updater'];
    fn && fn(node, this.$vm[exp]);
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val);
    });
  }

  textUpdater(node, val) {
    node.textContent = val;
  }

  htmlUpdater(node, val) {
    node.innerHTML = val;
  }
}

class Watcher {
  constructor(vm, key, updaterFn) {
    this.vm = vm;
    this.key = key;
    this.updaterFn = updaterFn;

    Dep.target = this;
    this.vm[this.key];
    Dep.target = null;
  }

  update() {
    this.updaterFn.call(this.vm, this.vm[this.key]);
  }
}

class Dep {
  constructor() {
    this.watchers = [];
  }

  addWatchers(watcher) {
    this.watchers.push(watcher);
  }

  notify() {
    this.watchers.forEach(watcher => {
      watcher.update();
    });
  }
}

console.log(KVue);
