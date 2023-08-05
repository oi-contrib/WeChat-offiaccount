const express = require('express')
const path = require('path')
const auth = require('./libs/auth')
const JsApiSignature = require('./libs/JsApiSignature')
const { log, error, network } = require('devby')
const jsonfile = require('../package.json')

module.exports = (config) => {
    const app = express()

    // 静态资源
    app.use(express.static(path.resolve(__dirname, '../html')))

    // 获取微信签名
    app.get("/JsApiSignature", JsApiSignature(config))

    /**
     * 我们这里使用测试号，通过”接口配置信息“来验证
     * https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
     */
    app.use(auth(config))

    app.listen(config.port, () => {

        let ipv4 = network().IPv4[0]?.address || '127.0.0.1'

        log(`${jsonfile.name}@v${jsonfile.version}
微信公众号辅助调试服务器启动成功
        `)
        error(`访问 http://${ipv4}:${config.port}`)
    })
}