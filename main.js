import Vue from "vue";
import App from "./App";
import store from "./store";
import nzhcn from "nzh/cn";
import flagBar from "./components/flag-bar.vue";
import Bg from "./components/bg.vue";

Vue.config.productionTip = false;

Vue.component("flag-bar", flagBar);
Vue.component("bg", Bg);

App.mpType = "app";
global.store = store; // for debug

Vue.filter("encodeS", v => {
  return nzhcn.encodeS(Number(v));
});

const app = new Vue({
  store,
  ...App
});
app.$mount();
