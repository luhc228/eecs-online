import { Reducer } from 'redux';
import umiRouter from 'umi/router';
import { USER_TYPE } from '@/enums';
import { Effect } from '@/interfaces/reduxState';
import * as service from '../services';
import userUtils from '@/utils/user-utils';

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
    // changeUserType: Reducer<StateType>;
  };
  effects: {
    PasswordEdit: Effect<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'passwordEdit',

  state: {
    userType: userUtils.getUserInfo().userType,
    userForm: {
      id: undefined,
      password: undefined,
    },
    when: true,
  },

  reducers: {},

  effects: {
    *PasswordEdit({ payload: { userType, values } }: any, { call, put }: any) {
      let passwordEdit;
      if (typeof userType === 'string') {
        userType = Number(userType);
      }
      console.log(values);
      switch (userType) {
        case USER_TYPE.Student:
          passwordEdit = service.studentPasswordEdit;
          break;
        case USER_TYPE.Teacher:
          passwordEdit = service.teacherPasswordEdit;
          break;
        default:
          return;
      }

      const response = yield call(passwordEdit, values);
      // const { accessToken, ...userInfo } = response.data;
      yield put(umiRouter.goBack);
    },
  },
};

export default Model;
