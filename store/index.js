import Vue from "vue";
import Vuex from "vuex";
import pathify, { make } from "vuex-pathify";

import auth from "./auth";
import booking from "./booking";
import _store from "./store";

Vue.use(Vuex);

pathify.options.mapping = "simple";

const state = {
  loading: false,
  currentTab: "首页",
  configs: {
    cardTypes: {},
    depositLevels: [],
    hourPrice: null,
    hourPriceRatio: []
  }
};

const mutations = make.mutations(state);

const store = new Vuex.Store({
  plugins: [pathify.plugin],
  state,
  mutations,
  modules: { auth, store: _store, booking }
});

Vue.prototype.$store = store;

export default store;
