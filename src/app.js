/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/*
 * @Author: Chenyintang
 * @Date: 2019-06-06 11:55:38
 * @Last modified by:   Chenyintang
 * @Last modified time: 2019-06-09 18:44:46
 */
import regeneratorRuntime from '@lib/regenerator-runtime/regenerator-runtime';

App({
  async onShow() {
    this.getSystemInfo();
  },
  onLaunch(){
    console.log(this)
  },
  globalData: {
    systemInfo: {}, // 系统信息
    isIphoneX: false, // 是否是iPhoneX机型
    titleBarHeight: 0, // 头部高度
    statusBarHeight: 0, // 导航栏高度
    isCanChangeMic: true, // 参会者是否可以自行操作开关麦，默认可以
    isChangedPage: false, // 会议中页码是否被隐藏
    isFirstEntryMeetingPage: true, // 是否第一次进入过会议中页面

    socketStatus: 'closed',  //
    socketToken:"",  //
    wxScoket:null
  },
  // 获取系统信息
  getSystemInfo() {
    const res = wx.getSystemInfoSync();
    this.globalData.systemInfo = res;
    this.globalData.statusBarHeight = res.statusBarHeight;
    this.globalData.isIphoneX = res.model.toLowerCase().includes('iPhone X'.toLowerCase());
  },
  //建立wxsocket
  initSocket(){
    if(!this.globalData.wxScoket){
      let _wsurl = `wss://meeting.gzcyou.com/socket/${this.globalData.socketToken}`;
      // let _wsurl = `wss://meeting.gzcyou.com/socket/${this.globalData.socketToken}`;
      console.log("wxScoketUrl:",_wsurl)
      this.globalData.wxScoket = wx.connectSocket({
        url: _wsurl,
      })

      this.globalData.wxScoket.onMessage(data => {
        //返回判断是否是本人
        console.log("收到ws数据:",data);
      })

      this.globalData.wxScoket.onOpen(() => {
        console.log('WebSocket已连接')
      })
      this.globalData.wxScoket.onError((emsg) => {
        console.log("WebSocket连接出错：",emsg)
      })
      this.globalData.wxScoket.onClose((msg) => {
        console.log('WebSocket关闭连接连接:',msg)
      })
    }

    

  },

  //发送wxscoket数据
  sendWxSocket(data,cb){
    if(this.globalData.wxScoket){
      this.globalData.wxScoket.send({
        data:data,  //string/ArrayBuffer
        success:() => {
          console.log("发送消息成功")
          cb && cb()
        },
        fail:(err) => {
          console.log("发送消息失败：",err)
        },
      })
    }
  },

  //关闭wxscoket
  closeWxSocket(cb){
    if(this.globalData.wxScoket){
      this.globalData.wxScoket.close({
        success:() => {
          cb && cb()
        }
      })
    }
  }
});
