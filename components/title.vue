<template lang="pug">
  view
    .flex.justify-center
      img(:src="titleUrl" mode="widthFix")
    view.bar.w-full
</template>

<script>
export default {
  data() {
    return {
      titleUrl: "/static/title.jpg"
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