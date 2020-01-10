import { EffectsCommandMap, Dispatch } from 'dva';
import { Reducer } from 'redux';
import * as services from '../services';
import {
  HomeworkDetailData,
  FilterFieldsModel,
  DetailEditModel,
} from '@/interfaces/teacherHomeworkDetail';
import { Effect } from '@/interfaces/reduxState';

export interface StateType {
  data: HomeworkDetailData;
  filterFields: FilterFieldsModel;
  when: boolean;
}

const initState = {
  data: {
    total: null,
    homeworkName: '',
    homeworkScore: null,
    finalScore: null,
    studentName: null,
    studentId: null,
    list: [],
    questionScoreList: [],
  },
  filterFields: {
    studentId: '',
    homeworkId: 0,
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
      // console.log('filterFields', payload.filterFields);
      const response = yield call(services.fetchHomeworkCondition, payload.filterFields);
      // console.log('response', response);
      const { data, success } = response;
      const { list, questionScoreList } = data;
      // console.log('list', list)
      if (!success) {
        return;
      }
      // console.log('data', data);
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
      filterFields,
    }: {
      dispatch: Dispatch<any>;
      history: any;
      filterFields: FilterFieldsModel;
    }) {
      return history.listen(
        ({ pathname, query }: { pathname: string; query: { [k: string]: string } }) => {
          if (pathname === '/teacher/homework/completion/detail') {
            dispatch({
              type: 'initState',
              payload: {
                state: initState,
              },
            });
            const { filterFields } = initState;
            filterFields.homeworkId = Number(query.homeworkId);
            filterFields.studentId = query.studentId;
            // console.log(filterFields);
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
