import { Reducer } from 'redux';
import router from 'umi/router';
import umiRouter from 'umi/router';
import { USER_TYPE } from '@/enums';
import { Effect } from '@/interfaces/reduxState';
import * as service from '../services';

export interface StateType {
  userType: USER_TYPE;
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
  },

  effects: {
    *userRegister({ payload: { userType, values } }: any, { call, put }: any) {
      let userRegister;
      if (typeof userType === 'string') {
        userType = Number(userType);
      }
      console.log(values);
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

      const response = yield call(userRegister, values);
      // const { accessToken, ...userInfo } = response.data;
      yield put(router.push('/login'));
    },
  },
};

export default Model;
