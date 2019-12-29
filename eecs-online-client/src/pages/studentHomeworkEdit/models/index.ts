import { EffectsCommandMap, Dispatch } from 'dva';
import * as services from '../services';
import userUtils from '@/utils/user-utils';
import { HomeworkDetail } from '@/interfaces/studentHomeworkEdit';

export interface StateType {
  data: HomeworkDetail;
  homeworkFields: any;
  when: boolean;
}

const initState = {
  data: {
    total: 0,
    homeworkScore: undefined,
    singleQuestionList: [],
    multipleQuestionList: [],
    judgeQuestionList: [],
    programQuestionList: [],
  },
  homeworkFields: {},
  when: true,
  singleQuestionFormIdMap: {},
  multipleQuestionFormIdMap: {},
  judgeQuestionFormIdMap: {},
  programQuestionFormIdMap: {},
}

const questionLibEdit = {
  namespace: 'studentHomeworkEdit',

  state: initState,

  reducers: {
    initState(
      _: StateType,
      { payload }: { type: string; payload: { state: StateType } }
    ) {
      return { ...payload.state }
    },

    saveHomeworkDetail(
      state: StateType,
      { payload }: { type: string; payload: { data: HomeworkDetail } }
    ) {
      return {
        ...state,
        data: payload.data,
      }
    },

    saveHomeworkFormIdMap(
      state: StateType,
    ) {
      const { data } = state;
      const {
        singleQuestionList,
        multipleQuestionList,
        judgeQuestionList,
        programQuestionList
      } = data;
    },
    changePromptStatus(
      state: StateType,
      { payload }: { type: string; payload: { when: boolean } }
    ) {
      return { ...state, when: payload.when }
    },

    changeHomeworkFields(
      state: StateType,
      { payload }: { type: string; payload: { data: any } }
    ) {
      return {
        ...state,
        homeworkFields: payload.data,
      }
    }
  },

  effects: {
    /**
     * 获取作业详情
     */
    *fetchHomeworkDetail(
      { payload }: { type: string; payload: { homeworkId: number, studentId: string } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(services.fetchHomeworkDetail, payload.homeworkId, payload.studentId);
      const { data } = response;
      yield put({
        type: 'saveHomeworkDetail',
        payload: {
          data
        }
      })

      yield put({
        type: 'saveHomeworkFormIdMap',
      })
    }
  },

  subscriptions: {
    setup(
      { dispatch, history }: { dispatch: Dispatch<any>, history: any }
    ) {
      return history.listen((
        { pathname, query }: { pathname: string, query: { [k: string]: string } }) => {
        if (pathname === '/student/homework/edit') {
          const { homeworkId } = query;

          dispatch({
            type: 'initState',
            payload: {
              state: initState
            }
          });

          const userInfo = userUtils.getUserInfo();

          if (Object.keys(userInfo).length !== 0 && userInfo.studentId && homeworkId) {
            const { studentId } = userInfo;
            dispatch({
              type: 'fetchHomeworkDetail',
              payload: {
                homeworkId,
                studentId
              }
            });
          }
        }
      })
    }
  },
}

export default questionLibEdit;
