<template lang="pug">
  view.page.park
    bg
    view(style="margin-top: 100upx")
      title
    navigator(url="/pages/exam")
      img.response(:src="mapUrl" mode="aspectFill" style="height: 750upx")
    view.desc {{desc}}
    //- view.fixed.flex.justify-center.response(style="bottom:-10upx;left:0")
    //-   img(:src="btnUrl" mode="widthFix" style="width: 300upx;")
</template>


<script>
export default {
  data() {
    return {
      mapUrl: "/static/test-map.png",
      btnUrl: "/static/change-map-btn.png",
      desc:
        "远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字远香湖党建主题公园介绍文字"
    };
  }
};
</script>

<style lang="stylus">
.park
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