
<template lang="pug">
  view.fixed.flex.justify-center.response(v-if="nearPoint.id" style="bottom:-10upx;left:0" @click="goExam")
    img(:src="btnUrl" mode="widthFix" style="width: 300upx;")
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