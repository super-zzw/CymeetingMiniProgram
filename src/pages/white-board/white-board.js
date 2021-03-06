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
const app = getApp()
Page({
  data: {
    url: "",
    appIdentifier: "",
    netLessRoomUuid: '',
    roomToken: "",
    meetingId: "",
    confereeId: '',
    channelId: "",
    webViewBaseUrl: "https://h5-meeting.gzcyou.com",
    // webViewBaseUrl:"https://192.168.1.10:8082",
    token: ''
  },
  async onLoad(opt) {
    console.log(opt)

    this.setData({
      netLessRoomUuid: opt.netLessRoomUuid,
      meetingId: opt.meetingId,
      confereeId: opt.confereeId,
      channelId: opt.channelId,
    });
    // await this.getSocketToken()
    await this.initNetLess()
    let data = JSON.stringify({

      "event": "VIEW_NETLESS",
      "meetingId": this.data.meetingId,


      "timeStamp": new Date().getTime()
    })
    app.sendWxSocket(data, () => {
      console.log('发送成功')
    })

  },
 

  async initNetLess() {
    let _res = await request.get('/api/config/netless/token/rooms/' + this.data.netLessRoomUuid);

    try {
      this.setData({
        roomToken: _res.data.token,
        appIdentifier: _res.data.netLessAppId,
        url: `${this.data.webViewBaseUrl}?appIdentifier=${_res.data.netLessAppId}&roomToken=${_res.data.token}&netLessRoomUuid=${this.data.netLessRoomUuid}&meetingId=${this.data.meetingId}&channelId=${this.data.channelId}&sessionId=${utils.getStorage('sessionId')}&confereeId=${this.data.confereeId}&token=${this.data.token}`
      })
      this.switchStatus();
      console.log("白板url：", this.data.url)
    } catch (error) {
      console.log(error)
    }
  },
  async switchStatus() {
    let _res = await request.post('/api/meeting/meeting/viewstatus', {
      meetingId: this.data.meetingId,
      status: "netless", //切换白板netless，切换会议agora
    });
    try {
      console.log(_res)
    } catch (error) {
      console.log(error)
    }
  }
});
