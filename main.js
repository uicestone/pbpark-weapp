import Vue from "vue";
import App from "./App";
import store from "./store";
import nzhcn from "nzh/cn";
import flagBar from "./components/flag-bar.vue";
import Bg from "./components/bg.vue";
import Title from "./components/title.vue";
import StartBtn from "./components/start-btn.vue";
import moment from "moment";

Vue.config.productionTip = false;

Vue.component("flag-bar", flagBar);
Vue.component("bg", Bg);
Vue.component("title", Title);
Vue.component("start-btn", StartBtn);

App.mpType = "app";
global.store = store; // for debug

Vue.filter("encodeS", v => {
  return nzhcn.encodeS(Number(v));
});

Vue.filter("duration", v => {
  return moment.duration(v, "seconds").format("hh:mm:ss", { trim: false });
});

const app = new Vue({
  store,
  ...App
});
app.$mount();
