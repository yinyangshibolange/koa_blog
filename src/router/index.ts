import artical from './artical';
import user from './user';

const Router = require("koa-router")
let router: any;
if(!router) {
    router = new Router()
}

artical(router);
user(router);

export default router;
