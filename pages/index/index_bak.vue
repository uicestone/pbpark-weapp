<template lang="pug">
  view
    login(@success="wechatGetUserInfoSuccess" @fail="wechatGetUserInfoFail")
    view.page
      view.flex.justify-between.padding.align-center(@click="selectStore")
        view.flex.align-center
          view.cuIcon-locationfill.margin-right-xs
          view.text-lg.text-blod {{currentStore.name}}
          view.text-sm.text-grey.margin-left-xs(v-if="currentStore.distance") 距离您{{currentStore.distance}} km
        //- view
        //-   text 切换门店
        //-   text.icon-right
      swiper.screen-swiper(:circular='true' :autoplay='true' interval='5000' duration='500')
        swiper-item.radius(v-for='(item,index) in bannerImageUrls' :key='index')
          img(:src='item.url' mode='aspectFill')
      booking-card(v-for="(booking, index) in currBookings" :key="index" :booking="booking")
      view.cu-list.menu.card-menu.margin-top.shadow
        view.cu-item.shadow.booking-button(@click="navigateTo('/pages/booking/index')")
          img.absolute(:src="buttonBgUrl"  mode='aspectFit')
          view.cu-avatar.round.lg.booking-icon.cuIcon-game.text-purple
          view.content.margin-sm
            view.text-md.margin-top-xs 立即签到体验
            view.text-gray.text-sm 你需要支付10元/双的蹦床袜费用
          view.action
            text.icon-right.text-grey
            
      view.cu-list.grid.col-2.card-menu
        view.cu-item(
          v-for="(item,index) in menus1",
          @click="navigateTo(item.to)",
          :key='index', 
          :class="[index != 0 ? 'solid-left': '']")
          view.text-xl(:class="['cuIcon-' + item.icon,'text-' + item.color]", style="font-size: 50upx")
          view.margin-xs.text-lg {{item.title}}
      img.logo.margin-bottom(:src="logo" mode="aspectFit" style="margin-top:100upx")
      
</template>


<script>
import { sync } from "vuex-pathify";
import { wechatLogin, wechatGetUserInfo } from "../../services";
import login from "../login";
import { getStores, getConfigs, getBookings } from "../../common/vmeitime-http";
export default {
  components: {
    login
  },
  data() {
    return {
      logo: "/static/logo.png",
      buttonBgUrl: "/static/button_bg_1.png",
      menus1: [
        {
          icon: "profile",
          color: "yellow",
          title: "个人资料",
          to: "/pages/user/detail"
        },
        {
          icon: "ticket",
          color: "red",
          title: "优惠券",
          to: "/pages/coupons/index"
        },
        {
          icon: "form",
          color: "purple",
          title: "所有预约",
          to: "/pages/booking/list"
        },
        {
          icon: "vipcard",
          color: "orange",
          title: "会员卡",
          to: "/pages/membership/index"
        }
      ],
      bannerImageUrls: [
        {
          url: "https://cdn.uice.lu/kanga/banner1.jpg"
        },
        {
          url: "https://cdn.uice.lu/kanga/banner2.jpg"
        },
        {
          url: "https://cdn.uice.lu/kanga/banner3.jpg"
        },
        {
          url: "https://cdn.uice.lu/kanga/banner4.jpg"
        },
        {
          url: "https://cdn.uice.lu/kanga/banner5.jpg"
        }
      ]
    };
  },
  computed: {
    session_key: sync("auth/session_key"),
    currentStore: sync("store/currentStore"),
    nearStores: sync("store/nearStores"),
    auth: sync("auth"),
    configs: sync("configs"),
    bookings: sync("booking/bookings"),
    currBookings() {
      return this.bookings.filter(i => i.status == "PENDING" || i.status == "BOOKED");
    }
  },
  async onLoad() {
    this.loadInitData();
    await this.checkLogin();
    await this.checkLocation();
    await this.getBookings();
  },
  async onShow() {
    if (!this.session_key) return;
    await this.getBookings();
  },
  methods: {
    async loadInitData() {
      const res = await getConfigs();
      this.configs = res.data;
    },
    async checkLogin() {
      try {
        const user = await wechatLogin();
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    },
    async wechatGetUserInfo(force = false) {
      if (this.auth.user.name) return;
      this.auth.showLogin = force ? "FORCE" : true;
      return new Promise((resolve, reject) => {
        this.wechatGetUserInfoSuccess = resolve;
        this.wechatGetUserInfoFail = reject;
      });
    },
    async checkLocation() {
      console.log("checkLocation");
      const stores = await getStores();
      this.nearStores = stores.data;
      this.currentStore = stores.data[0];
      // uni.getLocation({
      //   success: async res => {
      //     const { latitude, longitude } = res;
      //     const stores = await getStores();
      //     this.nearStores = stores.data;
      //     this.currentStore = stores.data[0];
      //   },
      //   fail: async err => {
      //     uni.navigateTo({
      //       url: "/pages/store/list"
      //     });
      //     uni.showModal({
      //       title: "获取位置失败, 手动选择您最近的门店",
      //       showCancel: false,
      //       icon: "none"
      //     });
      //   }
      // });
    },
    async getBookings() {
      const res = await getBookings();
      this.bookings = res.data;
    },
    selectStore() {
      return;
      uni.navigateTo({
        url: "/pages/store/list"
      });
    },
    async navigateTo(url) {
      try {
        await this.wechatGetUserInfo(url === "/pages/booking/index");
      } catch (err) {
        console.error("用户拒绝授权用户信息");
      }
      uni.navigateTo({
        url
      });
    }
  }
};
</script>

<style lang="stylus">
.page
  height 100vh
  widows 100vw
.banner
  background-size cover
  height 380upx
  z-index -1
.booking-icon
  background none
  img
    height 100%
    width 100%
    object-fit contain
    display block
.booking-button
  img
    right 0
    width 50%
</style>
