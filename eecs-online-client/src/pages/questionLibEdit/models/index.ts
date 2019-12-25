import { EffectsCommandMap, Dispatch } from 'dva';
import router from 'umi/router';
import { SelectComponentDatasourceModel } from '@/interfaces/components';
import userUtils from '@/utils/user-utils';
import { fetchCourseList } from '@/services';
import * as questionLibEditServices from '../services';
import { QuestionFieldsModel } from '@/interfaces/questionLibEdit';

export interface StateType {
  questionFields: QuestionFieldsModel;
  when: boolean;
  courseIdDataSource: SelectComponentDatasourceModel[];
}

const questionLibEdit = {
  namespace: 'questionLibEdit',

  state: {
    questionFields: {},
    when: true,
    courseIdDataSource: [],
  },

  reducers: {
    saveCourseIdDataSource(
      state: StateType,
      { payload }: { type: string; payload: { data: SelectComponentDatasourceModel[] } }
    ) {
      return { ...state, courseIdDataSource: payload.data }
    },

    changePromptStatus(
      state: StateType,
      { payload }: { type: string; payload: { when: boolean } }
    ) {
      return { ...state, when: payload.when }
    },

    changeQuestionFields(
      state: StateType,
      { payload }: { type: string; payload: { data: QuestionFieldsModel } }
    ) {
      console.log('QuestionFields Change：', payload.data);

      return {
        ...state,
        questionFields: payload.data,
        when: true,
      }
    }
  },

  effects: {
    /**
    * 获取所有课程信息列表
    */
    *fetchCourseList(
      { payload }: { type: string; payload: { teacherId: string } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(fetchCourseList, payload.teacherId);

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
    * 新增试题(Create)
    */
    *createQuestion(
      { payload }: { type: string; payload: { data: QuestionFieldsModel } },
      { call, put }: EffectsCommandMap
    ) {
      yield call(questionLibEditServices.createQuestion, payload.data);
      yield put({
        type: 'changePromptStatus',
        payload: {
          when: false,
        },
      })
      router.goBack();
    },

    /**
     * 更新试题
     */
    *updateQuestion(
      { payload }: { type: string; payload: { data: QuestionFieldsModel } },
      { call, put }: EffectsCommandMap
    ) {
      yield call(questionLibEditServices.updateQuestion, payload.data);
      yield put({
        type: 'changePromptStatus',
        payload: {
          when: false,
        },
      })
      router.goBack();
    },
  },

  subscriptions: {
    setup(
      { dispatch, history }: { dispatch: Dispatch<any>, history: any }
    ) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/teacher/question-lib/create' ||
          pathname === '/teacher/question-lib/edit') {
          const userInfo = userUtils.getUserInfo();
          if (Object.keys(userInfo).length !== 0) {
            dispatch({
              type: 'fetchCourseList',
              payload: {
                teacherId: userInfo.teacherId
              }
            });
          }
        }
      });
    },
  }
}

export default questionLibEdit;
