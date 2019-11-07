import * as service from '../services';
import { USER_TYPE } from '@/enums';

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
    *userLogin({ payload: { userType, value } }: any, { call }: any) {
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
      console.log(response);
    },
  },

  subscriptions: {

  },
}
