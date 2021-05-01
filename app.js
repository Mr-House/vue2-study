const express = require('express')
const app = express()
const createRender = require('./src/entry-server')

app.get('*', async (req, res) => {
  try {
    const html = await createRender()
    res.send(html)
  } catch (error) {
    res.status(500).send('服务器内部错误')
  }
})

app.listen(3000)

// 首屏渲染
// 客户端路由激活
