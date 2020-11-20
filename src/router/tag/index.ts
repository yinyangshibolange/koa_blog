import * as db from '../../db'
import * as Router from "koa-router";
import isMyArtical from "../artical/isMyArtical";

export default (router: Router) => {
    router
        .get('/public/tag', async (ctx) => {
            const artical_tags: any = await db.getArticalTags(ctx.query.artical)
            const temps: any[] = []
            artical_tags.forEach((item: any) => {
                temps.push(+item.tag)
            })
            ctx.body = await db.getTagNames(temps)
        })
        .post('/api/tag', async (ctx: any) => {
            const _isMyArtical = isMyArtical(ctx.request.body.artical, ctx.session.passport.user)
            if(_isMyArtical) {
                ctx.body = await db.addArticalTag(ctx.request.body.artical, ctx.request.body.tag)
            } else {
                ctx.body = {
                    success: false,
                    data: '没有添加权限'
                }
            }
        })
        .delete('/api/tag', async (ctx: any) => {
            const _isMyArtical = isMyArtical(ctx.query.artical, ctx.session.passport.user)
            if(_isMyArtical) {
                ctx.body = await db.deleteArticalTag(ctx.query.artical, ctx.query.tag)
            } else {
                ctx.body = {
                    success: false,
                    data: '没有删除权限'
                }
            }
        })

    router.get('/api/mytags', async (ctx: any) => {
        const user = ctx.session.passport.user
        const myArticals: any = await db.getUserArticals(user.id, ctx.query.artical)
        if(myArticals && myArticals.length > 0) {
            const articalIds = myArticals.map((at: any) => +at.id)
            const tags: any = await db.getMyTagIds(articalIds)
            if(tags && tags.length > 0) {
                ctx.body = await db.getTagNames(tags?.map((tag: any) => +tag.tag))
            } else {
                ctx.body  = []
            }
        } else {
            ctx.body = []
        }
    })

    router.get('/public/hottag', async (ctx: any) => {
        const hotn = ctx.query.hotn
        const hotTags: any = await db.getHotTags(hotn); // 获取热门标签，默认前十个
        const tagids = hotTags.map((tag: any) => +tag.tag)
        ctx.body = await db.getTagNames(tagids)
    })

    router.get('/public/searchtag', async (ctx) => {
        ctx.body = await db.searchTags(ctx.query.keyword);
    })

    router
        .get('/public/tagcloud', async (ctx) => {
            // 获取标签云
            ctx.body = await db.getTags();
        })
        .post('/api/tagcloud', async (ctx: any) => {
            const _isMyArtical = isMyArtical(ctx.request.body.artical, ctx.session.passport.user)
            if (_isMyArtical) {
                // 注册标签, 如果已存在，注册失败
                const { artical, name } = ctx.request.body
                const resdata: any = await db.addTag({name})
                console.log(resdata)
                // 如果成功，添加到关系表
                await db.addArticalTag(artical, resdata.id)
                ctx.body = resdata
            } else {
                ctx.body = {
                    success: false,
                    data: '没有权限'
                }
            }

        })
}