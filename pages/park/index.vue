<template lang="pug">
  view.page.park
    bg
    start-btn
    view(style="margin-top: 100upx")
      title
    view.relative
      img.map(:src="mapUrl" mode="scaleToFill" style="height: 750upx;z-index: -1;")
      img.absolute.point-img(:src="item.src" :class="'point-img-'+index" @click="goDetail"  mode="widthFix" v-for="(item,index) in points" :index="index" :style="[{'left': item.x, 'top': item.y}]")
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
          x: uni.upx2px(53 * 2) + "px",
          y: uni.upx2px(280 * 2) + "px",
          src: "/static/p1.png"
        },
        {
          x: uni.upx2px(146 * 2) + "px",
          y: uni.upx2px(220 * 2) + "px",
          src: "/static/p2.png"
        },
        {
          x: uni.upx2px(260 * 2) + "px",
          y: uni.upx2px(185 * 2) + "px",
          src: "/static/p3.png"
        },
        {
          x: uni.upx2px(280 * 2) + "px",
          y: uni.upx2px(140 * 2) + "px",
          src: "/static/p4.png"
        },
        {
          x: uni.upx2px(183 * 2) + "px",
          y: uni.upx2px(124 * 2) + "px",
          src: "/static/p5.png"
        },
        {
          x: uni.upx2px(103 * 2) + "px",
          y: uni.upx2px(170 * 2) + "px",
          src: "/static/p6.png"
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
    width 247 * 0.66666upx
    height 147 * 0.66666upx
  .point-img-0
    width 333 * 0.66666upx
    height 70 * 0.66666upx
  .point-img-1
    width 247 * 0.66666upx
    height 147 * 0.66666upx
  .point-img-2
    width 247 * 0.66666upx
    height 147 * 0.66666upx
  .point-img-5
    width 332 * 0.66666upx
    height 69 * 0.66666upx
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