
// import  whiteWebSdk  from "@lib/white-web-sdk";

// var WhiteWebSdk = require("../../lib/white-web-sdk/src");
//  whiteWebSdk = new WhiteWebSdk({
//     appIdentifier: 'GzczoDt_EeuIHrEufR7KaQ/_7XFxXiZRi8xSg', // 从管理控制台获取 App Identifier
// });
Page({
createRoom(){
    let uuid
    wx.request({
        url:"https://api.netless.link/v5/rooms",
        method: 'POST',
        header: {
            "content-type": "application/json",
        "token": 'NETLESSSDK_YWs9c0Q3LVF1a3p1OFhKMXFoRSZub25jZT0xNjA4MDkwMTQ4MzczMDAmcm9sZT0wJnNpZz0wNTI5MTkyMjFlZjJkMTM0NTdkNTdhYmU2Mzg0ZDdkNzRiMGY4MGE1NDgzYzY5YWFiNDdhY2MyMzgxNTAzYzdk', // 签发的 SDK Token，需提前准备
        },
        
        success:res=>{
             uuid=res.data.uuid
        //    console.log(res)
           wx.request({
            url:"https://api.netless.link/v5/tokens/rooms/"+uuid,
            method: 'POST',
            header: {
                "content-type": "application/json",
            "token": 'NETLESSSDK_YWs9c0Q3LVF1a3p1OFhKMXFoRSZub25jZT0xNjA4MDkwMTQ4MzczMDAmcm9sZT0wJnNpZz0wNTI5MTkyMjFlZjJkMTM0NTdkNTdhYmU2Mzg0ZDdkNzRiMGY4MGE1NDgzYzY5YWFiNDdhY2MyMzgxNTAzYzdk', // 签发的 SDK Token，需提前准备
            },
            data: JSON.stringify({
                "lifespan": 0, // 表明 Room Token 永不失效
                "role": "admin", // 表明 Room Token 有 Admin 的权限
            }),
            success:res=>{
                var joinRoomParams = {
                    uuid: uuid,
                    roomToken: res.data,
                };
                console.log(res)
                // whiteWebSdk.joinRoom(joinRoomParams).then(function(room) {
                //     // 加入房间成功，获取 room 对象
                //     room.bindHtmlElement(this.$refs.whiteboard);
                // }).catch(function(err) {
                //     // 加入房间失败
                //     console.error(err);
                // });
            },
            fail:err=>{

            }
        })
        },
        fail:err=>{
            console.log(err)
        }
    })
},

async onLoad(){
    // console.log(whiteWebSdk)
    await this.createRoom()
}
})