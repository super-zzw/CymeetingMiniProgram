// import WhiteWebSdk from '../../lib/white-web-sdk/white-web-sdk'
// var utils=require('../../lib/white-web-sdk/white-web-sdk')
import regeneratorRuntime from '../../common/regenerator-runtime/runtime-module';
Page({
    async onLoad(){
        await this.createRoom()
    },
    data:{
        room:123
    },
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
                // var whiteWebSdk = new utils.WhiteWebSdk();
                // whiteWebSdk.joinRoom(joinRoomParams).then(function(room) {
                //     this.setData({
                //         room:room
                //     })
                //     // 加入房间成功，获取 room 对象
                //     room.bindHtmlElement(document.getElementById("whiteboard"));
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


})