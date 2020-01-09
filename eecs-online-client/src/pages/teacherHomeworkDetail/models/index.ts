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
import { HomeworkDetailListItem } from '@/interfaces/studentHomeworkDetail';

export interface StateType {
  data: HomeworkDetailData;
  // homeworkFields: any;
  filterFields: FilterFieldsModel;
  when: boolean;
}

const initState = {
  data: {
    total: null,
    homeworkName: '',
    homeworkScore: null,
    finalScore: null,
    // studentName: null,
    // studentId: null,
    // homeworkId: null,
    list: [],
    questionScoreList: [],
  },
  filterFields: {
    studentId: null,
    homeworkId: null,
  },
  when: false,
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
    fetchHomeworkCondition: Effect<StateType>;
  };
}

const TeacherHomeworkDetail = {
  namespace: 'teacherHomeworkDetail',

  state: initState,

  reducers: {
    initState(state: StateType, { payload }: { type: string; payload: { state: StateType } }) {
      return { ...payload.state };
    },

    changeHomeworkFields(
      state: StateType,
      { payload }: { type: string; payload: { data: StateType } },
    ) {
      console.log(payload.data);
      return {
        ...state,
        data: payload.data,
        when: true,
      };
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
      console.log('filterFields', payload.filterFields);
      const response = yield call(services.fetchHomeworkCondition, payload.filterFields);
      console.log('response', response);
      const { data } = response;
      console.log('data', data);
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
          if (pathname === '/teacher/homework/completion/edit') {
            dispatch({
              type: 'initState',
              payload: {
                state: initState,
              },
            });

            const { homeworkId, studentId } = query;
            const filterFields = { homeworkId, studentId };
            dispatch({
              type: 'fetchHomeworkCondition',
              payload: {
                filterFields,
              },
            });
          }
        },
      );
    },
  },
};

export default TeacherHomeworkDetail;
