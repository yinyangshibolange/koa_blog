import * as db from '../../db'
import * as Router from "koa-router";

export default (router: Router) => {
    router
        .get('/api/artical', async (ctx) => {
            // const data = await db.getArticals()
            ctx.body = await db.getArticals(ctx.query)
        })

    router.get('/api/artical/:userid', async (ctx) => {
            const time = new Date()
            const artical = {
                user: ctx.params.userid,
                title: '文章标题',
                time: time,
                lasttime: time
            }
            ctx.body = await db.addArtical(artical)
        })
}