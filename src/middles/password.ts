const passport = require('koa-passport')
const log4js = require('koa-log4')
const logger = log4js.getLogger('passport')
const LocalStrategy = require('passport-local').Strategy
const md5 = require('md5')
import * as db from '../db'

passport.use(new LocalStrategy(
    /**
     * @param username 用户输入的用户名
     * @param password 用户输入的密码
     * @param done 验证验证完成后的回调函数，由passport调用
     */
    async function (username: string, password: string, done: any) {
        const users: any = await db.getUserByKeyword(username)
        if(users && users.length > 0) {
            const user = users[0]
            if(user.password === md5(password)) {
                console.log('登录成功', user)
                return done(null, doPassword(user),'登录成功')
            } else {
                console.log('登录失败，密码错误')
                return done(null, false, '密码错误')
            }
        } else {
            console.log('用户名不存在')
            return done(null, false, '用户不存在')
        }
    }
))

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function (user: any, done: any) {
    console.log('serializeUser', user)
    done(null, user)
})

// deserializeUser 在每次请求的时候将从 mongodb 中读取用户对象
passport.deserializeUser(async function (user: any, done: any) {
    console.log('deserializeUser', user)
    const users: any = await db.getUserById(user.id)
    done(null, doPassword(users[0]))
})

//隐藏密码,相当于是去掉密码的用户信息保存在session里
function doPassword(user: any) {
    if(user) {
        user.password = ''
        return user
    } else {
        return null
    }
}

export default passport