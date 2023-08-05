const config = {
    token: '',
    port: 20000,
    appID: "",
    appsecret: "",
    handler(req, res) {
        res.end('这里的响应需要根据业务自行处理')
    }
}
module.exports = config