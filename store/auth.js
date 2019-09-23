import { make } from "vuex-pathify";
import config from "../config";

const state = {
  showLogin: false,
  token: uni.getStorageSync("token") || "",
  session_key: "",
  user: {
    name: "",
    avatarUrl: "",
    openid: "",
    customer: null
  }
};

const mutations = make.mutations(state);

const getters = {
  avatar: state => config.parseFile(state.user.avatarUrl)
};

export default {
  namespaced: true,
  getters,
  state,
  mutations
};
