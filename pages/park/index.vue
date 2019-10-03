<template lang="pug">
  view.page.park
    bg
    start-btn
    view(style="margin-top: 100upx")
      title
    view.relative
      img.map(:src="mapUrl" mode="scaleToFill" style="height: 750upx;z-index: -1;")
      img.absolute.point-img(:src="item.src" :class="[item.slug]" @click="goDetail(item, index)"  mode="widthFix" v-for="(item,index) in park.points" :index="index" :style="[{'left': item.x, 'top': item.y}]")
    button.cu-btn.round.fixed.flex.justify-center.response.no-bg.h-unset(style="bottom:-10upx;left:0" @click="changeMap")
      img.bottom-btn.animation-slide-bottom(:src="btnUrl" mode="widthFix")
    view.desc {{park.content}}
    
</template>


<script>
import { api } from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";
export default {
  data() {
    return {
      mapUrl: "/static/test-map.png",
      btnUrl: "/static/change-map-btn.png",
      points: {
        "yxh-1": {
          x: uni.upx2px(53 * 2) + "px",
          y: uni.upx2px(280 * 2) + "px",
          src: "/static/p1.png"
        },
        "yxh-2": {
          x: uni.upx2px(150 * 2) + "px",
          y: uni.upx2px(220 * 2) + "px",
          src: "/static/p2.png"
        },
        "yxh-3": {
          x: uni.upx2px(260 * 2) + "px",
          y: uni.upx2px(185 * 2) + "px",
          src: "/static/p3.png"
        },
        "yxh-4": {
          x: uni.upx2px(280 * 2) + "px",
          y: uni.upx2px(140 * 2) + "px",
          src: "/static/p4.png"
        },
        "yxh-5": {
          x: uni.upx2px(185 * 2) + "px",
          y: uni.upx2px(126 * 2) + "px",
          src: "/static/p5.png"
        },
        "yxh-6": {
          x: uni.upx2px(103 * 2) + "px",
          y: uni.upx2px(170 * 2) + "px",
          src: "/static/p6.png"
        }
      }
    };
  },
  onLoad() {
    this.getParkData();
  },
  computed: {
    park: sync("park/currentPark")
  },
  methods: {
    changeMap() {
      uni.showModal({
        title: "更多地图即将开放",
        showCancel: false,
        icon: "none"
      });
    },
    async getParkData() {
      let { data } = await api.getPark();
      data.points = data.points.map(i => ({
        ...i,
        ...this.points[i.slug]
      }));
      this.park = data;
    },
    goDetail({ id }, index) {
      uni.navigateTo({
        url: `/pages/park/detail?index=${index}`
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
  .yxh-1
    width 333 * 0.66666upx
    height 70 * 0.66666upx
  .yxh-6
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