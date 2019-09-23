<template lang="pug">
  view.page.ranking
    view.flex.flex-direction.align-center
      view.flex.align-end(style="width:90vw")
        view.slot-1 排名
        view.slot-2 姓名
        view.slot-3 用时
        view.slot-4 答对数
      view.flex.align-center.ranking-item(style="width:90vw;padding-top: 8upx;padding-bottom: 8upx;background: #aed9f6")
        view.slot-1.text-xl 44444
        view.slot-2 王某某
        view.slot-3 44:44:44
        view.slot-4.text-xl 4
      view.margin-top
        view.flex.align-center.ranking-item(style="width:90vw;padding-top: 8upx;padding-bottom: 8upx" v-for="item in items" :key="item.rank")
          view.slot-1.text-xl {{item.rank}}
          view.slot-2 {{item.name}}
          view.slot-3 {{item.spend}}
          view.slot-4.text-xl {{item.count}}

</template>

<script>
export default {
  data() {
    return {
      items: [
        { name: "王某某", rank: "1", spend: "44:44:44", count: 4 },
        { name: "王某某", rank: "2", spend: "44:44:44", count: 4 },
        { name: "王某某", rank: "3", spend: "44:44:44", count: 4 },
        { name: "王某某", rank: "4", spend: "44:44:44", count: 4 },
        { name: "王某某", rank: "5", spend: "44:44:44", count: 4 },
        { name: "王某某", rank: "6", spend: "44:44:44", count: 4 }
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
    border 4upx solid #3da9e1
    border-radius 40upx
  .slot-1
    width 150upx
  .slot-2
    width 100upx
  .slot-3
    width 250upx
  .slot-4
    width 150upx
</style>