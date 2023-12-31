const { get } = require('devby')
const fs = require('fs')
const path = require('path')

const jsapiTicketPath = path.resolve(process.cwd(), './jsapi_ticket.json')

const getAccessToken = require('./getAccessToken')

// 获取access_token
function getJsapiTicket(config, allData = {}) {
    return new Promise((resolve, reject) => {
        getAccessToken(config).then(accessToken => {

            // 定义请求地址
            const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`

            // 发送请求
            get(url, {
                json: true
            }).then(res => {

                console.log('>>> 获取新的 jsapi_ticket')

                // 添加过期时间
                res.endtime = new Date().valueOf() + (res.expires_in - 300) * 1000

                // 写入文件
                allData[config.appID] = res
                fs.writeFileSync(jsapiTicketPath, JSON.stringify(allData, null, 4))

                resolve(res.ticket)
            }).catch(err => {

                console.log(err)

                reject(err)
            })

        })
    })
}

module.exports = (config) => {

    // 如果文件不存在，一定需要重新获取
    if (!fs.existsSync(jsapiTicketPath)) {
        return getJsapiTicket(config)
    } else {
        let allData = JSON.parse(fs.readFileSync(jsapiTicketPath, 'utf-8'));
        let data = allData[config.appID]

        // 没有过期，直接返回
        if (data && data.endtime > new Date().valueOf()) {
            return Promise.resolve(data.ticket)
        }

        // 过期了，重新获取
        else {
            return getJsapiTicket(config, allData)
        }

    }

}