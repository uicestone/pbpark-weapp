<script>
import { api } from "./common/vmeitime-http/";
import { get } from "vuex-pathify";
import store from "./store";
export default {
  computed: {
    inExam: get("park/inExam"),
    user: get("auth/user")
  },
  onLaunch: function() {
    console.log("App Launch");
    try {
      this.updateLocation();
    } catch (e) {
      this.checkPermission();
    }
    setInterval(() => {
      if (this.inExam) return;
      this.updateLocation();
    }, 5000);
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    async updateLocation() {
      if (!this.user.id) return; // prevent call before get openid
      const location = await new Promise((resolve, reject) => {
        uni.getLocation({
          altitude: true,
          success: async data => {
            resolve(data);
          },
          fail: err => {
            reject(err);
          }
        });
      });

      const {
        data: { nearPoint }
      } = await api.updateLocation({ data: location });

      store.state.auth.location = location;
      store.state.park.nearPoint = nearPoint;

      if (this.user.roles.includes("administrator")) {
        const { latitude, longitude } = location;
        uni.showToast({
          icon: "none",
          title: `${latitude.toFixed(6)},${longitude.toFixed(6)}`,
          duration: 2500
        });
      }
    },
    checkPermission() {
      wx.getSetting({
        success: res => {
          if (!res.authSetting["scope.userLocation"])
            wx.showModal({
              content: "您没打开定位权限，将无法参与答题，是否去设置打开？",
              confirmText: "确认",
              cancelText: "取消",
              success: function(res) {
                if (res.confirm) {
                  return wx.openSetting({
                    success: res => {}
                  });
                }
                return;
              }
            });
        }
      });
    }
  }
};
</script>

<style lang="stylus">
@import 'common/colorui/main.css'
@import 'common/colorui/icon.css'
@import 'common/colorui/animation.css'

image, img
  will-change transform
.page
  height 100vh
  widows 100vw
.logo
  width 100%
  height 100upx
  text-align center
  object-fit contain
.no-bg
  background-color transparent !important
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
.bottom-btn
  width 260upx
  height 132upx
.h-unset
  height unset
.tr-180
  transform rotate(180deg)
</style>
