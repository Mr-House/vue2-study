import createApp from './main.js'

// context由renderer传入
export default context => {
  return new Promise((resolve, reject) => {
    // 获取vue和路由实例
    const { app, router, store } = createApp()
    // 跳转首屏地址
    router.push(context.url)
    router.onReady(() => {
      const matched = router.getMatchedComponents()
      if (!matched.length) {
        return reject({ code: 404 })
      }
      const promises = matched.map(comp => {
        if (comp.asyncData) {
          return comp.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })
      Promise.all(promises)
        .then(() => {
          context.state = store.state
          resolve(app)
        })
        .catch(() => {
          reject()
        })
    }, reject)
  })
}
