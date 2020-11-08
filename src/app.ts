const Koa = require("koa")
const app = new Koa();
const bodyParser = require('koa-bodyparser')
import router from "./router";

app.use(bodyParser())

app.use(router.routes()).use(router.allowedMethods())


app.listen(3100)