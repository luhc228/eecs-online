import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import * as courseService from '../services';
import { CourseTableData, filterFieldsProps } from '@/interfaces/course';
import { DEFAULT_TABLE_PAGINATION_STATE } from '@/constants';

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

const Model = {
  namespace: 'course',

  state: {
    data: DEFAULT_TABLE_PAGINATION_STATE,
    filterFields: {
      courseName: undefined,
      location: undefined,
      classNames: undefined,
    },
  },

  reducers: {
    save(
      state: StateType,
      { payload }: { type: string; payload: { data: CourseTableData } }
    ) {
      return { ...state, data: payload.data }
    },

    changeFilterFields(
      state: StateType,
      { payload }: { payload: { type: string, filterFields: filterFieldsProps } }
    ) {
      return { ...state, filterFields: payload.filterFields }
    },
  },

  effects: {
    /**
     * 获取课程信息分页
     * 包括信息筛选
     */
    *fetchCoursePagination(
      { payload }: { type: string; payload: { data: any } },
      { put, call }: EffectsCommandMap
    ) {
      const response = yield call(courseService.fetchCoursePagination, payload.data);
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
    *removeCourse(
      { payload }: { type: string; payload: { id: string } },
      { call, put, select }: EffectsCommandMap
    ) {
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

export default Model;
