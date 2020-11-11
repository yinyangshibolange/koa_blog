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
            ctx.body = await db.getTagNames(temps)
        })
        .post('/api/tag', async (ctx) => {
            ctx.body = await db.addArticalTag(ctx.request.body.artical, ctx.request.body.tag)
        })
        .delete('/api/tag', async (ctx) => {
            ctx.body = await db.deleteArticalTag(ctx.query.artical, ctx.query.tag)
        })

    router.get('/api/hottag', async (ctx: any) => {
        const hotn = ctx.query.hotn
        const hotTags: any = await db.getHotTags(hotn); // 获取热门标签，默认前十个
        const tagids = hotTags.map((tag: any) => tag.id)
        ctx.body = await db.getTagByIds(tagids)
    })

    router.get('/api/searchtag', async (ctx) => {
        ctx.body = await db.searchTags(ctx.query.keyword);
    })

    router
        .get('/api/tagcloud', async (ctx) => {
            // 获取标签云
            ctx.body = await db.getTags();
        })
        .post('/api/tagcloud', async (ctx) => {
            // 注册标签, 如果已存在，注册失败
            const { artical, name } = ctx.request.body
            const resdata: any = await db.addTag({name})
            console.log(resdata)
            // 如果成功，添加到关系表
            await db.addArticalTag(artical, resdata.id)
            ctx.body = resdata
        })
}