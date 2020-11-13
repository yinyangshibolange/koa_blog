// 路由相关
import {Next} from "koa";
import passport from "../../middles/password";
import * as Router from "koa-router";
import * as db from '../../db'
const md5 = require('md5')

export default (router: Router ) => {
    router.post('/xauth/reg', async (ctx) => {
        const username = ctx.request.body.username
        const users: any = await db.getUserByKeyword(username)
        if(!username) {
            ctx.body = {
                success: false,
                data: '用户名不能为空'
            }
            return
        }
        if(users[0]) {
            ctx.body = {
                success: false,
                data: '用户名已存在'
            }
            return
        }
        const email = ctx.request.body.email
        // const users1: any = await db.getUserByKeyword(email)
        // if(users1[0]) {
        //     ctx.body = {
        //         success: false,
        //         data: '邮箱已存在'
        //     }
        //     return
        // }
        const regResult = await db.addUser({
            email: email,
            username: username,
            password: md5(ctx.request.body.password)
        })
        ctx.body = {
            success: true,
            data: '注册成功'
        }
    })
    /**
     * 认证登录
     */
    router.post('/xauth/login', function (ctx: any, next: Next) {
        return passport.authenticate('local', function (err: Error, user: any, info: any, status: any) {
            console.log(err)
            console.log(user)
            console.log(info)
            console.log(status)
            if(err) {
                console.log(err)
                ctx.body = err
                return
            }
            if (user) {
                ctx.body = info
                return ctx.login(user)
            } else {
                ctx.body = info
            }
        })(ctx, next)
    })

    /**
     * 认证登出
     */
    router.get('/xauth/logout', async function (ctx: any, next: Next) {
        await ctx.logout()
        if (!ctx.isAuthenticated()) {
            ctx.body = {
                success: true,
                data: '登录已退出'
            }
        } else {
            ctx.body = {
                success: false,
                data: '无法注销登录请重试'
            }
        }
    })

// 以下为自定义需要身份认证的路由
    router.post('/xauth/test', function (ctx: any, next: Next) {
        if (ctx.isAuthenticated()) {
            ctx.body = '认证通过'
        } else {
            ctx.throw(401)
            ctx.body = '非法访问'
        }
    })


}
