import Vue from "vue";
import Vuex from "vuex";
import pathify, { make } from "vuex-pathify";

import auth from "./auth";
import park from "./park";

Vue.use(Vuex);

pathify.options.mapping = "simple";

const state = {
  loading: false
};

const mutations = make.mutations(state);

const store = new Vuex.Store({
  plugins: [pathify.plugin],
  state,
  mutations,
  modules: { auth, park }
});

Vue.prototype.$store = store;

export default store;
