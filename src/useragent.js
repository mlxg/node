const Koa = require('koa')
const {userAgent} = require('koa-useragent')
const log = require('./log')
const app = new Koa()


app.use(userAgent)
app.use(log({format: text => `${text}`}))

app.listen(8888)