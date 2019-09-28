import { make } from "vuex-pathify";
import config from "../config";

const state = {
  showLogin: false,
  token: uni.getStorageSync("token") || "",
  session_key: "",
  user: {
    name: null,
    avatarUrl: "",
    openid: "",
    customer: null
  }
};

const mutations = make.mutations(state);

const getters = {
  avatar: state => config.parseFile(state.user.avatarUrl),
  isLogin: state => state.user.name && state.user.name !== "游客"
};

export default {
  namespaced: true,
  getters,
  state,
  mutations
};
