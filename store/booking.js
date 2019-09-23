import { make } from "vuex-pathify";

const state = {
  selectDate: new Date(),
  bookings: []
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations
};
