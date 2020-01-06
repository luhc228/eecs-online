import { Reducer } from 'redux';
import { Dispatch, EffectsCommandMap } from 'dva';
import { Effect } from '@/interfaces/reduxState';
import * as teacherHomeworkEditService from '../services';
import { NOTIFICATION_TYPE } from '@/enums';
import { QuestionDetailModel, TeacherHomeworkEditListItem, TeacherHomeworkEditData } from '@/interfaces/teacherHomeworkEdit';
import showNotification from '@/utils/showNotification';
import router from 'umi/router';
import { SelectComponentDatasourceModel } from '@/interfaces/components';
import { fetchCourseList } from '@/services';

export interface StateType {
  when: boolean;
  questionList: QuestionDetailModel[];
  targetKeys: string[];
  homeworkDetailFields: TeacherHomeworkEditListItem;
  homeworkFields: TeacherHomeworkEditData;
  courseIdDataSource: SelectComponentDatasourceModel[];
}

export interface ModelType {
  namespace: string;

  state: StateType;

  reducers: {
    changeQuestionList: Reducer<any>;
    changeOriginTargetKeys: Reducer<any>;
  };
  effects: {
    createTeacherHomework: Effect<StateType>;
    updateTeacherHomework: Effect<StateType>;
    fetchTeacherQuestionDetail: Effect<StateType>;
    fetchCourseList: Effect<StateType>;
  };

  subscriptions: {
    setup: ({ dispatch }: { dispatch: Dispatch<any> }) => void;
  };
}

const initState = {
  questionList: [],
  targetKeys: [],
  homeworkFields: [],
  homeworkDetailFields: {},
  courseIdDataSource: [],
};

const Model: ModelType = {
  namespace: 'teacherHomeworkEdit',

  state: initState,

  reducers: {
    initState(
      _: StateType, 
      { payload }: { type: string; payload: { state: StateType } }
    ) {
      return { ...payload.state };
    },

    saveCourseIdDataSource(
      state: StateType,
      { payload }: { type: string; payload: { data: SelectComponentDatasourceModel[] } },
    ) {
      console.log(payload.data);
      return { ...state, courseIdDataSource: payload.data };
    },

    changeQuestionList(
      state: StateType,
      {payload: { questionList }}: { payload: { questionList: QuestionDetailModel[] } },
    ) {
      return { ...state, questionList };
    },

    changeTargetKeys(
      state: StateType,
      { payload: { targetKeys } }: { payload: { targetKeys: string[] } },
    ) {
      return { ...state, targetKeys };
    },

    changeTeacherHomeworkDetailFields(
      state: StateType,
      { payload }: { payload: { data: { homeworkFileds: TeacherHomeworkEditData } } }
    ) {
      return {
        ...state,
        homeworkDetailFields: payload.data
      }
    },

    changePromptStatus(
      state: StateType,
      { payload }: { type: string; payload: { when: boolean } }
    ) {
      return { ...state, when: payload.when }
    },
  },

  effects: {
    *fetchCourseList({ payload }: { type: string; payload: { teacherId: string} }, { call, put }: EffectsCommandMap) {
      const response = yield call(fetchCourseList, payload.teacherId);
      if (!response) {
        return;
      }
      const {
        data: { list },
      } = response;
      const courseIdDataSource = list.map((item: any) => ({
        label: item.course,
        value: item.courseId,
      }));

      yield put({
        type: 'saveCourseIdDataSource',
        payload: {
          data: courseIdDataSource,
        },
      });
    },

    /**
     * 获取所有题目详情
     */
    *fetchQuestionDetail(
      { payload }: { type:string, payload: { values:any } },
      { call, put }: EffectsCommandMap
      ) {
      const response = yield call(teacherHomeworkEditService.fetchQuestionDetail, payload);
      const { data } = response;
      const { list } = data;

      yield put({
        type: 'changeQuestionList',
        payload: {
          questionList: list,
        },
      });
    },

    /**
     * 获取已存在的作业信息
     */
    *fetchTeacherHomeworkDetail(
      { payload }: { type: string, payload: { homeworkId: number } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(teacherHomeworkEditService.fetchTeacherHomeworkDetail, payload.homeworkId);
      const { homeworkName, questionList } = response.data;

      yield put({
        type: 'changeTeacherHomeworkDetailFields',
        payload: {
          data: {
            homeworkName
          }
        }
      });
      const targetKeys = questionList.map((item: any) => item.questionId);
      yield put({
        type: 'changeTargetKeys',
        payload: {
          targetKeys
        }
      })
    },

    /**
     * 新增教师作业信息
     */
    *createTeacherHomework(
      { payload }: { type: string, payload: { data: any } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(teacherHomeworkEditService.createTeacherHomework, payload.data);
      const { success } = response;
      if (success) {
        yield put({
          type: 'changePromptStatus',
          payload: {
            when: false,
          },
        })
        showNotification('通知', '新增作业信息成功', NOTIFICATION_TYPE.success);
        router.goBack();
      }
    },

    /**
     * 更新作业信息
     */
    *updateTeacherHomework(
      { payload }: { type: string, payload: { data: any } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(teacherHomeworkEditService.updateTeacherHomework, payload.data);
      const { success } = response;
      if (success) {
        yield put({
          type: 'changePromptStatus',
          payload: {
            when: false,
          },
        })
        showNotification('通知', '更新作业信息成功', NOTIFICATION_TYPE.success);
        router.goBack();
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }: { dispatch: Dispatch<any>, history: any }) {
      return history.listen(({ pathname, query }: { pathname: string, query: { homeworkId: number } }) => {
        if (pathname === '/teacher/homework/create' || pathname === '/teacher/homework/edit') {
          dispatch({
            type: 'initState',
            payload: {
              state: initState
            }
          });

          dispatch({
            type: 'fetchQuestionDetail',
            payload: {
              values: {}
            }
          });

          const { homeworkId } = query;
          if (homeworkId) {
            dispatch({
              type: 'fetchTeacherHomeworkDetail',
              payload: {
                homeworkId
              }
            })
          }
        }
      })
    },
  },
}
export default Model;