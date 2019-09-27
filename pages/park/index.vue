<template lang="pug">
  view.page.park
    bg
    view(style="margin-top: 100upx")
      view 远香湖党建主题公园
    view
      img.map(:src="mapUrl" mode="scaleToFill" style="height: 750upx;z-index: -1;" @click="goDetail")
      img.absolute.point-img(:src="item.src" mode="widthFix" v-for="(item,index) in points" :index="index" :style="[{'left': item.x, 'top': item.y}]")
    view.fixed.flex.justify-center.response(style="bottom:-10upx;left:0" @click="goExam")
      img(:src="btnUrl" mode="widthFix" style="width: 300upx;")
</template>


<script>
export default {
  data() {
    return {
      mapUrl: "/static/test-map.png",
      btnUrl: "/static/change-map-btn.png",
      points: [
        {
          x: 67 + "px",
          y: 292 + "px",
          src: "/static/p1.png"
        }
      ]
    };
  },
  methods: {
    goDetail() {
      uni.navigateTo({
        url: "/pages/park/detail"
      });
    },
    goExam() {
      uni.navigateTo({
        url: "/pages/exam"
      });
    }
  }
};
</script>

<style lang="stylus">
.park
  .map
    width 750upx
  .desc
    color #595757
    font-weight bold
    font-size 12px
    line-height 2
    width 90vw
    margin 0 auto
    text-indent 20px
    margin-top 50upx
</style>