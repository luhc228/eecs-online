import router from 'umi/router';
import { stringify } from 'qs';
import * as service from '../services';
import { USER_TYPE } from '@/enums';
import { getPageQuery } from '@/utils/utils';
import userUtils from '@/utils/user-utils';

export default {
  namespace: 'login',

  state: {
    userType: USER_TYPE.Student,
  },

  reducers: {
    changeUserType(state: any, { payload: userType }: any) {
      return {
        ...state,
        userType,
      }
    },
  },

  effects: {
    *userLogin({ payload: { userType, values } }: any, { call, put }: any) {
      let userLogin;
      if (typeof userType === 'string') {
        userType = Number(userType)
      }

      switch (userType) {
        case USER_TYPE.Student:
          userLogin = service.studentLogin;
          break;
        case USER_TYPE.Teacher:
          userLogin = service.teacherLogin;
          break;
        default:
          return;
      }

      const response = yield call(userLogin, values);
      const { accessToken, ...userInfo } = response.data;
      userUtils.saveToken(accessToken);
      userUtils.saveUserInfo(userInfo);

      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      const userTypeName: string = USER_TYPE[userType].toLocaleLowerCase();
      let { redirect } = params as { redirect: string };
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          // 如果切换用户登录，则需要置换pathname 自动跳转至对应用户的默认路由
          if (redirectUrlParams.pathname.split('/')[1] !== userTypeName) {
            redirect = `/${userTypeName}`
          }
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = redirect;
          return;
        }
      }

      // 如果没有指定redirect 则默认跳转到登录用户类型的默认路由
      const pathnamePrefix = userTypeName;

      yield put(router.replace(redirect || `/${pathnamePrefix}`));
    },

    *logout(_: any, { put }: any) {
      const { redirect } = getPageQuery();
      userUtils.logout();
      // redirect
      if (window.location.pathname !== '/login' && !redirect) {
        yield put(
          router.replace({
            pathname: '/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
}
