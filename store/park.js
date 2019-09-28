import { make } from "vuex-pathify";

const state = {
  inExam: false,
  nearPoint: {
    content: null,
    id: null,
    questions: [],
    slug: "",
    thumbnail_url: null
  },
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
