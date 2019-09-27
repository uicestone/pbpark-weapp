<template lang="pug">
  view.page.park
    bg
    view(style="margin-top: 100upx")
      view 远香湖党建主题公园
    view.relative
      img.map(:src="mapUrl" mode="scaleToFill" style="height: 750upx;z-index: -1;")
      img.absolute.point-img(:src="item.src" @click="goDetail"  mode="top" v-for="(item,index) in points" :index="index" :style="[{'left': item.x, 'top': item.y}]")
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
          x: uni.upx2px(53 * 6) + "px",
          y: uni.upx2px(280 * 6) + "px",
          src: "/static/p1.png"
        },
        {
          x: uni.upx2px(136 * 6) + "px",
          y: uni.upx2px(220 * 6) + "px",
          src: "/static/p2.png"
        },
        {
          x: uni.upx2px(260 * 6) + "px",
          y: uni.upx2px(220 * 6) + "px",
          src: "/static/p3.png"
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
  .point-img
    zoom 0.3333
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