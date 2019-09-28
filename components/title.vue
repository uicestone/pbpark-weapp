<template lang="pug">
  view
    .flex.justify-center
      img(:src="titleUrl" mode="widthFix" style="width: 536upx; height: 68upx")
    view.bar.w-full
</template>

<script>
export default {
  data() {
    return {
      titleUrl: "/static/title.png"
    };
  }
};
</script>

<style lang="stylus" scoped>
.bar
  height 18upx
  background #0d6bb8
  margin-top -10upx
</style>