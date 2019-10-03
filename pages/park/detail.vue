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
    //- view.fixed.flex.justify-center.response(style="bottom:-10upx;left:0")
    //-   img(:src="btnUrl" mode="widthFix" style="width: 300upx;")
</template>


<script>
import { get } from "vuex-pathify";
import { setPointLocation } from "../../common/vmeitime-http";
export default {
  data() {
    return {
      mapUrl: "/static/test-detail.jpg",
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
    let { index } = data;
    index = Number(index);
    this.point = this.park.points[index];
  },
  methods: {
    setPointLocation() {
      setPointLocation({ pointId: this.point.id });
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
    text-indent 20px
    margin-top 50upx
    margin-bottom 100upx
</style>