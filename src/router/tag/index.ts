import * as db from '../../db'
import * as Router from "koa-router";

export default (router: Router) => {
    router
        .get('/api/tag', async (ctx) => {
            const artical_tags: any = await db.getArticalTags(ctx.query.artical)
            const temps: any[] = []
            artical_tags.forEach((item: any) => {
                temps.push(item.tag)
            })
            const tags = await db.getTagNames(temps)
            ctx.body = tags
        })
        .post('/api/tag', async (ctx) => {
            const { artical, tag } = ctx.request.body
            ctx.body = await db.addArticalTag(artical, tag)
        })
        .delete('/api/tag', async (ctx) => {
            ctx.body = await db.deleteArticalTag(ctx.query.artical, ctx.query.tag)
        })

    router
        .get('/api/tagcloud', async (ctx) => {
            // 获取标签云
        })
        .post('/api/tagcloud', async (ctx) => {
            // 注册标签, 如果已存在，注册失败
            const { artical, name } = ctx.request.body
            const resdata: any = await db.addTag({name})
            console.log(resdata)
            // 如果成功，添加到关系表
            const resdata1 = await db.addArticalTag(artical, resdata.id)
            ctx.body = resdata
        })
}