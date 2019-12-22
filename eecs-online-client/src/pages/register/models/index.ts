import { Reducer } from 'redux';
import router from 'umi/router';
import { USER_TYPE } from '@/enums';
import { Effect } from '@/interfaces/reduxState';
import * as service from '../services';
import userUtils from '@/utils/user-utils';
import { getPageQuery } from '@/utils/utils';

export interface StateType {
  userType: USER_TYPE.Student | USER_TYPE.Teacher;
  userForm: {
    id?: string;
    password?: string;
  };
  when?: boolean;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    changeUserType: Reducer<StateType>;
  };
  effects: {
    userRegister: Effect<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'register',

  state: {
    userType: USER_TYPE.Student,
    userForm: {
      id: undefined,
      password: undefined,
    },
    when: true,
  },

  reducers: {
    changeUserType(state: any, { payload: userType }: any) {
      return {
        ...state,
        userType,
      };
    },

    // registerHandle(state: any, {payload}: any) {
    //     return {
    //         ...state,
    //         when: payload.when,
    //     }
    // }
  },

  effects: {
    *userRegister({ payload: { userType, userForm } }: any, { call, put }: any) {
      let userRegister;
      if (typeof userType === 'string') {
        userType = Number(userType);
      }

      switch (userType) {
        case USER_TYPE.Student:
          userRegister = service.studentRegister;
          break;
        case USER_TYPE.Teacher:
          userRegister = service.teacherRegister;
          break;
        default:
          return;
      }

      const response = yield call(userRegister, userForm);
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
          // 如果切换用户注册，则需要置换pathname 自动跳转至对应用户的默认路由
          if (redirectUrlParams.pathname.split('/')[1] !== userTypeName) {
            redirect = `/${userTypeName}`;
          }
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = redirect;
        }
      }
      const pathnamePrefix = userTypeName;
      yield put(router.replace(redirect || `/${pathnamePrefix}`));
    },
  },
};

export default Model;
