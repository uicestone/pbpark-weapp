<template lang="pug">
  view.page.park
    bg
    start-btn(v-if="nearPoint.id == point.id || point.questions" :point="point")
    button.set-location.fixed(v-if="user.roles.includes('administrator')" style="right:10px;bottom:10px" @click="setPointLocation") 设置位置
    view(style="margin-top: 100upx")
      title
    view
      img.response(:src="point.thumbnail_url" mode="aspectFill" style="height: 750upx")
    view.desc
      rich-text(:nodes="pointContent")
    view(style="height: 120upx" v-if="nearPoint.id == point.id || point.questions")
    //- view.fixed.flex.justify-center.response(style="bottom:-10upx;left:0")
    //-   img(:src="btnUrl" mode="widthFix" style="width: 300upx;")
</template>

<script>
import { get, sync } from "vuex-pathify";
import { api } from "../../common/vmeitime-http";
export default {
  data() {
    return {
      btnUrl: "/static/change-map-btn.png",
      point: {
        slug: null,
        id: null,
        thumbnail_url: null,
        content: null
      }
    };
  },
  computed: {
    nearPoint: get("park/nearPoint"),
    park: get("park/currentPark"),
    user: get("auth/user"),
    pointContent() {
      let content = this.point.content;
      content = content.replace(/<p/g, '<p style="margin-bottom:0.5em;text-indent:2em"');
      return content;
    }
  },
  onLoad(data) {
    let { slug, forceStart = false } = data;
    this.point = this.park.points.find(i => i.slug == slug);
    uni.setNavigationBarTitle({ title: this.point.name + " 答题点" });
    if (forceStart) {
      this.getPointWithQuestions();
    }
  },
  methods: {
    setPointLocation() {
      api.setPointLocation({ pointId: this.point.id });
    },
    async getPointWithQuestions() {
      this.point = (await api.getPointWithQuestions({ slug: this.point.slug })).data;
      console.log("point with questions:", this.point);
    }
  }
};
</script>

<style lang="stylus">
.park
  .desc
    color #595757
    font-weight bold
    font-size 28upx
    line-height 1.5
    width 85vw
    margin 50upx auto 20upx
</style>
