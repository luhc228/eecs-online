import { Reducer, Dispatch } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ClassTableData, ClassFilterFieldsModel, PaginationParamsModel } from '@/interfaces/class';
import * as classService from '../services';
import { Effect } from '@/interfaces/reduxState';
import { DEFAULT_TABLE_PAGINATION_STATE } from '@/constants';

export interface StateType {
  data: ClassTableData;
  filterFields: ClassFilterFieldsModel;
}

export interface ModelType {
  namespace: string;

  state: StateType;

  reducers: {
    save: Reducer<StateType>;
    changeFilterFields: Reducer<StateType>;
  };

  effects: {
    fetchClassPagination: Effect<StateType>,
    removeClass: Effect<StateType>,
  };
}

const initState = {
  data: DEFAULT_TABLE_PAGINATION_STATE,
  filterFields: {
    className: undefined,
    studentNum: undefined,
  },
};

const Model = {
  namespace: 'courseClass',

  state: initState,

  reducers: {
    save(
      state: StateType,
      { payload }: { type: string; payload: { data: ClassTableData } }
    ) {
      return { ...state, data: payload.data }
    },

    changeFilterFields(
      state: StateType,
      { payload }: { type: string; payload: { filterFields: ClassFilterFieldsModel } }
    ) {
      return { ...state, filterFields: payload.filterFields }
    },
  },

  effects: {
    /**
     * 获取班级信息分页
     * 包括信息筛选
     */
    *fetchClassPagination(
      { payload }: { type: string; payload: { data: PaginationParamsModel } },
      { put, call }: EffectsCommandMap
    ) {
      const response = yield call(classService.fetchClassPagination, payload.data);
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
    *removeClass(
      { payload }: { type: string; payload: { classId: number } },
      { put, call, select }: EffectsCommandMap
    ) {
      yield call(classService.removeClass, payload.classId);

      const paginationData = yield select((state: any) => {
        const { courseClass: { data, filterFields } } = state;
        const { page, pageSize } = data;
        return {
          page,
          pageSize,
          ...filterFields,
        }
      });

      yield put({
        type: 'fetchClassPagination',
        payload: {
          data: paginationData,
        },
      })
    },
  },

  subscriptions: {
    setup(
      { dispatch, history }: { dispatch: Dispatch<any>, history: any }
    ) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/teacher/class') {
          dispatch({
            type: 'initState',
            payload: {
              state: initState
            }
          });
        }
      });
    },
  },
}

export default Model
