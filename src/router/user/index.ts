import * as db from '../../db'
import * as Router from "koa-router";

export default (router: Router) => {
    router.get('/api/user', async (ctx) => {
        // const data = await db.getUsers()
        ctx.body = await db.getUsers()
    })
}