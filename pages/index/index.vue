<template lang="pug">
  view.page
    login(@success="wechatGetUserInfoSuccess" @fail="wechatGetUserInfoFail")
    start-btn
    img.bg.response.h-screen(:src="bgUrl" mode="aspectFill")
    img.logo(:src="logoUrl" mode="aspectFill")
    view.flex.flex-direction.align-center(style="padding-top: 280upx")
      button.cu-btn.round.bg-blue.menu-btn(@click="navigateTo('/pages/park/index')")
        .text 主题公园
      button.cu-btn.round.bg-blue.menu-btn(@click="navigateTo('/pages/ranking')")
        .text 排行榜
      button.cu-btn.round.bg-blue.menu-btn(@click="navigateTo('/pages/readme')")
        .text 比赛须知
</template>

<script>
import { wechatLogin } from "../../services";
import { sync, get } from "vuex-pathify";
import login from "../login";

export default {
  components: { login },
  data() {
    return {
      bgUrl: "/static/home-bg.jpg",
      logoUrl: "/static/logo.png"
    };
  },
  onLoad() {
    this.checkLogin();
  },
  computed: {
    auth: sync("auth"),
    isLogin: get("auth/isLogin")
  },
  methods: {
    async checkLogin() {
      if (this.isLogin) return;
      try {
        await wechatLogin();
      } catch (error) {
        console.warn(error);
      }
    },
    async wechatGetUserInfo(force = false) {
      if (this.isLogin) return;
      this.auth.showLogin = force ? "FORCE" : true;
      return new Promise((resolve, reject) => {
        this.wechatGetUserInfoSuccess = resolve;
        this.wechatGetUserInfoFail = reject;
      });
    },
    async navigateTo(url) {
      try {
        await this.wechatGetUserInfo();
      } catch (error) {
        console.error("用户拒绝授权用户信息");
      }
      uni.navigateTo({
        url
      });
    }
  }
};
</script>

<style lang="stylus">
.page
  height 100vh
  width 100vw
.logo
  width 176.6667upx
  height 193.3333upx
  position absolute
  left 50upx
  top 50upx
.menu-btn
  width 70vw
  height 100upx
  border 4upx solid white
  margin-top 40upx
  font-size 40upx
  letter-spacing 20rpx
  font-weight bold
  background #0d6bb8
  .text
    margin-right -20upx
</style>