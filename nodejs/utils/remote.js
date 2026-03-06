const https = require('https');
const http = require('http');

exports.get = function (url, options = {}) {
    return new Promise((resolve, reject) => {

        let handler = /^https/.test(url) ? https : http;

        handler.get(url, res => {
            res.on('data', (data) => {
                if (options.json) {
                    resolve(JSON.parse(data.toString('utf8')));
                } else {
                    resolve(data);
                }
            });
        }).on('error', (e) => {
            reject(e);
        });
    })
}