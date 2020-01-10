import { extend } from 'umi-request';
import { notification } from 'antd';
import appConfig from '@/appConfig';
import userUtils from '@/utils/user-utils';
import showNotification from './showNotification';
import { NOTIFICATION_TYPE, USER_TYPE } from '@/enums';
import { usernameToFormFieldName } from '@/models/user';

const codeMessage: { [key: string]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const { status, url } = response;
    const errorText = codeMessage[status] || response.statusText;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  throw error;
};

const host = process.env.NODE_ENV === 'production' ? appConfig.apiUrl : '';
// const host = appConfig.apiUrl;

// authorization
// ref: https://github.com/umijs/umi-request/blob/master/README.md
const request = extend({
  prefix: `${host}/api`,
  errorHandler, // 默认错误处理
  credentials: 'same-origin', // 默认请求是否带上cookie
});

// request 拦截器
request.interceptors.request.use((url: string, options: any) => {
  const token = userUtils.getToken();

  if (token) {
    options.headers.Authorization = token;
  }

  return { url, options };
});

// response 拦截器
request.interceptors.response.use(response => {
  if (response.status !== 200) {
    showNotification(response.status, codeMessage[response.status], NOTIFICATION_TYPE.error);
  }

  return response;
});

// 使用中间件对请求前后做处理
request.use(
  async (ctx, next) => {
    const { req } = ctx;
    const { options } = req;

    const userInfo = userUtils.getUserInfo();

    if (userUtils.isLogin) {
      if (options.method === 'post') {
        if (options.data) {
          console.log(userInfo.userType);
          if (userInfo.userType) {
            console.log(userInfo.userType);
            const userIdName: string = usernameToFormFieldName[USER_TYPE[userInfo.userType]];

            const newData = { ...options.data, [userIdName]: userInfo[userIdName] };
            const newOptions = { ...options, data: newData };

            ctx.req.options = {
              ...newOptions,
            };
          }
        }
      }

      if (options.method === 'get') {
        if (options.params) {
          if (userInfo.userType) {
            console.log(userInfo.userType);
            const userIdName: string = usernameToFormFieldName[USER_TYPE[userInfo.userType]];
            const newParams = { ...options.params, [userIdName]: userInfo[userIdName] };
            const newOptions = { ...options, params: newParams };

            ctx.req.options = {
              ...newOptions,
            };
          }
        }
      }
    }

    await next();

    const { res } = ctx;
    const { success = false, message = '请求失败' } = res;
    if (!success) {
      showNotification('请求错误', message, NOTIFICATION_TYPE.error);
    }
  },
  { global: true },
);

export default request;
