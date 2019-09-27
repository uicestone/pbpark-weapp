<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style lang="stylus">
@import 'common/colorui/main.css'
@import 'common/colorui/icon.css'
@import 'common/colorui/animation.css'
.page
  height 100vh
  widows 100vw
.logo
  width 100%
  height 100upx
  text-align center
  object-fit contain
.bg
  position fixed
  top 0
  left 0
  z-index -100
.bg-bottom
  position fixed
  bottom 0
  left 0
  z-index -100
.bg-red
  background-color #d32c25
.text-red
  color #d32c25
.bg-orange
  background-color #e08631
.text-orange
  color #e08631
.absolute
  position absolute
.relative
  position relative
.fixed
  position fixed
.w-full
  width 100%
.h-full
  width 100%
.w-screen
  width 100vw
.h-screen
  height 100vh
</style>
