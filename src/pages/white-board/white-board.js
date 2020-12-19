/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const request = require('@common/request/request');
Page({
    data:{
        url:"",
        appIdentifier:"",
        netLessRoomUuid:"",
        roomToken:"",
        webViewBaseUrl:"http://192.168.1.10:8083"
    },
    async onLoad(opt){
        console.log(opt)
        this.setData({
            netLessRoomUuid:opt.netLessRoomUuid,
        });
        await this.initNetLess()
    },
    async initNetLess(){
        let _res = await request.get('/api/config/netless/token/rooms/'+this.data.netLessRoomUuid);
        try {
            this.setData({
                roomToken:_res.data.token,
                appIdentifier:_res.data.netLessAppId,
                url:`${this.data.webViewBaseUrl}?appIdentifier=${_res.data.netLessAppId}&roomToken=${_res.data.token}&netLessRoomUuid=${this.data.netLessRoomUuid}`
            })
            console.log("白板url：",this.data.url)
        } catch (error) {
            console.log(error)
        }
    }
});