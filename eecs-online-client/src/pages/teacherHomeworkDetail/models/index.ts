import { EffectsCommandMap, Dispatch } from 'dva';
import { Reducer } from 'redux';
import * as services from '../services';
import userUtils from '@/utils/user-utils';
import {
  HomeworkDetailData,
  FilterFieldsModel,
  DetailEditModel,
} from '@/interfaces/teacherHomeworkDetail';
import { Effect } from '@/interfaces/reduxState';

export interface StateType {
  data: HomeworkDetailData;
  // homeworkFields: any;
  filterFields: FilterFieldsModel;
}

const initState = {
  data: {
    homeworkName: '',
    homeworkScore: null,
    finalScore: null,
    studentName: null,
    studentId: null,
    homeworkId: null,
    list: [],
  },
  filterFields: {
    studentId: 1,
    homeworkId: 1,
  },
};

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    changeHomeworkFields: Reducer<StateType>;
    changePromptStatus: Reducer<StateType>;
  };
  effects: {
    updateStudentInfo: Effect<StateType>;
  };
}

const TeacherHomeworkDetail = {
  namespace: 'teacherHomeworkDetail',

  state: initState,

  reducers: {
    initState(state: StateType, { payload }: { type: string; payload: { state: StateType } }) {
      return { ...payload.state };
    },

    changePromptStatus(
      state: StateType,
      { payload }: { type: string; payload: { when: boolean } },
    ) {
      return { ...state, when: payload.when };
    },

    save(state: StateType, { payload }: { type: string; payload: { data: any } }) {
      return {
        ...state,
        data: payload.data,
      };
    },
  },

  effects: {
    /**
     * 获取学生完成作业情况
     */
    *fetchHomeworkCondition(
      { payload }: { type: string; payload: { filterFields: FilterFieldsModel } },
      { call, put }: EffectsCommandMap,
    ) {
      const response = yield call(services.fetchHomeworkCondition, payload.filterFields);
      const { data } = response;
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },

    /**
     * 更新试题
     */
    *updateTeacherHomeworkDetail(
      { payload }: { type: string; payload: { allFileds: DetailEditModel } },
      { call, put }: EffectsCommandMap,
    ) {
      const response = yield call(services.updateTeacherHomeworkDetail, payload.allFileds);
      const { success } = response;
      if (success) {
        yield put({
          type: 'changePromptStatus',
          payload: {
            when: false,
          },
        });
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }: { dispatch: Dispatch<any>; history: any }) {
      return history.listen(
        ({ pathname, query }: { pathname: string; query: { [k: string]: string } }) => {
          if (pathname === '/teacher/homework/completion/detail') {
            dispatch({
              type: 'initState',
              payload: {
                state: initState,
              },
            });

            const { homeworkId, studentId } = query;
            // console.log(query);
            dispatch({
              type: 'fetchHomeworkCondition',
              payload: {
                homeworkId,
                studentId,
              },
            });
          }
        },
      );
    },
  },
};

export default TeacherHomeworkDetail;
