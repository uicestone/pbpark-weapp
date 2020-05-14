<template lang="pug">
  view.page.exam
    bg
    view(style="margin-top: 100upx")
      title
    view.flex.flex-direction.align-center.finish(v-if="isfinished")
      view.margin-tb-xs 此次答题
      view.margin-tb-xs 共答对{{correct}}题
      view.margin-tb-xs 用时{{duration | duration}}
      navigator(url="/pages/ranking").w-full.margin-top-lg
        button.w-full.cu-btn.round 查看排名
      navigator(url="/pages/index/index" redirect).w-full.margin-top-sm
        button.w-full.cu-btn.round 确定
      button.w-full.cu-btn.round.margin-top-sm(v-if="user.roles.includes('administrator')" @click="reExam") 重新答题
    view.flex.flex-direction.align-center(v-else style="width:80vw;margin:0 auto;margin-top: 200upx;margin-bottom: 100upx")
      view.title 第{{questionNum|encodeS}}题
      view.content {{curQuestion.title}}
      view.select(style="align-self:flex-start;margin-top: 20upx")
        radio-group
          label.flex.align-center.padding-tb-xs(v-for="(item, index) in curQuestion.options" :key="index" @click="selectAnswer(index)")
            radio-group(v-if="answerChecked")
              radio.red.wrong(v-if="curQuestion.trueOption!=index&&curQuestion.selectAnswer==index" :checked="true")
              radio(v-else-if="curQuestion.trueOption==index" :checked="true")
              radio(v-else)
            radio.radio(v-else :checked="curQuestion.selectAnswer==index")
            img.margin-left(v-if="curQuestion.optionsAreImages" :src="item" mode="aspectFit" style="width: 480upx; height: 360upx")
            view.margin-left(v-else) {{item}}
      button.cu-btn.no-bg.h-unset.fixed.flex.justify-center.response(v-if="!answerChecked" @click="checkAnswer" style="bottom:-10upx;left:0" :class="[curQuestion.selectAnswer === undefined ? 'disabled':'']")
        img.bottom-btn(:src="checkBtnUrl" mode="widthFix")
      button.cu-btn.no-bg.h-unset.fixed.flex.justify-center.response(v-else @click="nextQuestion" style="bottom:-10upx;left:0" :class="[curQuestion.selectAnswer === undefined ? 'disabled':'']")
        img.bottom-btn(:src="btnUrl" mode="widthFix")
</template>

<script>
import { _ } from "../utils";
import { moment } from "../utils/moment";
import { sync, get } from "vuex-pathify";
import { api } from "../common/vmeitime-http";

export default {
  data() {
    return {
      btnUrl: "/static/next-btn.png",
      checkBtnUrl: "/static/check-answer-btn.png",
      questionNum: 1,
      startTime: moment(),
      duration: null,
      isfinished: false,
      correct: 0,
      answerChecked: false
    };
  },
  mounted() {
    this.inExam = true;
    const { duration, correct } = this.point;
    if (duration || correct) {
      this.duration = duration;
      this.correct = correct;
      this.isfinished = true;
    }
  },
  computed: {
    user: get("auth/user"),
    inExam: sync("park/inExam"),
    nearPoint: sync("park/nearPoint"),
    forcePoint: sync("park/forcePoint"),
    currentPark: sync("park/currentPark"),
    point() {
      if (this.forcePoint && this.forcePoint.id) {
        return this.forcePoint;
      }
      return this.nearPoint;
    },
    curQuestion() {
      return this.point.questions[this.questionNum - 1];
    }
  },
  beforeDestroy() {
    this.inExam = false;
  },
  methods: {
    reExam() {
      this.isfinished = false;
    },
    selectAnswer(index) {
      this.$set(this.curQuestion, `selectAnswer`, index);
    },
    checkAnswer() {
      if (this.curQuestion.selectAnswer === undefined) return;
      this.answerChecked = true;
    },
    nextQuestion() {
      if (this.curQuestion.selectAnswer === undefined) return;
      this.answerChecked = false;
      if (this.questionNum == this.point.questions.length) {
        this.finish();
      } else {
        this.questionNum += 1;
      }
    },
    async finish() {
      const duration = moment.duration(moment().diff(this.startTime)).format("hh:mm:ss", { trim: false });
      const seconds = (this.duration = moment.duration(duration, "hh:mm:ss").seconds());
      const correct = (this.correct = _.countBy(this.point.questions, i => i.trueOption == i.selectAnswer).true || 0);
      this.isfinished = true;
      await api.createQuizResult({ duration: seconds, correct, point: this.point.slug, park: this.currentPark.slug });
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
  .disabled img
    opacity 0.5
  radio.wrong::before
    content '\E646'
</style>