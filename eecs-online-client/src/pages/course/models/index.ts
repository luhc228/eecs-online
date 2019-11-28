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
    fetchCoursePagination: Effect,
    removeCourse: Effect,
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
    /**
     * 获取课程信息分页
     */
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

    /**
     * 删除某个课程
     */
    *removeCourse({ payload }: any, { call, put, select }: any) {
      const response = yield call(courseService.removeCourse, payload);
      const { data } = response;

      const page = yield select((state: any) => state.data.page);
      yield put({
        type: 'fetchCoursePagination',
        payload: {
          page,
        },
      })
    },
  },
}

export default Model
