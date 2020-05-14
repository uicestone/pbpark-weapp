import store from "../store";
import { api } from "../common/vmeitime-http";

export const wechatLogin = () =>
  new Promise((resolve, reject) => {
    const provider = "weixin";
    uni.showLoading();
    console.log("Wechat login...");
    uni.login({
      provider,
      success: async loginRes => {
        console.log("Wechat login success.");
        const { code } = loginRes;
        const { data } = await api.wechatLogin({ code });
        const { openid, session_key, user } = data;
        storeUser({ openid, session_key, user });
        if (user.name !== "游客") {
          resolve();
        }
        console.log("Wechat get user info...");
        resolve(wechatGetUserInfo());
      },
      fail(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      }
    });
  });

export const wechatGetUserInfo = () =>
  new Promise((resolve, reject) => {
    const provider = "weixin";
    uni.showLoading();
    uni.getUserInfo({
      provider,
      lang: "zh_CN",
      success: async userData => {
        // console.log(userData);
        try {
          const { userInfo } = userData;
          const { data: user } = await api.updateUser(userInfo);
          const res = { user };
          storeUser(res);
          resolve(res);
        } catch (err) {
          uni.showToast({
            title: "登录失败",
            icon: "none"
          });
          reject(err);
        }
      },
      fail(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      }
    });
  });

export const storeUser = ({ user, openid, session_key } = {}) => {
  try {
    if (user) {
      store.state.auth.user = user;
    }
    if (openid) {
      store.state.auth.openid = openid;
    }
    if (session_key) {
      store.state.auth.session_key = session_key;
    }
    // store.state.auth.showLogin = false;
  } catch (e) {
    console.error(e);
  }
};

export const handlePayment = paymentData =>
  new Promise((resolve, reject) => {
    uni.showLoading();
    uni.requestPayment({
      signType: "MD5",
      ...paymentData,
      success: res => {
        console.log(res);
        resolve({ ...res, ...paymentData });
      },
      fail: res => {
        console.log(res);
        reject(res);
      },
      complete() {
        uni.hideLoading();
      }
    });
  });
