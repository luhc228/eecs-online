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
import { DEFAULT_TABLE_PAGINATION_STATE, PAGINATION_CONFIGS } from '@/constants';
import { fetchVirClassList } from '@/services';
import { SelectComponentDatasourceModel } from '@/interfaces/components';

export interface StateType {
  data: CompletionTableData;
  filterFields: FilterFieldsModel;
  location: Location;
  classIdDataSource: [];
}

// const { query } = umiRouter;
// console.log(query);

const initState = {
  filterFields: {
    // className: '',
    homeworkId: 0,
    courseId: 0,
  },
  classIdDataSource: [],
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

    saveClassIdDataSource(
      state: StateType,
      { payload }: { type: string; payload: { data: SelectComponentDatasourceModel[] } },
    ) {
      console.log(payload.data);
      return { ...state, classIdDataSource: payload.data };
    },
  },

  effects: {
    *fetchClassList(
      { payload }: { type: string; payload: { homeworkId: number } },
      { call, put }: EffectsCommandMap,
    ) {
      const response = yield call(fetchVirClassList, payload.homeworkId);
      if (!response) {
        return;
      }
      const {
        data: { list },
      } = response;
      console.log(list);
      const classIdDataSource = list.map((item: any) => ({
        label: item.className,
        value: item.className,
      }));
      // console.log(collegeIdDataSource);

      yield put({
        type: 'saveClassIdDataSource',
        payload: {
          data: classIdDataSource,
        },
      });
    },

    /**
     * 获取完成作业信息分页
     * 包括信息筛选
     */
    *fetchCompletionPagination(
      { payload }: { type: string; payload: { data: PaginationParamsModel } },
      { put, call }: EffectsCommandMap,
    ) {
      console.log(payload.data);
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
            const { filterFields } = initState;
            filterFields.homeworkId = Number(homeworkId);
            filterFields.courseId = Number(courseId);
            dispatch({
              type: 'fetchCompletionPagination',
              payload: {
                data: {
                  homeworkId: Number(homeworkId),
                  courseId: Number(courseId),
                  // classId: initState.filterFields.classId,
                  ...PAGINATION_CONFIGS,
                },
              },
            });

            console.log('homeworkId', Number(homeworkId));
            dispatch({
              type: 'fetchClassList',
              payload: {
                homeworkId: Number(homeworkId),
              },
            });
          }
        },
      );
    },
  },
};

export default Model;
