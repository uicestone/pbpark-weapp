import { make } from "vuex-pathify";
import config from "../config";

const state = {
  showLogin: false,
  token: uni.getStorageSync("token") || "",
  session_key: "",
  openid: null,
  user: {
    id: null,
    name: null,
    avatarUrl: null,
    gender: null,
    region: null,
    roles: []
  },
  location: {}
};

const mutations = make.mutations(state);

const getters = {
  isLogin: state => state.user.name && state.user.name !== "游客"
};

export default {
  namespaced: true,
  getters,
  state,
  mutations
};
