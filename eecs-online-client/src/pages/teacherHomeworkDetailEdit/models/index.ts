import { Reducer } from 'redux';
import router from 'umi/router';
import { EffectsCommandMap, Dispatch } from 'dva';
import { DetailEditModel } from '@/interfaces/teacherHomeworkDetailEdit';
import * as services from '../services';
import { Effect } from '@/interfaces/reduxState';

export interface StateType {
  detailFields: DetailEditModel;
  when: boolean;
}

const initState = {
  detailFields: {
    studentId: '',
    questionId: null,
    homeworkId: null,
    questionScore: null,
  },
  when: true,
};

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    changeDetailFields: Reducer<StateType>;
    changePromptStatus: Reducer<StateType>;
  };
  effects: {
    updateTeacherHomeworkDetail: Effect<StateType>;
  };
}

const Model = {
  namespace: 'teacherHomeworkDetailEdit',

  state: initState,

  reducers: {
    initState(state: StateType, { payload }: { type: string; payload: { state: StateType } }) {
      return { ...payload.state };
    },

    changeDetailFields(
      state: StateType,
      { payload }: { type: string; payload: { data: DetailEditModel } },
    ) {
      return {
        ...state,
        detailFields: payload.data,
        when: true,
      };
    },

    changePromptStatus(
      state: StateType,
      { payload }: { type: string; payload: { when: boolean } },
    ) {
      return { ...state, when: payload.when };
    },
  },

  effects: {
    *updateTeacherHomeworkDetail(
      { payload }: { type: string; payload: { data: DetailEditModel } },
      { call, put }: EffectsCommandMap,
    ) {
      console.log('data', payload.data);
      yield call(services.updateTeacherHomeworkDetail, payload.data);
      yield put({
        type: 'changePromptStatus',
        payload: {
          when: false,
        },
      });
      router.goBack();
    },
  },

  subscriptions: {
    setup({
      dispatch,
      history,
      detailFields,
    }: {
      dispatch: Dispatch<any>;
      history: any;
      detailFields: DetailEditModel;
    }) {
      return history.listen(
        ({ pathname, query }: { pathname: string; query: { [k: string]: number } }) => {
          if (pathname === '/teacher/homework/completion/detail/edit') {
            dispatch({
              type: 'initState',
              payload: {
                state: initState,
              },
            });

            // const detailFields = {
            //   homeworkId: Number(query.homeworkId),
            //   studentId: query.studentId,
            //   questionId: Number(query.questionId),
            //   questionScore: Number(query.score),
            // };
            // console.log('detailFields', detailFields);
            const questionScore = Number(query.score);
            console.log(questionScore);
            dispatch({
              type: 'changeDetailFields',
              payload: {
                questionScore,
              },
            });
          }
        },
      );
    },
  },
};

export default Model;
