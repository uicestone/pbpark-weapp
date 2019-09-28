
<template lang="pug">
  view.fixed.flex.justify-center.response(style="bottom:-10upx;left:0" @click="goExam" v-show="enabled")
    img(:src="btnUrl" mode="widthFix" style="width: 300upx;")
</template>

<script>
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
  methods: {
    goExam() {
      uni.navigateTo({
        url: "/pages/exam"
      });
    }
  }
};
</script>

<style lang="stylus" scoped></style>