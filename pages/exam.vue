<template lang="pug">
  view.page.exam
    bg
    view(style="margin-top: 100upx")
      title
    view.flex.flex-direction.align-center.finish(v-if="isfinished")
      view.margin-tb-xs 此次答题
      view.margin-tb-xs 共答对{{correct}}题
      view.margin-tb-xs 用时{{duration}}
      navigator(url="/pages/ranking").w-full.margin-top-lg
        button.w-full.cu-btn.round 查看排名
      navigator(url="/pages/index/index" redirect).w-full.margin-top-sm
        button.w-full.cu-btn.round 确定
    view.flex.flex-direction.align-center(v-else style="width:80vw;margin:0 auto;margin-top: 200upx")
      view.title 第{{questionNum|encodeS}}题
      view.content {{curQuestion.title}}
      view.select(style="align-self:flex-start;margin-top: 20upx")
        radio-group
          label.flex.align-center.padding-tb-xs(v-for="(item, index) in curQuestion.options" :key="index" @click="selectAnswer(index)")
            radio(:checked="curQuestion.selectAnswer == index")
            img.margin-left(v-if="curQuestion.optionsAreImages" :src="item" mode="aspectFit" style="width: 480upx; height: 360upx")
            view.margin-left(v-else) {{item}}
      view.fixed.flex.justify-center.response(@click="nextQuestion" style="bottom:-10upx;left:0")
        img.bottom-btn(:src="btnUrl" mode="widthFix")
</template>

<script>
import { _ } from "../utils";
import { moment } from "../utils/moment";
import { sync } from "vuex-pathify";
import { api } from "../common/vmeitime-http";

export default {
  data() {
    return {
      btnUrl: "/static/next-btn.png",
      questionNum: 1,
      startTime: moment(),
      duration: null,
      isfinished: false,
      correct: 0
    };
  },
  mounted() {
    this.inExam = true;
  },
  computed: {
    inExam: sync("park/inExam"),
    nearPoint: sync("park/nearPoint"),
    currentPark: sync("park/currentPark"),
    curQuestion() {
      return this.nearPoint.questions[this.questionNum - 1];
    }
  },
  beforeDestroy() {
    this.inExam = false;
  },
  methods: {
    selectAnswer(index) {
      this.$set(this.curQuestion, `selectAnswer`, index);
    },
    nextQuestion() {
      if (this.questionNum == this.nearPoint.questions.length) {
        this.finish();
      } else {
        this.questionNum += 1;
      }
    },
    async finish() {
      const duration = (this.duration = moment.duration(moment().diff(this.startTime)).format("hh:mm:ss", { trim: false }));
      const seconds = moment.duration(duration, "hh:mm:ss").seconds();
      const correct = (this.correct = _.countBy(this.nearPoint.questions, i => i.trueOption == i.selectAnswer).true || 0);
      this.isfinished = true;
      await api.createQuizResult({ duration: seconds, correct, point: this.nearPoint.slug, park: this.currentPark.slug });
    }
  }
};
</script>


<style lang="stylus">
.exam
  .finish
    color white
    padding 40upx
    border-radius 20upx
    background #3b7bbb
    margin 0 auto
    margin-top 300upx
    width 450upx
    font-size 40rpx
    font-weight bold
    button
      font-weight 400
  .title
    color white
    background #0d6bb8
    width 100%
    border-radius 50px
    text-align center
    font-size 20px
    border 2px solid white
    padding 2px
    font-weight bold
  .content
    font-weight bold
    margin-top 50upx
    color #5d5c5c
    font-size 32upx
    line-height 1.6
  .select
    font-weight bold
    color #5d5c5c
    font-size 32upx
</style>