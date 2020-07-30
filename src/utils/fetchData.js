import * as axios from 'axios';
import { api } from '../server/api';
import { Notification, Message } from 'ant-design-vue';

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    resFormat(response);
    return response.data;
  },
  function (error) {
    const errCode = error.message.replace(/[^0-9]/gi, '');
    try {
      errCode && serverError(error, errCode);
    } catch (err) {
      console.log('err', err);
    }
    return Promise.reject(error);
  }
);

const fetchData = {
  get: (url, params, method = 'get') => axios[method](api[url], params),
  post: (url, params, method = 'post') => axios[method](api[url], params)
};

// 处理响应状态码
const resFormat = (res) => {
  // 199 登录超时
  // 4 登录成功
  // 0 成功
  if (res && res.data && res.data.code == 199) {
    resCodeMap[res.data.code] && resCodeMap[res.data.code](res);
  } else if (res.data.code > 0 && res.data.code != 4) {
    Message.error(res.data.msg || '错误');
  }
};
// 状态map
const resCodeMap = {
  199: (res) => {
    Notification.open({
      type: 'error',
      message: `错误码 ${res.data.code || '暂无'}`,
      description: `${res.data.msg || '暂无'},1秒后返回登录`,
      duration: 1,
      onClose: () => {
        location.hash = '#/login';
        location.reload();
      }
    });
  }
};
const serverError = (err, code) => {
  Notification.open({
    type: 'error',
    message: `错误码 ${code + '' || '暂无'}`,
    description: `${err.message || '暂无'},服务异常，请联系管理员,url:${
      err.config.url
    }`,
    duration: 3
  });
};

export default fetchData;
