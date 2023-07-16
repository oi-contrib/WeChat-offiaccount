const sha1 = require('sha1')
const { appID } = require('./config')

module.exports = () => {
    return (req, res, next) => {

        const { url } = req.query

        /**
         * 生成js-sdk的签名
         * 1、组合参与签名的四个参数：jsapi_ticket（临时票据）、noncestr（随机字符串）、timestamp（时间戳）、url（当前服务器地址）
         * 2、将其进行字典序排序，以‘&’拼接在一起
         * 3、进行sha1加密，最终生成signature
         */

        require('./getJsapiTicket')().then(jsapi_ticket => {

            // 获取随机字符串
            const noncestr = (Math.random() + "").split('.')[1]

            // 获取时间戳
            const timestamp = new Date().valueOf()

            // 排序并拼接
            const str = [
                `jsapi_ticket=${jsapi_ticket}`,
                `noncestr=${noncestr}`,
                `timestamp=${timestamp}`,
                `url=${url}`
            ].sort().join("&")

            // sha1加密
            const sha1Str = sha1(str)

            res.send(JSON.stringify({
                appId: appID,
                timestamp,
                nonceStr: noncestr,
                signature: sha1Str
            }))

        })

    }

}