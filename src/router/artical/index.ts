import * as db from '../../db'
import * as Router from "koa-router";

export default (router: Router) => {
    router
        .get('/api/artical', async (ctx) => {
            ctx.body = await db.getArticals(ctx.query)
        })
        .delete('/api/artical', async (ctx) => {
            ctx.body = await db.deleteArtical(ctx.query.id)
        })
        .put('/api/artical', async (ctx) => {
            ctx.body = await db.updateArtical(ctx.request.body)
        })

    router.get('/api/artical/:userid', async (ctx) => {
            const time = new Date()
            const artical = {
                user: ctx.params.userid,
                title: '文章标题',
                time: time,
                lasttime: time,
                content: '*请在此处开始输入文章内容*'
            }
            ctx.body = await db.addArtical(artical)
        })
}