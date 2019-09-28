import { make } from "vuex-pathify";

const state = {
  currentPark: {
    id: null,
    points: [],
    content: null,
    address: null,
    slug: "yxh",
    phone: null
  }
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations
};
