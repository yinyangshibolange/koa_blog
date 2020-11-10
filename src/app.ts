import {Next} from "koa";

const Koa = require("koa")
const app = new Koa();
const bodyParser = require('koa-bodyparser')
import router from "./router";

// Sessions
const session = require('koa-session')
app.keys = ['idafr041rg123']
app.use(session({}, app))

const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser())

app.use(async (ctx: any, next: Next) => {
    const apiUrlReg = /^\/api/
    if(apiUrlReg.test(ctx.originalUrl)) {
        if(ctx.isAuthenticated()) {
            console.log('1122next')
            await next()
        } else {
            ctx.status = 401
            ctx.body = {
                success: false,
                data: '登录认证失败'
            }
        }
    } else {
        console.log('next')
        await next()
    }
})
app.use(router.routes()).use(router.allowedMethods())


app.listen(3100)