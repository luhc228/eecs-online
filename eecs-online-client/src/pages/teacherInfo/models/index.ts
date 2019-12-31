import { Reducer, AnyAction } from 'redux';
import router from 'umi/router';
import { EffectsCommandMap } from 'dva';
import { TeacherUserForm } from '@/interfaces/teacherInfo';
import * as teacherInfoService from '../services';

export interface ItemType {
  name: string;
  id: string;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface StateType {
  user?: Partial<TeacherUserForm>;
  college?: ItemType[];
  studentClass?: ItemType[];
  loading?: boolean;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    updateInfo: Effect;
  };
  reducers: {
    changeUserFields: Reducer<StateType>;
    changePromptStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'teacherInfo',

  state: {
    user: {},
    college: [],
    studentClass: [],
    loading: false,
  },

  reducers: {
    changeUserFields(state: any, { payload: { data } }: any) {
      return { ...state, user: data, loading: true };
    },

    changePromptStatus(state: any, { payload: { loading } }: any) {
      return { ...state, loading };
    },
  },

  effects: {
    *updateInfo({ payload }: any, { call, put }: any) {
      yield call(teacherInfoService.updateInfo, payload);
      yield put({
        type: 'changePromptStatus',
        payload: {
          loading: true,
        },
      });
      // router.goBack();
    },
  },
};

export default Model;
