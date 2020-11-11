import * as db from '../../db'
import * as Router from "koa-router";
const md5 = require('md5')

export default (router: Router) => {
    router.get('/api/user', async (ctx) => {
        // const data = await db.getUsers()
        ctx.body = await db.getUsers()
    })

    router.get('/api/getUser', async (ctx: any) => {
        ctx.body = ctx.session.passport.user
    })

    router.put('/api/email', async (ctx: any) => {
        // const resdata =
        await db.updateUserEmail(ctx.request.body.email, ctx.session.passport.user.id)
        ctx.body = {
            success: true,
            data: '邮箱更新成功'
        }
    })

    router.put('/api/password', async (ctx: any) => {
        const cur_user = ctx.session.passport.user
        if (cur_user) {
            const users: any = await db.getUserById(cur_user.id)
            if (users[0].password === md5(ctx.request.body.oldpassword)) {
                // 修改密码
                await db.updateUserPassword(md5(ctx.request.body.newpassword), cur_user.id)
                ctx.body = {
                    success: true,
                    data: '密码修改成功，请重新登录'
                }
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
                return
            } else {
                ctx.body = {
                    success: false,
                    data: '原密码不正确，密码修改失败'
                }
                return
            }
        }
    })
}