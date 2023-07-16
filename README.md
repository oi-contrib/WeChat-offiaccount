# [WeChat-offiaccount](https://github.com/fragement-contrib/WeChat-offiaccount)
微信公众号

## 如何使用？
本项目用于搭建一个微信公众号本地测试环境，都是基于[测试号](http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)来说明。

首先需要在```./nodejs/libs/config.js```中填入自己的appID和appsecret。

### 接入微信公众平台开发

为了接入你首先需要的是“接口配置信息”，这里需要填入```./nodejs/libs/config.js```中的token，和“测试号管理”页面的保持一致即可。

然后你把这个项目在外网可以访问的服务器上运行后，配置后即可通过验证，然后就可以依据接口文档实现业务逻辑。

### JS-SDK使用

比如你启动后，手机可以通过```http://192.168.0.6:20000/wxConfig.html```（无需外网可以访问，如果电脑和手机连同一个wifi，像这里的例子，用局域网ip即可）访问，那么，“JS接口安全域名”中的域名配置成```192.168.0.6:20000```即可。

然后在微信中打开上面的html页面即可（到此为止，你就可以在你的html页面使用[JS-SDK](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)能力了）。

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步