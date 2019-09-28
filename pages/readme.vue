<template lang="pug">
  view.page
    flag-bar
    bg
    start-btn
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
        "党建公园一共设置6个点标，选手可以点击“主题公园”，点击地图上的图标查看具体位置。",
        "小程序提示授权位置信息，选手须同意，否则无法参与答题。",
        "选手须到达点标现场，小程序识别定位后出现“开始答题”按钮，选手点击参与答题。选手也可扫描现场二维码重新打开小程序。",
        "每个点标每个选手只有一次答题机会；各个点标答对题目越多的，总分榜排名越靠前；答对题目相同的，各点标累计用时少的排名靠前。"
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.title
  width 60vw
  height 110upx
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