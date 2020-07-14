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
      view.flex.align-center.ranking-item.margin-bottom.animation-slide-bottom(v-if="myRanking" style="width:90vw;padding-top: 6upx;padding-bottom: 6upx;background: #aed9f6")
        view.slot-1.text-xl {{myRanking.ranking}}
        view.slot-2 {{myRanking.name}}
        view.slot-3 {{myRanking.duration | duration}}
        view.slot-4.text-xl {{myRanking.correct}}
      view
        view.flex.align-center.ranking-item.animation-slide-bottom(style="width:90vw;padding-top: 6upx;padding-bottom: 6upx;margin-bottom: 4upx" v-for="(item, index) in tops" :key="index")
          view.slot-1.text-xl.flex.items-center.justify-center
            text(v-if="item.ranking > 3") {{item.ranking}}
            img(v-else :src="'/static/rank-'+item.ranking+'.png'" mode="widthFix" style="width: 65upx; height: 50upx")
          view.slot-2 {{item.name}}
          view.slot-3 {{item.duration | duration}}
          view.slot-4.text-xl {{item.correct}}
        view.flex.justify-center.margin-top
          button.cu-btn.round.response.no-bg.h-unset.tr-180(style="width:120upx" @click="prevPage" v-if="!isStartPage")
            img.arrow-button.animation-slide-bottom(src="/static/arrow.jpg" mode="widthFix")
          button.cu-btn.round.response.no-bg.h-unset(style="width:120upx" @click="nextPage" v-if="!isEndPage")
            img.arrow-button.animation-slide-bottom(src="/static/arrow.jpg" mode="widthFix")

</template>

<script>
import { api } from "../common/vmeitime-http";
import { sync } from "vuex-pathify";
export default {
  data() {
    return {
      pageNum: 0,
      pageSize: 13,
      titleUrl: "/static/ranking-title.png",
      button1Url: "/static/next-btn.png"
    };
  },
  computed: {
    ranking: sync("park/ranking"),
    myRanking() {
      return this.ranking.myRanking;
    },
    tops() {
      const { pageNum, pageSize } = this;
      const start = pageNum * pageSize;
      const end = start + pageSize;
      return this.ranking.tops
        .map((v, i) => {
          v.ranking = i + 1;
          return v;
        })
        .slice(start, end);
    },
    isStartPage() {
      return this.pageNum === 0;
    },
    isEndPage() {
      const { pageNum, pageSize } = this;
      const end = pageNum * pageSize + pageSize;
      return end >= this.ranking.tops.length;
    }
  },
  onLoad() {
    this.getRankingData();
  },
  methods: {
    nextPage() {
      if (this.isEndPage) {
        if (this.pageNum == 0) return;
        this.pageNum = 0;
      } else {
        this.pageNum++;
      }
    },
    prevPage() {
      if (this.pageNum == 0) return;
      this.pageNum--;
    },
    async getRankingData() {
      const { data: ranking } = await api.getRanking();
      this.ranking = ranking;
    }
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
    animation-delay 0.3s
  .slot-1
    width 135upx
    white-space pre
    word-wrap nowrap
    overflow hidden
    text-overflow ellipsis
  .slot-2
    width 280upx
  .slot-3
    width 135upx
  .slot-4
    width 100upx
  .arrow-button
    width 47upx
</style>