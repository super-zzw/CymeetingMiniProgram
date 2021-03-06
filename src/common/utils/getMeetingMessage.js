import store from '../../store/index';
import utils from '../../common/utils/utils';
import { initChat } from '../../common/chat/initChat';
const request = require('@common/request/request');
const config = require('@common/config');
let launched=false; 
let socket=null
export {
  getAppID,
  getMeetingDetail,
  getScoketToken,
  createWebSocket
};
// 获取AppID和AppSecrect
function getAppID() {
  if (!utils.getStorage('sessionId')) return Promise.resolve();
  const hasAppId = !!store.get('app.appId');
  if (hasAppId) return Promise.resolve();
  const confereeId = store.get('main.confereeId');
  return request.post('/api/user/getPolyvAppInfo', {}).then(({ code, data: { appId, appSecret, userId } = {} }) => {
    if (code == config.successCode) {
      store.set('app', { appId, appSecret, userId: confereeId, polyvUserId: userId });
    }
    return;
  });
}

// 获取议会详情
function getMeetingDetail(meetingId) {
  const sessionId = utils.getStorage('sessionId');
  if (!sessionId || !meetingId) return;
  return request.post('/api/meeting/getMeetingDetail', { meetingId, sessionId }).then(res => {
    if (res.code != config.successCode) return;
    const { confereeId, conferees, channelId, isHost } = res.data;
    store.set('main.confereeId', confereeId);
    store.set('main.meetingUsers', conferees);
    store.set('main.channelId', channelId);
    initChat({ channelId: channelId, pageType: parseInt(isHost) === 1 ? 'create' : 'join' });
    return res.data;
  });
}

//获取websocket token
function getScoketToken(){
  return request.post('/api/user/get/socket/token').then(res => {
    if (res.code != config.successCode) return;
    return res.data;
  });
}

async function createWebSocket(){
  if(!launched){
    let socketToken = await getScoketToken();
    let _wsurl = `wss://meeting.gzcyou.com/socket/${socketToken}`;
    console.log("wxScoketUrl:",_wsurl)
    socket = wx.connectSocket({
      url: _wsurl,
    })

    socket.onMessage(data => {
      //返回判断是否是本人
      // console.log("收到ws数据:",data);
    })

    socket.onOpen(() => {
      console.log('WebSocket已连接')
    })
    socket.onError((emsg) => {
      console.log("WebSocket连接出错：",emsg)
      this.reconnect()
    })
    socket.onClose((msg) => {
      console.log('WebSocket关闭连接连接:',msg)
      this.reconnect()
    })
  }
  
}