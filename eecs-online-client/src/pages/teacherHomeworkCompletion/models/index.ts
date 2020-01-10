import React from 'react';
import { Reducer, Dispatch } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  CompletionTableData,
  FilterFieldsModel,
  PaginationParamsModel,
} from '@/interfaces/teacherHomeworkCompletion';
import * as completionService from '../services';
import { Effect } from '@/interfaces/reduxState';
import { DEFAULT_TABLE_PAGINATION_STATE, TWO_COLUMNS_FORM_LAYOUT } from '@/constants';

export interface StateType {
  data: CompletionTableData;
  filterFields: FilterFieldsModel;
  location: Location;
}

// const { query } = umiRouter;
// console.log(query);

const initState = {
  filterFields: {
    classId: 1,
    homeworkId: 1,
    courseId: 1,
  },
  data: DEFAULT_TABLE_PAGINATION_STATE,
};

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

  state: initState,

  reducers: {
    save(state: StateType, { payload }: { type: string; payload: { data: CompletionTableData } }) {
      return { ...state, data: payload.data };
    },
    changeFilterFields(
      state: StateType,
      { payload }: { type: string; payload: { filterFields: FilterFieldsModel } },
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
      console.log(data);
      const { list } = data;
      console.log(list);
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },
  },

  subscriptions: {
    setup({
      dispatch,
      history,
      data,
    }: {
      dispatch: Dispatch<any>;
      history: any;
      data: PaginationParamsModel;
    }) {
      return history.listen(
        ({ pathname, query }: { pathname: string; query: { [k: string]: string } }) => {
          if (pathname === '/teacher/homework/completion') {
            dispatch({
              type: 'initState',
              payload: {
                state: initState,
              },
            });

            const { homeworkId, courseId } = query;
            console.log(query);

            dispatch({
              type: 'fetchCompletionPagination',
              payload: {
                data: {
                  homeworkId,
                  courseId,
                  page: 1,
                  pageSize: 8,
                  total: 10,
                  classId: 1,
                },
              },
            });
          }
        },
      );
    },
  },
};

export default Model;
