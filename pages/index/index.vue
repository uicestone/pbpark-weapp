<template lang="pug">
  view.page
    view.flex.flex-direction.align-center(style="margin-top: 200upx")
      button.cu-btn.round.bg-blue.menu-btn(@click="navigateTo('/pages/park/index')") 主题公园
      button.cu-btn.round.bg-blue.menu-btn(@click="navigateTo('/pages/ranking')") 排行榜
      button.cu-btn.round.bg-blue.menu-btn(@click="navigateTo('/pages/readme')") 比赛须知
</template>

<script>
export default {
  onLoad() {
    //dev
    this.navigateTo("/pages/exam");
  },
  methods: {
    async navigateTo(url) {
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
.menu-btn
  width 70vw
  height 100upx
  border 4upx solid white
  margin-top 40upx
  font-size 40upx
  letter-spacing 20rpx
  font-weight bold
  background #0d6bb8
</style>