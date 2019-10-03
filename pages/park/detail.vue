<template lang="pug">
  view.page.park
    bg
    start-btn(v-if="nearPoint.id == point.id")
    view(style="margin-top: 100upx")
      title
    navigator(url="/pages/exam")
      img.response(:src="point.thumbnail_url" mode="aspectFill" style="height: 750upx")
    view.desc {{point.content}}
    //- view.fixed.flex.justify-center.response(style="bottom:-10upx;left:0")
    //-   img(:src="btnUrl" mode="widthFix" style="width: 300upx;")
</template>


<script>
import { sync } from "vuex-pathify";
export default {
  data() {
    return {
      mapUrl: "/static/test-detail.jpg",
      btnUrl: "/static/change-map-btn.png",
      desc:
        "远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字",
      point: {
        slug: null,
        id: null,
        thumbnail_url: null,
        contetn: null
      }
    };
  },
  computed: {
    nearPoint: sync("park/nearPoint"),
    park: sync("park/currentPark")
  },
  onLoad(data) {
    let { index } = data;
    index = Number(index);
    this.point = this.park.points[index];
  }
};
</script>

<style lang="stylus">
.park
  .desc
    white-space pre-wrap
    color #595757
    font-weight bold
    font-size 12px
    line-height 2
    width 90vw
    margin 0 auto
    text-indent 20px
    margin-top 50upx
    margin-bottom 100upx
</style>