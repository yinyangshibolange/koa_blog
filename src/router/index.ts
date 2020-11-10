import artical from './artical';
import user from './user';
import comment from './comment'
import tag from './tag'
import xauth from './xauth'

const Router = require("koa-router")
let router: any;
if(!router) {
    router = new Router()
}

artical(router);
user(router);
comment(router);
tag(router);
xauth(router);

export default router;
