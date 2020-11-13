import * as db from '../../db'
import * as Router from "koa-router";
import isMyArtical from "./isMyArtical";

export default (router: Router) => {
    router
        .get('/api/myartical', async (ctx: any) => {
            const user = ctx.session.passport.user
            ctx.body = await db.getArticals({
                user: user.id
            })
        })
        .delete('/api/myartical', async (ctx: any) => {
            const _isMyArtical = isMyArtical({
                artical: ctx.query.artical
            }, ctx.session.passport.user)
            if (_isMyArtical) {
                await db.deleteArtical(ctx.query.artical)
                ctx.body = {
                    success: true,
                    data: '文章删除成功'
                }
            } else {
                ctx.body = {
                    success: false,
                    data: '不是自己的文章，没有删除权限'
                }
            }
        })
        .put('/api/myartical', async (ctx: any) => {
            const _isMyArtical = isMyArtical({
                artical: ctx.request.body.artical
            }, ctx.session.passport.user)
            if (_isMyArtical) {
                await db.updateArtical(ctx.request.body)
                ctx.body = {
                    success: true,
                    data: '保存成功'
                }
            } else {
                ctx.body = {
                    success: false,
                    data: '不是自己的文章，没有修改权限'
                }
            }
        })

    // 创建
    router.get('/api/artical', async (ctx: any) => {
        const user = ctx.session.passport.user
        const time = new Date()
        const artical = {
            user: user.id,
            title: '文章标题',
            time: time,
            lasttime: time,
            content: '*请在此处开始输入文章内容*'
        }
        ctx.body = await db.addArtical(artical)
    })

    router
        .get('/public/artical', async (ctx) => {
            ctx.body = await db.getArticals(ctx.query)
        })

}