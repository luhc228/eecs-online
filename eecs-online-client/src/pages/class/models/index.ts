import { Reducer } from 'redux';
import { ClassTableData, ClassFieldsModel } from '@/interfaces/class';
import * as classService from '../services';
import { Effect } from '@/interfaces/reduxState';

export interface StateType {
  data: ClassTableData;
  filterFields: ClassFieldsModel;
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

const Model: ModelType = {
  namespace: 'courseClass',

  state: {
    data: {
      list: [],
      total: 0,
      pageSize: 8,
      page: 1,
    },
    filterFields: {
      className: undefined,
      studentNum: undefined,
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
     * 获取班级信息分页
     * 包括信息筛选
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
      yield call(classService.removeClass, payload);

      const page = yield select((state: any) => {
        const { courseClass: { data } } = state;
        return data.page
      });

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
