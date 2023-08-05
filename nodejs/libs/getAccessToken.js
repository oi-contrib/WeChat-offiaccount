const { get } = require('devby')
const fs = require('fs')
const path = require('path')

const accessTokenPath = path.resolve(process.cwd(), './access_token.json')

// 获取access_token
function getAccessToken(config) {
    const { appID, appsecret } = config

    return new Promise((resolve, reject) => {
        // 定义请求地址
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`

        // 发送请求
        get(url, {
            json: true
        }).then(res => {

            console.log('>>> 获取新的 access_token')

            // 添加过期时间
            res.endtime = new Date().valueOf() + (res.expires_in - 300) * 1000

            // 写入文件
            fs.writeFileSync(accessTokenPath, JSON.stringify(res, null, 4))

            resolve(res.access_token)
        }).catch(err => {

            console.log(err)

            reject(err)
        })
    })
}

module.exports = (config) => {

    // 如果文件不存在，一定需要重新获取
    if (!fs.existsSync(accessTokenPath)) {
        return getAccessToken(config)
    } else {
        let data = JSON.parse(fs.readFileSync(accessTokenPath, 'utf-8'))

        // 没有过期，直接返回
        if (data.endtime > new Date().valueOf()) {
            return Promise.resolve(data.access_token)
        }

        // 过期了，重新获取
        else {
            return getAccessToken(config)
        }

    }

}