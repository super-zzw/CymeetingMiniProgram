/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import regeneratorRuntime from '../../lib/regenerator-runtime/regenerator-runtime';
const AgoraRTC = require('../../lib/agora-miniapp-sdk/Agora_Miniapp_SDK_for_WeChat'); // æ–°ç‰ˆæœ¬
import aesjs from '../../lib/aes-js/aes-js';
import { Base64 } from '../../lib/base64/base64';
import * as Utils from '../../common/utils/utils';

const key = 'polyvliveSDKAuth';
// const key = '0CoJUm6Qyw8W8jud';
const iv = '1111000011110000';
// const iv = '0102030405060708';

class RTC extends AgoraRTC.Client {
  constructor() {
    super();
  }

  init(channelId) {
    this.channelId = channelId;
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.getChannelKey(channelId);
        // const opts = this.decryptChannelKey(res, key, iv);
        // console.log(opts)
        // console.log('密钥=', opts);
        this.clientInfo = res;
        super.init(res.connect_appId, () => {
        // super.init('wx54ccd187c56bae50', () => {
          resolve(res);
        }, (err) => {
          Utils.showToast({ title: '客户端初始化失败，请退出重试', icon: 'none' });
          reject(err);
        });
      } catch (err) {
        console.log(err)
        reject(err);
      }
    });
  }
  // init(channelId) {
  //   this.channelId = channelId;
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const res = await this.getChannelKey(channelId);
  //       super.init('wx54ccd187c56bae50', () => {
  //       // super.init('wx54ccd187c56bae50', () => {
  //         resolve(res);
  //       }, (err) => {
  //         Utils.showToast({ title: '客户端初始化失败，请退出重试', icon: 'none' });
  //         reject(err);
  //       });
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  // join() {
  //   const uid = Math.floor(Math.random() * 999999);
  //   return new Promise((resolve, reject) => {
  //     super.join(this.clientInfo.connect_channel_key, this.channelId, uid, (uid) => {
  //       resolve(uid);
  //     }, reject);
  //   });
  // }

  getChannelKey(channelId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.polyv.net/live/v2/channels/${channelId}/mic-auth`,
        method: 'GET',
        data: {
          channelId,
          type: 'web',
          timestamp: new Date().getTime()
        },
        success(res) {
          console.log(res)
          if (res && res.data.code == 200) {
           
            resolve(res.data.data);
          } else {
            resolve(-1);
          }
        },
        fail(err) {
          reject(err);
        }
      });
    });
  }

  getChannelKey(channelId) {
    return new Promise((resolve, reject) => {
      wx.request({
        // url:'http://192.168.1.6:9111/api/config/agora/token/'+channelId,
        url:'https://meeting.gzcyou.com/api/config/agora/token/'+channelId,
        method: 'GET',
        success(res) {
          console.log(res)
          if (res && res.data.code == 200000) {
           
            resolve(res.data.data);
          } else {
            resolve(-1);
          }
        },
        fail(err) {
          reject(err);
        }
      });
    });
  }

  decryptChannelKey(text, key, iv) {
    const bytesKey = aesjs.utils.utf8.toBytes(key);
    const bytesIv = aesjs.utils.utf8.toBytes(iv);
    const textBytes = aesjs.utils.hex.toBytes(text);
   
    // eslint-disable-next-line new-cap
    const aesCbc = new aesjs.ModeOfOperation.cbc(bytesKey, bytesIv);
    const decryptedBytes = aesCbc.decrypt(textBytes);
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    // return Base64.decode(decryptedText)
    return JSON.parse(Base64.decode(decryptedText));
  }
}

export default RTC;
