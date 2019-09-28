<template lang="pug">
  view.page.ranking
    flag-bar
    bg
    start-btn
    view.response.flex.fixed.justify-between(style="height:100upx;justify-content:center;top:0")
      img(:src="titleUrl" mode="aspectFit" style="width:87.5%;height:320upx")
    view.flex.flex-direction.align-center(style="margin-top:200upx")
      view.flex.align-end(style="width:90vw")
        view.slot-1 排名
        view.slot-2 姓名
        view.slot-3 用时
        view.slot-4 答对数
      view.flex.align-center.ranking-item(style="width:90vw;padding-top: 6upx;padding-bottom: 6upx;background: #aed9f6")
        view.slot-1.text-xl 1949
        view.slot-2 某某某
        view.slot-3 00:10:01
        view.slot-4.text-xl 4
      view.margin-top
        view.flex.align-center.ranking-item(style="width:90vw;padding-top: 6upx;padding-bottom: 6upx;margin-bottom: 4upx" v-for="item in items" :key="item.rank")
          view.slot-1.text-xl.flex.items-center.justify-center
            text(v-if="item.rank >3") {{item.rank}}
            img(v-else :src="'/static/rank-'+item.rank+'.png'" mode="widthFix" style="width: 65upx")
          view.slot-2 {{item.name}}
          view.slot-3 {{item.spend}}
          view.slot-4.text-xl {{item.count}}

</template>

<script>
export default {
  data() {
    return {
      titleUrl: "/static/ranking-title.png",
      button1Url: "/static/next-btn.png",
      items: [
        { name: "朱某某", rank: "1", spend: "00:10:01", count: 10 },
        { name: "彭某某", rank: "2", spend: "00:10:01", count: 10 },
        { name: "林某某", rank: "3", spend: "00:10:01", count: 0 },
        { name: "刘某某", rank: "4", spend: "00:10:01", count: 10 },
        { name: "贺某某", rank: "5", spend: "00:10:01", count: 10 },
        { name: "陈某某", rank: "6", spend: "00:10:01", count: 10 },
        { name: "罗某某", rank: "7", spend: "00:10:01", count: 10 },
        { name: "徐某某", rank: "8", spend: "00:10:01", count: 10 },
        { name: "聂某某", rank: "9", spend: "00:10:01", count: 10 },
        { name: "叶某某", rank: "10", spend: "00:10:01", count: 10 }
      ]
    };
  }
};
</script>

<style lang="stylus">
.ranking
  view
    text-align center
  .ranking-item
    background white
    border 4upx solid #3da9e1
    border-radius 40upx
    height 66upx
  .slot-1
    width 150upx
  .slot-2
    width 100upx
  .slot-3
    width 250upx
  .slot-4
    width 150upx
</style>