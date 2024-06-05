# [WeChat-offiaccount](https://github.com/oi-contrib/WeChat-offiaccount)
微信公众号辅助调试服务器 + 微信官方js-sdk，支持typescript开发

<p>
    <a href="https://zxl20070701.github.io/toolbox/#/npm-download?packages=wechat-offiaccount&interval=7">
        <img src="https://img.shields.io/npm/dm/wechat-offiaccount.svg" alt="downloads">
    </a>
    <a href="https://www.npmjs.com/package/wechat-offiaccount">
        <img src="https://img.shields.io/npm/v/wechat-offiaccount.svg" alt="Version">
    </a>
    <a href="https://github.com/oi-contrib/WeChat-offiaccount" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/oi-contrib/WeChat-offiaccount?style=social">
    </a>
</p>

<img src="https://nodei.co/npm/wechat-offiaccount.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">

本项目用于搭建一个微信公众号本地测试环境，同时集成了微信官方js-sdk，支持typescript开发，为了简单，我们基于[测试号](http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)来说明。

> 非测试号也可以使用，填入正确字段即可，如果有问题，可以[issue](https://github.com/oi-contrib/WeChat-offiaccount/issues)给我们留言！

## 如何本地调试？

首先需要在```./offiaccount.config.js```中填入自己的appID和appsecret。

### 接入微信公众平台开发

为了接入你首先需要的是“接口配置信息”，这里需要填入```./offiaccount.config.js```中的token，和“测试号管理”页面的保持一致即可。

然后你把这个项目在外网可以访问的服务器上运行后，配置后即可通过验证，然后就可以依据接口文档实现业务逻辑。

### JS-SDK使用

比如你启动后，手机可以通过```http://192.168.0.6:20000```（无需外网可以访问，如果电脑和手机连同一个wifi，像这里的例子，用局域网ip即可）访问，那么，“JS接口安全域名”中的域名配置成```192.168.0.6:20000```即可。

然后在微信中打开上面的html页面即可（到此为止，你就可以在你的html页面使用[JS-SDK](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)能力了）。

## 如何在项目中使用？
为了方便随时随地使用，我们发布了npm包，只需要项目中安装后就可以按照下面说明使用需要的能力了：

```
npm install --save wechat-offiaccount
```

### JS-SDK使用

首先，准备一份配置文件，比如在当前目录下有一个文件```offiaccount.config.js```，内容如下：

```js
// 具体的改为自己的即可
const config = {
    port:8080,
    appID: "",
    appsecret: ""
}
module.exports = config
```

然后，在```package.json```中配置启动命令：

```js
{
    "scripts": {
        "offiaccount": "offiaccount-cli --config offiaccount.config.js"
    }
}
```

然后执行启动命令：

```
npm run offiaccount
```

接着，我们用浏览器最新的fetch举例子：

```js
import wx from "wechat-offiaccount"
fetch("http://" + window.location.hostname + ":8080/JsApiSignature?url=" + window.location.href.split('#')[0], {
    method: "get"
}).then(function (response) {
    response.json()
        .then(function (res) {

            wx.config({
                debug: true,
                appId: res.appId, 
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表
            })

            wx.error(function (res) {
                console.error(res)
            })

        })
})
```

上面已经配置好了，并且申请了```wx.chooseImage```权限，后续用的时候，只需要：

```js
import wx from "wechat-offiaccount"
wx.ready(function () {
    console.log('准备好了！')

    // todo
})
```

比如访问的地址是：```http://192.168.0.6:20000/index.html```

### 接入微信公众平台开发

把当前目录下的文件```offiaccount.config.js```内容修改如下：

```js
// 具体的改为自己的即可
const config = {
    token: '',
    port: 8080,
    appID: "",
    appsecret: "",
    handler(req, res) {
        // 需要自己处理业务请求
    }
};
module.exports = config
```

然后需要启动后部署到外网可以访问的服务器上，最后就可以作为微信公众号后台服务器使用，然后进行各种测试学习了。

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步