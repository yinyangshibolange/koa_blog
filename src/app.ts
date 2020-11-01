// import  config from './config'
const Koa = require("koa")
const app = new Koa();
import router from "./router";

// router.get('/aa', async (ctx: Context) => {
//     ctx.body = 'aaaaaa'
// })
app.use(router.routes()).use(router.allowedMethods())

// let conextBody = '';
// app.use(async (ctx: ExtendableContext, next: Next)=> {
//     conextBody += '1'
//     await next();
//     // 这里的代码最后调用
//     conextBody += '2'
//     ctx.body = conextBody
// })
//
// app.use(async (ctx: ExtendableContext, next: Next)=> {
//     conextBody += '3'
//     await next();
//     conextBody += '4'
//     conextBody += '4'
// })
//
// app.use(async (ctx: ExtendableContext, next: Next)=> {
//     conextBody += '5'
//     await next();
//     conextBody += '6'
// })

app.listen(3100)