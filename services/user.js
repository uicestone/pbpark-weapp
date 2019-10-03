import { api } from "../common/vmeitime-http/index";
import store from "../store";

export const fetchUser = async () => {
  const res = await api.getAuthUser();
  store.state.auth.user = res.data;
  return res.data;
};
