import * as db from '../../db'
import * as Router from "koa-router";

export default (router: Router) => {
    router
        .get('/api/comment', async (ctx) => {
            const resdata: any = await db.getComments(ctx.query.artical)
            // 非递归遍历算法，时间复杂度为n^2
            resdata.forEach((itemx: any) => {
                resdata.forEach((itemy: any) => {
                    if(itemx.parentid === itemy.id) {
                        if(!itemy.children) {
                            itemy.children = []
                        }
                        itemy.children.push(itemx)
                    }
                })
            })
            const tempdata = resdata.filter((item: any) => {
                return item.parentid === null
            })
            ctx.body = tempdata
        })
        .post('/api/comment', async (ctx) => {
            const comment = ctx.request.body
            comment.time = new Date();
            ctx.body = await db.comment(comment)
        })

}