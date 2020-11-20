import * as db from '../../db'
import * as Router from "koa-router";
import isMyArtical from "./isMyArtical";

export default (router: Router) => {
    router
        .get('/api/myartical', async (ctx: any) => {
            const user = ctx.session.passport.user
            ctx.body = await db.getUserArticals(user.id, ctx.query.artical)
        })
        .delete('/api/myartical', async (ctx: any) => {
            const _isMyArtical = isMyArtical(ctx.query.artical, ctx.session.passport.user)
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
            const _isMyArtical = isMyArtical(ctx.request.body.artical, ctx.session.passport.user)
            if (_isMyArtical) {
                const updateBody = {
                    lasttime: new Date(),
                    ...ctx.request.body,
                }
                const updateResult: any = await db.updateArtical(updateBody)
                if(updateResult.affectedRows > 0) {
                    ctx.body = {
                        success: true,
                        data: '保存成功'
                    }
                } else {
                    ctx.body = {
                        success: false,
                        data: '保存失败'
                    }
                }
            } else {
                ctx.body = {
                    success: false,
                    data: '不是自己的文章，没有修改权限'
                }
            }
        })

    // 创建
    router.post('/api/createartical', async (ctx: any) => {
        const user = ctx.session.passport.user
        const time = new Date()
        const artical = {
            user: user.id,
            title: '文章标题',
            time: time,
            lasttime: time,
            content: '*请在此处开始输入文章内容*',
        }

        const createdArticalId = await db.addArtical(artical)
        if(createdArticalId !== undefined && createdArticalId !== null) {
            const articalid = ctx.request.body.artical
            const tagid = ctx.request.body.tag
            if(articalid !== undefined && articalid !== null && tagid !== undefined && tagid !== null) {
                await db.addArticalTag(articalid, tagid)
            }
            ctx.body = createdArticalId
        }


    })

    router.get('/public/artical', async (ctx: any) => {
        const articals: any = await db.getArticalIdsByTag(ctx.query.tag)
        const articalIds = articals.map((artical: any) => artical.artical)
        ctx.body = await db.getArticalByArticalIds(articalIds)
    })

    router
        .get('/api/artical', async (ctx: any) => {
            const articals: any = await db.getArticalIdsByTag(ctx.query.tag)
            const articalIds = articals.map((artical: any) => artical.artical)
            ctx.body = await db.getArticalByArticalIds(articalIds, ctx.session.passport.user?.id)
        })

}