
<template lang="pug">
  button.cu-btn.no-bg.h-unset.fixed.flex.justify-center.response(v-if="point.id || (nearPoint && nearPoint.id)" style="bottom:-10upx;left:0;z-index:2" @click="goExam")
    img.bottom-btn.animation-slide-bottom.fade(:src="btnUrl" mode="widthFix")
</template>

<script>
import { sync, get } from "vuex-pathify";
export default {
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
      if (!this.isLogin) {
        this.auth.showLogin = "FORCE";
        return;
      }
      console.log("Go exam...");
      uni.navigateTo({
        url: "/pages/exam"
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