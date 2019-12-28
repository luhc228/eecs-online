import { EffectsCommandMap, Dispatch } from 'dva';
import * as services from '../services';
import userUtils from '@/utils/user-utils';
import { QUESTION_TYPE } from '@/enums';

export interface HomeworkListItem {
  questionId: number;
  content: string;
  contentImage?: string;
  options?: string;
  questionType: QUESTION_TYPE;
}

export interface HomeworkDetail {
  total: number;
  singleQuestionList?: HomeworkListItem[];
  multipleQuestionList?: HomeworkListItem[];
  judgeQuestionList?: HomeworkListItem[];
  programQuestionList?: HomeworkListItem[];
}

export interface StateType {
  data: HomeworkDetail;
  homeworkField: any;
}

const initState = {
  data: {
    total: 0,
    singleQuestionList: [],
    multipleQuestionList: [],
    judgeQuestionList: [],
    programQuestionList: [],
  },
  homeworkField: {}
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
