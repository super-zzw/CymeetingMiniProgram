/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import utils from '../../common/utils/utils';
import store from '../../store/index';

const request = require('@common/request/request');
Page({
    data:{
        url:"",
        appIdentifier:"",
        netLessRoomUuid:'',
        roomToken:"",
        meetingId:"",
        confereeId:'',
        channelId:"",
        webViewBaseUrl:"https://h5-meeting.gzcyou.com",
        token:''
    },
    async onLoad(opt){
        console.log(opt)
      
        this.setData({
            netLessRoomUuid:opt.netLessRoomUuid,
            meetingId:opt.meetingId,
            confereeId:opt.confereeId,
            channelId:opt.channelId,
        });
        await this.getSocketToken()
        await this.initNetLess()
    },
    getSocketToken() {
        const that = this;
        request.post('/api/user/get/socket/token', {})
          .then(function(response) {
           
            console.log(response.data)
            if (response) {
                
              that.setData({
                  token: response.data
              })
             
            } else {
             
            }
          })
          .catch(function(err) {
            console.error('请求获取Token接口错误', err);
          });
      },
  
    async initNetLess(){
        let _res = await request.get('/api/config/netless/token/rooms/'+this.data.netLessRoomUuid);
       
        try {
            this.setData({
                roomToken:_res.data.token,
                appIdentifier:_res.data.netLessAppId,
                url:`${this.data.webViewBaseUrl}?appIdentifier=${_res.data.netLessAppId}&roomToken=${_res.data.token}&netLessRoomUuid=${this.data.netLessRoomUuid}&meetingId=${this.data.meetingId}&channelId=${this.data.channelId}&sessionId=${utils.getStorage('sessionId')}&confereeId=${this.data.confereeId}&token=${this.data.token}`
            })
            console.log("白板url：",this.data.url)
        } catch (error) {
            console.log(error)
        }
    }
});