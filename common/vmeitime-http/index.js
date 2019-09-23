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
  const token = _.get(store, "state.auth.token");
  if (token) {
    config.header = {
      Authorization: `Bearer ${token}`
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

// 轮播图
export const banner = data => {
  return http.request({
    url: "/banner/36kr",
    method: "GET",
    data
    // handle:true
  });
};

export const wechatLogin = ({ code }) => {
  return http.request({
    url: `/wechat/login`,
    method: "POST",
    dataType: "json",
    data: {
      code
    }
  });
};

export const wechatSignup = ({ session_key, encryptedData, iv }) => {
  return http.request({
    url: `/wechat/signup`,
    method: "POST",
    dataType: "json",
    data: { session_key, encryptedData, iv }
  });
};

export const wechatDecrypt = ({ session_key, encryptedData, iv }) => {
  return http.request({
    url: `/wechat/decrypt`,
    method: "POST",
    dataType: "json",
    data: {
      session_key,
      encryptedData,
      iv
    }
  });
};

export const updateMobile = ({ session_key, encryptedData, iv, openid }) => {
  return http.request({
    url: `/wechat/update-mobile`,
    method: "POST",
    dataType: "json",
    data: {
      session_key,
      encryptedData,
      iv,
      openid
    }
  });
};

export const updateUser = ({ userId, data }) => {
  return http.request({
    url: `/user/${userId}`,
    method: "PUT",
    dataType: "json",
    data
  });
};

export const getStores = () => {
  return http.request({
    url: `/store`,
    method: "GET"
  });
};

export const createBooking = ({ store, type, date, hours, checkInAt, membersCount, socksCount, code, useCredit }) => {
  const data = _.omitBy({ store, type, date, hours, checkInAt, membersCount, socksCount, code }, _.isNil);
  return http.request({
    url: `/booking?useCredit=${useCredit}`,
    method: "POST",
    dataType: "json",
    data
  });
};

export const getBookingPrice = ({ store, type, date, hours, checkInAt, membersCount, socksCount, code, useCredit }) => {
  const data = _.omitBy({ store, type, date, hours, checkInAt, membersCount, socksCount, code }, _.isNil);
  return http.request({
    url: `/booking-price`,
    method: "POST",
    dataType: "json",
    data
  });
};

export const userDeposit = ({ depositLevel }) => {
  return http.request({
    url: `/user-deposit`,
    method: "POST",
    dataType: "json",
    data: {
      depositLevel
    }
  });
};

export const getConfigs = () => {
  return http.request({
    url: `/config`,
    method: "GET",
    dataType: "json"
  });
};

export const getAvailabilityBooking = ({ type, month, date, hours }) => {
  const data = _.omitBy({ month, date, hours }, _.isNil);
  return http.request({
    url: `/booking-availability/${type}`,
    method: "GET",
    dataType: "json",
    data
  });
};

export const getPayment = ({ id }) => {
  return http.request({
    url: `/payment/${id}`,
    method: "GET",
    dataType: "json"
  });
};

export const getBooking = ({ id }) => {
  return http.request({
    url: `/booking/${id}`,
    method: "GET",
    dataType: "json"
  });
};

export const getAuthUser = () => {
  return http.request({
    url: `/auth/user`,
    method: "GET",
    dataType: "json"
  });
};

export const postUserMembership = ({ cardType }) => {
  return http.request({
    url: `/user-membership`,
    method: "POST",
    dataType: "json",
    data: {
      cardType
    }
  });
};

export const getBookings = () => {
  return http.request({
    url: `/booking`,
    method: "GET",
    dataType: "json"
  });
};
