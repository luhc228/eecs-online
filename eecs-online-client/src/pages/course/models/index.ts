import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import * as courseService from '../services';
import { CourseTableData, filterFieldsProps } from '@/interfaces/course';

export interface StateType {
  data: CourseTableData;
  filterFields: filterFieldsProps
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
    changeFilterFields: Reducer<StateType>;
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
    filterFields: {
      courseName: undefined,
      location: undefined,
      classNames: undefined,
    },
  },

  reducers: {
    save(state: any, { payload: { data } }: any) {
      return { ...state, data }
    },

    changeFilterFields(state: any, { payload: { filterFields } }: any) {
      return { ...state, filterFields }
    },
  },

  effects: {
    /**
     * 获取课程信息分页
     * 包括信息筛选
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
      yield call(courseService.removeCourse, payload);

      const page = yield select((state: any) => {
        const { course: { data } } = state;
        return data.page
      });

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
