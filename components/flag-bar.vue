<template lang="pug">
  view.response.flex.justify-between(style="height:100upx;width:90vw;margin:0 auto")
    img.flag(:src="flagLeftUrl" mode="widthFix")
    img.flag(:src="flagRightUrl" mode="widthFix")
</template>

<script>
export default {
  data() {
    return {
      flagLeftUrl: "/static/flag-l.png",
      flagRightUrl: "/static/flag-r.png"
    };
  }
};
</script>

<style lang="stylus" scoped>
.flag
  width 90upx
  height 112upx
</style>