<template lang="pug">
  view.cu-modal.bottom-modal(:class="[auth.showLogin ? 'show':'']")
    view.cu-dialog.no-bg
      view.cu-bar.flex
        button.bg-grey.flex-sub.margin-sm(v-if="auth.showLogin!=='FORCE'" @click="cancelLogin()") 暂不登录
        button.bg-red.flex-sub.margin-sm(open-type='getUserInfo', @getuserinfo='wechatGetUserInfo', withcredentials='true') 微信登录
 
</template>

<script>
import { wechatGetUserInfo } from "../services";
import { sync } from "vuex-pathify";

export default {
  computed: {
    auth: sync("auth")
  },
  methods: {
    async wechatGetUserInfo() {
      try {
        const res = await wechatGetUserInfo();
        console.log(res);
        this.auth.showLogin = false;
        this.$emit("success");
      } catch (err) {
        console.log(err);
        this.$emit("fail");
      }
    },
    cancelLogin() {
      this.auth.showLogin = false;
      this.$emit("fail");
    }
  }
};
</script>

<style lang="stylus">
.no-bg
  background transparent
</style>
