const Koa = require('koa')
// const os = require('os')
const path = require('path')
// console.log(os.networkInterfaces())



// const { createProxyMiddleware } = require('http-proxy-middleware')
const proxy = require('koa-better-http-proxy')

const static = require('koa-static')

const logger = require('koa-logger')

const app = new Koa()

app.use(logger())

app.use(static(path.join(__dirname, '../public')))

app.use(proxy('192.168.1.21', {
  port: 8200,
  filter: (ctx) => {
    return ctx.request.URL.pathname.includes('/api')
  }
}))

// app.use('/api', createProxyMiddleware({
//   target: 'http://192.168.1.71:8995',
//   changeOrigin: true
// }))

app.listen(3750, () => {
  console.log(`the proxy-server is running on port 3750`)
})
