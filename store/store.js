import { make } from "vuex-pathify";

const state = {
  currentStore: {
    id: uni.getStorageSync("storeId"),
    name: "",
    distance: 0,
    phone: null
  },
  nearStores: [
    { name: "测试3", adderss: "测试1", distance: "1" },
    { name: "测试2", adderss: "测试2", distance: "2" },
    { name: "测试3", adderss: "测试3", distance: "3" }
  ]
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations
};
