import { routerRedux } from 'dva/router';
import * as service from '../services';
import { USER_TYPE } from '@/enums';
import { getPageQuery } from '@/utils/utils';

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
    *userLogin({ payload: { userType, value } }: any, { call, put }: any) {
      let userLogin;
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

      const response = yield call(userLogin, value);

      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params as { redirect: string };
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = redirect;
          return;
        }
      }

      const pathnamePrefix = userType;
      yield put(routerRedux.replace(redirect || `${pathnamePrefix}`));
    },

    *logout(_, { put }) {
      // const { redirect } = getPageQuery();
      // // redirect
      // if (window.location.pathname !== '/user/login' && !redirect) {
      //   yield put(
      //     routerRedux.replace({
      //       pathname: '/user/login',
      //       search: stringify({
      //         redirect: window.location.href,
      //       }),
      //     }),
      //   );
      // }
    },
  },

  subscriptions: {

  },
}