/// <reference path="./wx.d.ts" />

/*=============================微信内全局变量==============================*/
declare global {
    interface Window {
        WeixinJSBridge: any;
        __wxjs_environment: any;
    }
    const WeixinJSBridge: any;
}
export default wx;