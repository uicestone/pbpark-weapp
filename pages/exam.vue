<template lang="pug">
  view.page.exam
    view.flex.flex-direction.align-center.finish(v-if="isfinished")
      view 此次答题
      view 共答对{{result}}题
      view 用时{{duration}}
      view
        button.cu-btn.round(@click="navigateTo('/pages/ranking')") 查看排名
      view
        button.cu-btn.round(@click="navigateTo('/pages/index/index')") 确定
    view.flex.flex-direction.align-center(v-else style="width:80vw;margin:0 auto;")
      view 第{{questionNum|encodeS}}题
      view {{curQuestion.content}}
      view(style="align-self:flex-start;margin-top: 20upx")
        radio-group
          label.flex.align-center.padding-tb-xs(v-for="(item, index) in curQuestion.options" :key="index" @click="selectAnswer(index)")
            radio(:checked="curQuestion.selectAnswer == index")
            view.margin-left {{item}}
      button.cu-btn.round(@click="nextQuestion") 下一题
</template>

<script>
import { _ } from "../utils";
import { moment } from "../utils/moment";

export default {
  data() {
    return {
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
    },
    async navigateTo(url) {
      uni.navigateTo({
        url
      });
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
    width 400upx
    font-size 36rpx
</style>