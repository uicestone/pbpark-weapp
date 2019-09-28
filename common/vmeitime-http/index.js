import http from "./interface";
import _ from "lodash";
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
  const openid = _.get(store, "state.auth.user.openid");
  if (openid) {
    config.header = {
      openid
    };
  }

  return config;
};

http.interceptor.response = response => {
  console.log("response:", response);
  //判断返回状态 执行相应操作
  if (!response.statusCode || response.statusCode !== 200) {
    uni.showToast({
      icon: "none",
      title: _.get(response, "data.message") || response.errMsg
    });
  }
  return response;
};

export const wechatLogin = ({ code }) => {
  return http.request({
    url: `/wx/auth/code-to-session?code=${code}`,
    method: "GET"
  });
};

export const updateLocation = ({ data, mockNearPoint = 1 }) => {
  return http.request({
    method: "POST",
    url: `/pbpark/location?mockNearPoint=${mockNearPoint}`,
    dataType: "json",
    data
  });
};

export const getPark = ({ name = "yxh" } = {}) => {
  return http.request({
    method: "Get",
    url: `/pbpark/park/${name}`,
    dataType: "json"
  });
};

export const updateUser = ({ nickName, province, avatarUrl, gender } = {}) => {
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

export const createQuizResult = ({ duration, correct, point, park } = {}) => {
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

export const api = {
  updateLocation,
  getPark,
  wechatLogin,
  updateUser,
  createQuizResult
};
