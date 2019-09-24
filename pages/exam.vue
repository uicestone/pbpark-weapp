<template lang="pug">
  view.page.exam
    bg
    view.flex.flex-direction.align-center.finish(v-if="isfinished")
      view.margin-tb-xs 此次答题
      view.margin-tb-xs 共答对{{result}}题
      view.margin-tb-xs 用时{{duration}}
      navigator(url="/pages/ranking").w-full.margin-top-lg
        button.w-full.cu-btn.round 查看排名
      navigator(url="/pages/index/index" redirect).w-full.margin-top-sm
        button.w-full.cu-btn.round 确定
    view.flex.flex-direction.align-center(v-else style="width:80vw;margin:0 auto;margin-top: 200upx")
      view.title 第{{questionNum|encodeS}}题
      view.content {{curQuestion.content}}
      view.select(style="align-self:flex-start;margin-top: 20upx")
        radio-group
          label.flex.align-center.padding-tb-xs(v-for="(item, index) in curQuestion.options" :key="index" @click="selectAnswer(index)")
            radio(:checked="curQuestion.selectAnswer == index")
            view.margin-left {{item}}
      view.fixed.flex.justify-center.response(@click="nextQuestion" style="bottom:-10upx;left:0")
        img(:src="btnUrl" mode="widthFix" style="width: 300upx;")
</template>

<script>
import { _ } from "../utils";
import { moment } from "../utils/moment";

export default {
  data() {
    return {
      btnUrl: "/static/next-btn.png",
      questionNum: 1,
      startTime: moment(),
      duration: null,
      isfinished: false,
      result: 0,
      questions: [
        {
          content: "1919年，《新青年》杂志发表《我的马克思主义观》一文,系统的介绍了马克思主义的唯物史观、政治经济学和科学社会主义的基本原理。这篇文章的作者是 。",
          options: ["陈独秀", "李大钊", "李达"],
          rightAnswer: 0
        },
        {
          content: "test2",
          options: ["1", "2", "3"],
          rightAnswer: 0
        }
      ]
    };
  },
  computed: {
    curQuestion() {
      return this.questions[this.questionNum - 1];
    }
  },
  methods: {
    selectAnswer(index) {
      this.$set(this.curQuestion, `selectAnswer`, index);
    },
    nextQuestion() {
      if (this.questionNum == this.questions.length) {
        this.finish();
      } else {
        this.questionNum += 1;
      }
    },
    finish() {
      this.duration = moment.duration(moment().diff(this.startTime)).format("hh:mm:ss", { trim: false });
      this.result = _.countBy(this.questions, i => i.rightAnswer == i.selectAnswer).true || 0;
      this.isfinished = true;
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