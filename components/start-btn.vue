
<template lang="pug">
  button.cu-btn.no-bg.h-unset.fixed.flex.justify-center.response(v-if="nearPoint && nearPoint.id" style="bottom:-10upx;left:0;z-index:2" @click="goExam")
    img.bottom-btn.animation-slide-bottom.fade(:src="btnUrl" mode="widthFix")
</template>

<script>
import { sync, get } from "vuex-pathify";
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      btnUrl: "/static/start-btn.png"
    };
  },
  computed: {
    nearPoint: sync("park/nearPoint"),
    auth: sync("auth"),
    isLogin: get("auth/isLogin")
  },
  methods: {
    async goExam() {
      if (!this.isLogin) {
        this.auth.showLogin = "FORCE";
        return;
      }
      uni.navigateTo({
        url: "/pages/exam"
      });
    }
  }
};
</script>

<style lang="stylus" scoped></style>