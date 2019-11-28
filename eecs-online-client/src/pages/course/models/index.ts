import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import * as courseService from '../services';
import { CourseTableData } from '@/interfaces/course';

export interface StateType {
  data: CourseTableData;
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
    fetchCoursePagination: Effect;
  };
}

const Model: ModelType = {
  namespace: 'course',

  state: {
    data: {
      courseList: [],
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
    *fetchCoursePagination({ payload }: any, { call, put }: any) {
      const response = yield call(courseService.fetchCoursePagination, payload);
      const { data } = response;
      yield put({
        type: 'save',
        payload: {
          data,
        },
      })
    },
  },
}

export default Model
