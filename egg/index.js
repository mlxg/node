const Koa = require('koa')
const init = require('./egg-core')
const app = new Koa()

init(app)

app.use(async (ctx, next) => {
    console.log(ctx.config)
    console.log(ctx.service)
    ctx.type = 'application/json'
    ctx.body = ctx.service.user.getUser()
})

app.listen(3000)

