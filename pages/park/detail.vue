<template lang="pug">
  view.page.park
    bg
    start-btn(v-if="nearPoint.id == point.id")
    button.set-location.fixed(v-if="user.roles.includes('administrator')" style="right:10px;bottom:10px" @click="setPointLocation") 设置位置
    view(style="margin-top: 100upx")
      title
    navigator(url="/pages/exam")
      img.response(:src="point.thumbnail_url" mode="aspectFill" style="height: 750upx")
    view.desc {{point.content}}
    view(style="height: 120upx" v-if="nearPoint.id == point.id")
    //- view.fixed.flex.justify-center.response(style="bottom:-10upx;left:0")
    //-   img(:src="btnUrl" mode="widthFix" style="width: 300upx;")
</template>


<script>
import { get } from "vuex-pathify";
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
    user: get("auth/user")
  },
  onLoad(data) {
    let { slug } = data;
    this.point = this.park.points.find(i => i.slug == slug);
    console.log(this.point);
    uni.setNavigationBarTitle({ title: this.point.name + " 答题点" });
  },
  methods: {
    setPointLocation() {
      api.setPointLocation({ pointId: this.point.id });
    }
  }
};
</script>

<style lang="stylus">
.park
  .desc
    white-space pre-wrap
    color #595757
    font-weight bold
    font-size 12px
    line-height 2
    width 90vw
    margin 0 auto
    // text-indent 2em
    margin-top 50upx
    margin-bottom 20upx
</style>