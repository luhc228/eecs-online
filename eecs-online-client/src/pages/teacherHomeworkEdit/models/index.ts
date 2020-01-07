import { Dispatch, EffectsCommandMap } from 'dva';
import router from 'umi/router';
import moment from 'moment';
import * as teacherHomeworkEditService from '../services';
import { NOTIFICATION_TYPE } from '@/enums';
import {
  QuestionDetailModel,
  TeacherHomeworkFormFields,
  TeacherHomeworkEditDetail,
  SelectQuestionListItem
} from '@/interfaces/teacherHomeworkEdit';
import showNotification from '@/utils/showNotification';
import { SelectComponentDatasourceModel } from '@/interfaces/components';
import * as services from '@/services';
import userUtils from '@/utils/user-utils';

export interface StateType {
  when: boolean;
  targetKeys: string[];
  courseIdDataSource: SelectComponentDatasourceModel[];
  // 题目详情列表
  questionList: QuestionDetailModel[];
  // 作业详情表单字段
  homeworkFormFields: TeacherHomeworkFormFields;
  // 作业详情
  homeworkDetailFields: TeacherHomeworkEditDetail;
  // 选择的作业题目列表
  selectQuestionList: SelectQuestionListItem[];
}

const initState = {
  questionList: [],
  targetKeys: [],
  homeworkFormFields: {},
  homeworkDetailFields: {},
  courseIdDataSource: [],
  selectQuestionList: [],
};

const Model = {
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
      return { ...state, courseIdDataSource: payload.data };
    },

    changeQuestionList(
      state: StateType,
      { payload: { questionList } }: { payload: { questionList: QuestionDetailModel[] } },
    ) {
      return { ...state, questionList };
    },

    changeTargetKeys(
      state: StateType,
      { payload: { targetKeys } }: { payload: { targetKeys: string[] } },
    ) {
      return { ...state, targetKeys };
    },

    changeTeacherHomeworkFormFields(
      state: StateType,
      { payload }: { payload: { data: TeacherHomeworkFormFields } }
    ) {
      return {
        ...state,
        homeworkFormFields: payload.data
      }
    },

    changeSelectQuestionList(
      state: StateType,
      { payload }: { payload: { data: SelectQuestionListItem[] } }
    ) {
      return {
        ...state,
        selectQuestionList: payload.data
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
    /**
       * 获取所有课程信息列表
       */
    *fetchCourseList(
      { payload }: { type: string; payload: { teacherId: string } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(services.fetchCourseList, payload.teacherId);

      const { data: { list } } = response;
      const courseIdDataSource = list.map((item: any) => ({
        label: item.courseName,
        value: item.courseId
      }));

      yield put({
        type: 'saveCourseIdDataSource',
        payload: {
          data: courseIdDataSource,
        },
      });
    },

    /**
     * 获取该课程下的所有题目（包括四种题型）
     */
    *fetchCourseQuestionLib(
      { payload }: { type: string, payload: { courseId: number } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(
        teacherHomeworkEditService.fetchCourseQuestionList,
        payload.courseId
      );

      const { list } = response;

      yield put({
        type: 'changeQuestionList',
        payload: {
          questionList: list
        }
      });
    },
    /**
     * 获取已存在的作业信息
     */
    *fetchTeacherHomeworkDetail(
      { payload }: { type: string, payload: { homeworkId: number } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(
        teacherHomeworkEditService.fetchTeacherHomeworkDetail,
        payload.homeworkId
      );
      const { homework: { homeworkQuestionList, ...homeworkFormFields } } = response.data;
      const newHomeworkFormFields = {
        ...homeworkFormFields,
        startAt: moment(homeworkFormFields.startAt, 'YYYY-MM-DD HH:mm:ss'),
        endAt: moment(homeworkFormFields.endAt, 'YYYY-MM-DD HH:mm:ss')
      };

      yield put({
        type: 'changeTeacherHomeworkFormFields',
        payload: {
          data: newHomeworkFormFields
        }
      });
      const targetKeys = homeworkQuestionList.map((item: any) => String(item));
      console.log(targetKeys);
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
      return history.listen(
        ({ pathname, query }: { pathname: string, query: { homeworkId: number } }) => {
          if (pathname === '/teacher/homework/create' || pathname === '/teacher/homework/edit') {
            dispatch({
              type: 'initState',
              payload: {
                state: initState
              }
            });

            const userInfo = userUtils.getUserInfo();
            if (Object.keys(userInfo).length !== 0) {
              dispatch({
                type: 'fetchCourseList',
                payload: {
                  teacherId: userInfo.teacherId
                }
              });
            }

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
