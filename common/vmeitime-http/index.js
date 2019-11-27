import http from "./interface";
import { _ } from "../../utils";
import store from "../../store";

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = data => {
  /* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
  //设置请求结束后拦截器

  return http.request({
    baseUrl: "https://ls-coupon.codeispoetry.tech/wp-json/v1",
    url: "ajax/echo/text?name=uni-app",
    dataType: "text",
    data
  });
};

http.interceptor.request = config => {
  const openid = _.get(store, "state.auth.openid");
  if (openid) {
    config.header = {
      openid
    };
  }

  return config;
};

http.interceptor.response = response => {
  // console.log("response:", response);
  //判断返回状态 执行相应操作
  if (!response.statusCode || response.statusCode !== 200) {
    uni.showToast({
      icon: "none",
      title: _.get(response, "data.message") || response.errMsg
    });
  }
  return response;
};

const wechatLogin = ({ code }) => {
  return http.request({
    url: `/wx/auth/code-to-session?code=${code}`,
    method: "GET"
  });
};

const updateLocation = ({ data, mockNearPoint = false }) => {
  let url = `/pbpark/location`;
  if (mockNearPoint) {
    url += "?mockNearPoint=true";
  }
  return http.request({
    method: "POST",
    url,
    dataType: "json",
    data
  });
};

const getPark = ({ name = "yxh" } = {}) => {
  return http.request({
    method: "Get",
    url: `/pbpark/park/${name}`,
    dataType: "json"
  });
};

const getPointWithQuestions = ({ slug } = {}) => {
  return http.request({
    method: "Get",
    url: `/pbpark/point/${slug}?withQuestions=true`,
    dataType: "json"
  });
};

const getRanking = ({ name = "yxh" } = {}) => {
  return http.request({
    method: "Get",
    url: `/pbpark/ranking/${name}`,
    dataType: "json"
  });
};

const updateUser = ({ nickName, province, avatarUrl, gender } = {}) => {
  return http.request({
    method: "Post",
    url: `/wx/auth/user-info`,
    dataType: "json",
    data: {
      nickName,
      province,
      avatarUrl,
      gender
    }
  });
};

const createQuizResult = ({ duration, correct, point, park } = {}) => {
  return http.request({
    method: "Post",
    url: `/pbpark/quiz-result`,
    dataType: "json",
    data: {
      duration,
      correct,
      point,
      park
    }
  });
};

const setPointLocation = ({ pointId } = {}) => {
  const { latitude, longitude } = store.state.auth.location;
  return http.request({
    method: "Put",
    url: `/pbpark/point/${pointId}`,
    dataType: "json",
    data: {
      latitude,
      longitude
    }
  });
};

export const api = {
  updateLocation,
  getPark,
  wechatLogin,
  updateUser,
  createQuizResult,
  getRanking,
  getPointWithQuestions,
  setPointLocation
};
