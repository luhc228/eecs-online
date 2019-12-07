import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import * as classService from '../services';
import { ClassTableData } from '@/interfaces/class';

export interface StateType {
  data: ClassTableData;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    save: Reducer<StateType>;
  };
  effects: {
    fetchClassPagination: Effect,
    removeClass: Effect,
  };
}

const Model: ModelType = {
  namespace: 'class',

  state: {
    data: {
      classList: [],
      total: 0,
      pageSize: 8,
      page: 1,
    },
  },

  reducers: {
    save(state: any, { payload: { data } }: any) {
      return { ...state, data }
    },
  },

  effects: {
    /**
     * 获取班级信息分页
     */
    *fetchClassPagination({ payload }: any, { call, put }: any) {
      const response = yield call(classService.fetchClassPagination, payload);
      const { data } = response;
      yield put({
        type: 'save',
        payload: {
          data,
        },
      })
    },

    /**
     * 删除某个班级
     */
    *removeClass({ payload }: any, { call, put, select }: any) {
      const response = yield call(classService.removeClass, payload);
      const { data } = response;

      const page = yield select((state: any) => state.data.page);
      yield put({
        type: 'fetchClassPagination',
        payload: {
          page,
        },
      })
    },
  },
}

export default Model
