function defineReactive(obj, key, val) {
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', val)
      return val
    },
    set(newVal) {
      observe(newVal)
      console.log('set', newVal)
      if (val !== newVal) {
        val = newVal
      }
      
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return

  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function set(obj, key, val) {
  defineReactive(obj, key, val)
}

const obj = {
  name: 'lt',
  age: 23,
  year: {
    current: '2021',
    last: '2020'
  }
}
observe(obj)
obj.name
obj.name = 'liutao'
obj.year.current
// obj.year = {
//   second: '2019'
// }
set(obj.year, 'second', '2019')
obj.year.second = '2019'
set(obj, 'sex', 'man')
obj.sex