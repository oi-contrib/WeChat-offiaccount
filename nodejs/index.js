const express = require('express')
const path = require('path')
const auth = require('./libs/auth')
const JsApiSignature = require('./libs/JsApiSignature')

const app = express()

// 静态资源
app.use(express.static(path.resolve(__dirname, '../html')))

// 获取微信签名
app.get("/JsApiSignature", JsApiSignature())

/**
 * 我们这里使用测试号，通过”接口配置信息“来验证
 * https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
 */
app.use(auth())

app.listen(20000, () => {
    console.log(">>> 服务器启动成功")
})