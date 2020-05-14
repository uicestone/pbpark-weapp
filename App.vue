<script>
import { api } from "./common/vmeitime-http/";
import { get } from "vuex-pathify";
import store from "./store";
import sleep from "./utils/sleep";
export default {
  data: {
    isAndroid: null,
    showModal: {
      locationSwitch: false,
      locationAccuracy: false,
      locationWifiSwitch: false
    }
  },
  computed: {
    inExam: get("park/inExam"),
    user: get("auth/user")
  },
  onLaunch: async function(params) {
    console.log("App Launch", params);
    await this.detectPlatform();
    if (!params.query || !params.query.point) {
      try {
        await this.updateLocation();
      } catch (err) {
        console.error(err);
        this.checkPermission();
      }
      while (true) {
        await sleep(7000);
        if (!this.inExam) {
          try {
            await this.updateLocation();
          } catch (err) {
            console.error(err);
          }
        }
      }
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

      if (this.isAndroid) {
        this.tryWifi(); // detect if wifi switch is on, async
      }

      const location = await new Promise((resolve, reject) => {
        uni.getLocation({
          type: "wgs84",
          isHighAccuracy: true,
          highAccuracyExpireTime: 3000,
          success: async data => {
            resolve(data);
          },
          fail: err => {
            console.error(err);
            uni.showToast({ icon: "none", title: `E${err.errCode}: ${err.errMsg}`, duration: 2000 });
            if (err.errCode === 2 && !this.showModal.locationSwitch) {
              uni.showModal({
                showCancel: false,
                title: "请打开系统位置服务、蓝牙和WiFi",
                content: "请将系统位置服务、蓝牙和WiFi全部打开，否则可能造成定位失败或者定位不准确，无法答题！",
                success: () => (this.showModal.locationSwitch = false)
              });
              this.showModal.locationSwitch = true;
            }
            reject(err);
          }
        });
      });

      if (!this.user.id) return; // prevent call before get openid
      const { latitude, longitude, accuracy } = location;
      console.log("Location:", latitude, longitude, accuracy);

      if (accuracy > 100) {
        console.log("Location is not GPS, dropped.");
        if (!this.showModal.locationAccuracy) {
          uni.showModal({
            showCancel: false,
            title: "您的定位不准确",
            content: "请打开WiFi、蓝牙，打开系统GPS高精确度定位，并前往开阔地带，否则无法答题！",
            success: () => (this.showModal.locationAccuracy = false)
          });
          this.showModal.locationAccuracy = true;
        }
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
      console.log(points.map(p => p.name + " " + (+p.distance).toFixed(1)).join("\n"));
      store.state.auth.location = location;
      store.state.park.nearPoint = nearPoint;
    },
    async tryWifi() {
      return new Promise((resolve, reject) => {
        wx.startWifi({
          success: data => {
            wx.getWifiList({
              success: data => {
                console.log("getWifiList.success:", data);
                resolve();
              },
              fail: err => {
                console.error(err);
                if ([12005].includes(err.errCode) && !this.showModal.locationWifiSwitch) {
                  uni.showModal({
                    showCancel: false,
                    title: "请打开系统WiFi开关",
                    content: "尽管没有WiFi网络，仍需打开WiFi开关，否则将导致定位不准，无法答题！",
                    success: () => (this.showModal.locationWifiSwitch = false)
                  });
                  this.showModal.locationWifiSwitch = true;
                  reject(err);
                }
              }
            });
          }
        });
      });
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
