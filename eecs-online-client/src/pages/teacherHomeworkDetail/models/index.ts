import { EffectsCommandMap, Dispatch } from 'dva';
import * as services from '../services';
import userUtils from '@/utils/user-utils';
import { HomeworkDetailData } from '@/interfaces/teacherHomeworkDetail';
import { Reducer } from 'redux';
import { Effect } from '@/interfaces/reduxState';

export interface StateType {
  data: HomeworkDetailData,
  homeworkFields: any,
}

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

const initState = {
  data: {
    homeworkName: '',
    homeworkScore: null,
    finalScore: null,
    list: []
  }
}

const TeacherHomeworkDetail = {
    namespace: 'teacherHomeworkDetail',
  
    state: initState,
  
    reducers: {
      initState(
        state: StateType,
        { payload }: { type: string; payload: { state: StateType } }
      ) {
        return { ...payload.state }
      },

      changeTeacherHomeworkDetailfoFields(
        state: StateType,
        { payload }: { type: string; payload: { data: HomeworkDetailData } },
      ) {
        // console.log(payload.data);
        return {
          ...state,
          studentInfoFields: payload.data,
          when: true,
        };
      },
  
      changePromptStatus(
        state: StateType,
        { payload }: { type: string; payload: { when: boolean } },
      ) {
        return { ...state, when: payload.when };
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
      },

      *homeworkScoreEdit(
          { payload }: { type: string; payload: { homeworkId: number, studentId: string, questionId: string, questionScore: string}},
          { call, put }: EffectsCommandMap
        ) {
          const response = yield call(
              services.homeworkScoreEdit,
              payload.homeworkId,
              payload.studentId,
              payload.questionId,
              payload.questionScore,
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
          if (pathname === '/teacher/homework/completion/detail') {
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
  
  export default TeacherHomeworkDetail;
  