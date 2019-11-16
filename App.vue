<script>
import { api } from "./common/vmeitime-http/";
import { get } from "vuex-pathify";
import store from "./store";
import sleep from "./utils/sleep";
export default {
  data: {
    isAndroid: null
  },
  computed: {
    inExam: get("park/inExam"),
    user: get("auth/user")
  },
  onLaunch: async function() {
    console.log("App Launch");
    await this.detectPlatform();
    try {
      await this.updateLocation();
    } catch (err) {
      this.checkPermission();
    }
    while (true) {
      if (!this.inExam) {
        await this.updateLocation();
      }
      await sleep(1000);
    }
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    detectPlatform() {
      return new Promise(resolve => {
        wx.getSystemInfo({
          success: res => {
            if (res.platform == "android") {
              this.isAndroid = true;
            } else {
              this.isAndroid = false;
            }
            resolve();
          }
        });
      });
    },
    async updateLocation() {
      console.log("Getting location...");
      const location = await new Promise((resolve, reject) => {
        uni.getLocation({
          type: "wgs84",
          isHighAccuracy: true,
          highAccuracyExpireTime: 4000,
          success: async data => {
            resolve(data);
          },
          fail: err => {
            reject(err);
          }
        });
      });

      if (!this.user.id) return; // prevent call before get openid
      const { latitude, longitude, accuracy } = location;
      console.log("Location:", latitude, longitude, accuracy);

      if (accuracy > 100) {
        console.log("Location is not GPS, dropped.");
        return;
      }

      if (this.isAndroid) {
        location.latitude += 2e-4;
        location.longitude += 1e-4;
        console.log("Android offset applied.");
      }

      const {
        data: { nearPoint, points }
      } = await api.updateLocation({ data: location });
      console.log(points.map(p => p.name + " " + p.distance.toFixed(1)).join("\n"));
      store.state.auth.location = location;
      store.state.park.nearPoint = nearPoint;
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
