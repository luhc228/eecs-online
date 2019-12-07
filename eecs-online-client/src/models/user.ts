import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { USER_TYPE } from '@/enums';
import userUtils from '@/utils/user-utils';

export interface CurrentUserModels {
  // 用户姓名
  name: string | undefined,
  // 性别
  gender: string | undefined,
  // 学号 或 工号
  id: string | undefined,
  // 班级
  class?: string,
  // 学院
  college?: string,
  // 用户类型
  userType?: USER_TYPE.Student | USER_TYPE.Teacher,
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: CurrentUserModels) => T) => T },
) => void;

export interface UserModelState {
  currentUser?: CurrentUserModels;
}

export interface UserModelType {
  namespace: 'user',
  state: UserModelState,
  reducers: {
    save: Reducer<UserModelState>
  },
  subscriptions: {
    setup: ({ dispatch, history }: { dispatch: any, history: any }) => void;
  }
  // effects: {
  //   changeUserInfo: Effect,
  // },
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {
      name: undefined,
      gender: undefined,
      id: undefined,
    },
  },

  reducers: {
    save(state: any, { payload: currentUser }: any) {
      Object.assign(state, currentUser);
      return state;
    },
  },

  // effects: {
  //   *changeUserInfo(
  //     { payload }: any, { put }: { put: any }) {
  //     yield put({
  //       type: 'save',
  //       payload,
  //     })
  //   },
  // },
  subscriptions: {
    setup({ dispatch, history }: { dispatch: any, history: any }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname !== '/login') {
          const currentUser: CurrentUserModels = userUtils.getUserInfo();
          dispatch({ type: 'save', payload: { currentUser } });
        }
      });
    },
  },
}

export default UserModel;
