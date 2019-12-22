import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap, Dispatch } from 'dva';
import { USER_TYPE } from '@/enums';
import userUtils from '@/utils/user-utils';

export interface CurrentUserModels {
  // 用户姓名
  name: string | undefined,
  // 性别
  gender: string | undefined,
  // 学号 或 工号
  teacherId?: string,
  studentId?: string;
  // 班级
  studentClass?: string,
  // 学院
  college?: string,
  // 用户类型
  userType: USER_TYPE,
}

export const usernameToFormFieldName: { [key: string]: string } = {
  Student: 'studentId',
  Teacher: 'teacherId',
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
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {
      name: undefined,
      gender: undefined,
      userType: USER_TYPE.Student,
    },
  },
  // state: StateType,
  //     { payload }: { type: string; payload: { data: TableData } }
  reducers: {
    save(
      state: any,
      { payload }: { payload: { currentUser: any } }
    ) {
      console.log(payload.currentUser)
      const newState = { currentUser: { ...payload.currentUser } }
      console.log('currentUser', newState)
      return newState;
    },
  },

  subscriptions: {
    setup({ dispatch, history }: { dispatch: Dispatch<any>, history: any }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname !== '/login') {
          const currentUser: CurrentUserModels = userUtils.getUserInfo();
          console.log('currentUser', currentUser);
          dispatch({ type: 'save', payload: { currentUser } });
        }
      });
    },
  },
}

export default UserModel;
