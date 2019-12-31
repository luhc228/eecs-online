import { EffectsCommandMap, Dispatch } from 'dva';
import * as services from '../services';
import userUtils from '@/utils/user-utils';
import { HomeworkDetailData } from '@/interfaces/studentHomeworkDetail';

export interface StateType {
  data: HomeworkDetailData,
  homeworkFields: any,
}

const initState = {
  data: {
    homeworkName: '',
    homeworkScore: null,
    finalScore: null,
    list: []
  }
}

const studentHomeworkDetail = {
  namespace: 'studentHomeworkDetail',

  state: initState,

  reducers: {
    initState(
      _: StateType,
      { payload }: { type: string; payload: { state: StateType } }
    ) {
      return { ...payload.state }
    },

    save(
      state: StateType,
      { payload }: { type: string; payload: { data: any } }
    ) {
      return {
        ...state,
        data: payload.data,
      }
    }
  },

  effects: {
    /**
    * 获取学生完成作业情况
    */
    *fetchHomeworkCondition(
      { payload }: { type: string; payload: { homeworkId: number, studentId: string } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(
        services.fetchHomeworkCondition,
        payload.homeworkId,
        payload.studentId
      );
      const { data } = response;
      yield put({
        type: 'save',
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
        { pathname, query }: { pathname: string, query: { [k: string]: string } }
      ) => {
        if (pathname === '/student/homework/detail') {
          dispatch({
            type: 'initState',
            payload: {
              state: initState
            }
          });

          const { homeworkId } = query;
          const userInfo = userUtils.getUserInfo();
          if (Object.keys(userInfo).length !== 0 && userInfo.studentId && homeworkId) {
            const { studentId } = userInfo;

            dispatch({
              type: 'fetchHomeworkCondition',
              payload: {
                homeworkId,
                studentId,
              }
            })
          }
        }
      })
    }
  },
}

export default studentHomeworkDetail;
