import createApp from './main.js'

// context由renderer传入
export default context => {
  return new Promise((resolve, reject) => {
    // 获取vue和路由实例
    const { app, router } = createApp()
    // 跳转首屏地址
    router.push(context.url)
    router.onReady(() => {
      resolve(app)
    }, reject)
  })
}
