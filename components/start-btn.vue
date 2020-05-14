
<template lang="pug">
  view
    login(@success="wechatGetUserInfoSuccess" @fail="wechatGetUserInfoFail")
    button.cu-btn.no-bg.h-unset.fixed.flex.justify-center.response(v-if="point.id || (nearPoint && nearPoint.id)" style="bottom:-10upx;left:0;z-index:2" @click="goExam")
      img.bottom-btn.animation-slide-bottom.fade(:src="btnUrl" mode="widthFix")
</template>

<script>
import { sync, get } from "vuex-pathify";
import login from "../pages/login";

export default {
  components: { login },
  props: {
    enabled: {
      type: Boolean,
      default: true
    },
    point: {
      type: Object
    }
  },
  data() {
    return {
      btnUrl: "/static/start-btn.png"
    };
  },
  computed: {
    nearPoint: sync("park/nearPoint"),
    forcePoint: sync("park/forcePoint"),
    auth: sync("auth"),
    isLogin: get("auth/isLogin")
  },
  methods: {
    async goExam() {
      try {
        await this.wechatGetUserInfo(true);
        uni.navigateTo({
          url: "/pages/exam"
        });
      } catch (error) {
        console.error("用户拒绝授权用户信息");
      }
    },
    async wechatGetUserInfo(force = false) {
      if (this.isLogin) return;
      this.auth.showLogin = force ? "FORCE" : true;
      return new Promise((resolve, reject) => {
        this.wechatGetUserInfoSuccess = resolve;
        this.wechatGetUserInfoFail = reject;
      });
    }
  },
  mounted() {
    if (this.point && this.point.id) {
      this.forcePoint = this.point;
    } else {
      this.forcePoint = {};
    }
  }
};
</script>

<style lang="stylus" scoped></style>