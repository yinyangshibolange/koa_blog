const Koa = require('koa')
const app = new Koa()
import * as db from '../db'

// 定义一个验证用户的策略，需要定义name作为标识
const naiveStrategy = {
    name: 'naive',
    // 策略的主体就是authenticate(req)函数，在成功的时候返回用户身份，失败的时候返回错误
    authenticate: async function (req: any) {
        const user = req.body
        // let uid = req.query.uid
        if (user.subject && user.password) {
            // 策略很简单，就是从参数里获取uid，然后组装成一个user
            // let user = {id: parseInt(uid), name: 'user' + uid}
            const resdata: any = await db.getUserByKeyword(user.subject)
            if(resdata.length === 1 && resdata[0].password === user.password) {
                this.success(user)
            } else {
                this.fail(401)
            }
        } else {
            // 如果找不到uid参数，认为鉴权失败
            this.fail(401)
        }
    }
}

// 调用use()来为passport新增一个可用的策略
const passport = require('koa-passport')
passport.use(naiveStrategy)
// 添加一个koa的中间件，使用naive策略来鉴权。这里暂不使用session
app.use(passport.authenticate('naive'))

// // 业务代码
// const Router = require('koa-router')
// const router = new Router()
// router.get('/', async (ctx: any) => {
//     if (ctx.isAuthenticated()) {
//         // ctx.state.user就是鉴权后得到的用户身份
//         ctx.body = 'hello ' + JSON.stringify(ctx.state.user)
//     } else {
//         ctx.throw(401)
//     }
// })

