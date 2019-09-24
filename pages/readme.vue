<template lang="pug">
  view.page
    flag-bar
    bg
    view
      view.flex.justify-center
        img.title(:src="titleImgUrl" mode="widthFix")
      view(style="width: 90vw;margin: 0 auto;margin-top: 50upx")
        view.content-item.flex(v-for="(item,index) in contents" :key="index")
          img.dot(:src="dotImgUrl" mode="scaleToFill")
          text.text {{item}}
</template>

<script>
export default {
  data() {
    return {
      titleImgUrl: "/static/rules-title.png",
      dotImgUrl: "/static/rules-dot.png",
      contents: [
        "党建公园一共设置6个点标，选手可以点击“主 题公园”点击地图上的图标查看具体位置。",
        "选手须到达点标现场，利用手机微信扫一扫， 扫描点标上的二维码进入答题。(选手必须到 达现场扫描才可进入答题，在其他地方扫描该 二维码无效。)",
        "总成绩排名的组成由各个点标答题的答对数的 总合和答题用时总合所组成(答对数相同情况 下，以用时最少者为胜)。选手在各个点标答 题时只有一次机会完成答题任务，中途退出， 成绩以退出之前完成的答对数和用时为准。",
        "选手可以自由选择扫描点标二维码完成任务 (点标不分前后顺序)，可一次性完成所有点 标答题，也可分别完成。"
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.title
  width 60vw
.content-item
  margin-bottom 50upx
  .dot
    margin-top 5upx
    width 35upx
    height 35upx
  .text
    color #595757
    font-size 16px
    font-weight bold
    margin-left 15upx
    width 650upx
    line-height 1.5
</style>