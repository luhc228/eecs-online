import { Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  CompletionTableData,
  CompletionFilterFieldsModel,
  PaginationParamsModel,
} from '@/interfaces/teacherHomeworkCompletion';
import * as completionService from '../services';
import { Effect } from '@/interfaces/reduxState';
import { DEFAULT_TABLE_PAGINATION_STATE } from '@/constants';

export interface StateType {
  data: CompletionTableData;
  filterFields: CompletionFilterFieldsModel;
}

export interface ModelType {
  namespace: string;

  state: StateType;

  reducers: {
    save: Reducer<StateType>;
    changeFilterFields: Reducer<StateType>;
  };

  effects: {
    fetchCompletionPagination: Effect<StateType>;
  };
}

const Model = {
  namespace: 'teacherHomeworkCompletion',

  state: {
    data: DEFAULT_TABLE_PAGINATION_STATE,
    filterFields: {
      studentId: null,
      studentName: null,
      studentClass: null,
      delay: 'not_delay',
    },
  },

  reducers: {
    save(state: StateType, { payload }: { type: string; payload: { data: CompletionTableData } }) {
      return { ...state, data: payload.data };
    },
    changeFilterFields(
      state: StateType,
      { payload }: { type: string; payload: { filterFields: CompletionFilterFieldsModel } },
    ) {
      return { ...state, filterFields: payload.filterFields };
    },
  },

  effects: {
    /**
     * 获取完成作业信息分页
     * 包括信息筛选
     */
    *fetchCompletionPagination(
      { payload }: { type: string; payload: { data: PaginationParamsModel } },
      { put, call }: EffectsCommandMap,
    ) {
      const response = yield call(completionService.fetchCompletionPagination, payload.data);
      const { data } = response;
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },
  },
};

export default Model;
