const sha1 = require('sha1')
const { token } = require('./config')

module.exports = () => {
    return (req, res, next) => {

        /**
         * 如何验证信息来自微信服务器？
         * 1、req.query.timestamp、req.query.nonce、token按照字典顺序排列成一个数组
         * 2、把上述数组拼接成字符串，然后使用sha1加密
         * 3、上面加密完成的结果和req.query.signature进行对比，如果一样，就通过
         * 
         * 通过的话，返回 req.query.echostr
         * 不通过的话，返回 'error'
         */
        const { timestamp, nonce, signature, echostr } = req.query

        // 排序并拼接
        const str = [nonce, timestamp, token].sort().join("")

        // sha1加密
        const sha1Str = sha1(str)

        if (sha1Str == signature) {
            res.send(echostr)
        } else {
            res.end('error')
        }

    }
}
