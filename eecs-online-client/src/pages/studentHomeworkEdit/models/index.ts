import { EffectsCommandMap, Dispatch } from 'dva';
import router from 'umi/router';
import * as services from '../services';
import userUtils from '@/utils/user-utils';
import { HomeworkDetail, HomeworkListItem, AnswerList } from '@/interfaces/studentHomeworkEdit';
import showNotification from '@/utils/showNotification';
import { NOTIFICATION_TYPE, QUESTION_TYPE } from '@/enums';
import { getPageQuery, removeEmpty } from '@/utils';

export interface StateType {
  data: HomeworkDetail;
  homeworkFields: any;
  when: boolean;
  singleQuestionFormIdMap: { [k: string]: number };
  multipleQuestionFormIdMap: { [k: string]: number };
  judgeQuestionFormIdMap: { [k: string]: number };
  programQuestionFormIdMap: { [k: string]: number };
  questionFormIdMap: { [k: string]: number };
}

const initState = {
  data: {
    total: 0,
    homeworkScore: undefined,
    homeowrkName: '',
    singleQuestionList: [],
    multipleQuestionList: [],
    judgeQuestionList: [],
    programQuestionList: [],
  },
  homeworkFields: {},
  when: true,
  // for example
  // { formId: questionid }
  singleQuestionFormIdMap: {},
  multipleQuestionFormIdMap: {},
  judgeQuestionFormIdMap: {},
  programQuestionFormIdMap: {},
  questionFormIdMap: {}
}

const studentHomeworkEdit = {
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
      const {
        singleQuestionFormIdMap,
        multipleQuestionFormIdMap,
        judgeQuestionFormIdMap,
        programQuestionFormIdMap,
        questionFormIdMap
      } = state;

      if (singleQuestionList && singleQuestionList.length) {
        singleQuestionList.forEach((item: HomeworkListItem) => {
          questionFormIdMap[`single${item.questionId}`] = item.questionId;
        })
      }

      if (multipleQuestionList && multipleQuestionList.length) {
        multipleQuestionList.forEach((item: HomeworkListItem) => {
          questionFormIdMap[`multiple${item.questionId}`] = item.questionId;
        })
      }

      if (judgeQuestionList && judgeQuestionList.length) {
        judgeQuestionList.forEach((item: HomeworkListItem) => {
          questionFormIdMap[`judge${item.questionId}`] = item.questionId;
        })
      }

      if (programQuestionList && programQuestionList.length) {
        programQuestionList.forEach((item: HomeworkListItem) => {
          questionFormIdMap[`program${item.questionId}`] = item.questionId;
        })
      }

      return {
        ...state,
        singleQuestionFormIdMap,
        multipleQuestionFormIdMap,
        judgeQuestionFormIdMap,
        programQuestionFormIdMap
      }
    },

    changePromptStatus(
      state: StateType,
      { payload }: { type: string; payload: { when: boolean } }
    ) {
      return { ...state, when: payload.when }
    },

    changeHomeworkFields(
      state: StateType,
      { payload }: { type: string; payload: { data: { [key: string]: any } } }
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
      const response = yield call(
        services.fetchHomeworkDetail,
        payload.homeworkId,
        payload.studentId
      );

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
    },

    /**
     * 获取学生暂存作业的情况
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
      const { list } = data;
      const submitAnswerField: { [k: string]: any } = {};

      if (list.length) {
        list.forEach((item: any) => {
          const {
            submitAnswer,
            questionType,
            questionId }: {
              submitAnswer: number | string;
              questionType: number,
              questionId: number
            } = item;
          if (submitAnswer && submitAnswer !== '') {
            let formatAnswer;
            if (typeof submitAnswer === 'string' && submitAnswer.includes('|')) {
              formatAnswer = submitAnswer.split('|');
            } else {
              formatAnswer = submitAnswer;
            }
            submitAnswerField[`${QUESTION_TYPE[questionType]}${questionId}`] = formatAnswer
          }
        })
      }

      yield put({
        type: 'changeHomeworkFields',
        payload: {
          data: submitAnswerField
        }
      })
    },
    /**
     * 暂存答案
     */
    *saveHomeworkAnswer(
      { payload }: {
        type: string;
        payload: {
          data: { [k: string]: string | string[] | number },
          questionFormIdMap: { [k: string]: number }
        }
      },
      { call }: EffectsCommandMap
    ) {
      const allFields = payload.data;
      const { questionFormIdMap } = payload;

      const pageQueryParams = getPageQuery();
      const userInfo = userUtils.getUserInfo();

      const { homeworkId } = pageQueryParams;
      const { studentId } = userInfo;

      let list: AnswerList[] = [];

      const values: { [k: string]: any } = removeEmpty(allFields);
      if (Object.keys(values).length) {
        list = Object.entries(values).map((field) => {
          const [key, value] = field;
          const questionId = questionFormIdMap[key];
          let submitAnswer = value;
          if (Array.isArray(value)) {
            submitAnswer = value.join('|');
          }

          return {
            questionId,
            submitAnswer,
          }
        })
      }

      const response = yield call(
        services.saveAnswer,
        {
          homeworkId,
          studentId,
          list,
        }
      );

      const { success } = response;
      if (success) {
        showNotification('通知', '暂存答案成功', NOTIFICATION_TYPE.success)
      }
    },

    /**
     * 提交答案
     */
    *submitHomeworkAnswer(
      { payload }: {
        type: string;
        payload: {
          data: { [k: string]: string | string[] | number },
          questionFormIdMap: { [k: string]: number }
        }
      },
      { call, put }: EffectsCommandMap
    ) {
      const allFields = payload.data;
      const { questionFormIdMap } = payload;

      const pageQueryParams = getPageQuery();
      const userInfo = userUtils.getUserInfo();

      const { homeworkId } = pageQueryParams;
      const { studentId } = userInfo;

      let list: AnswerList[] = [];

      const values: { [k: string]: any } = removeEmpty(allFields);
      if (Object.keys(values).length) {
        list = Object.entries(values).map((field) => {
          const [key, value] = field;
          const questionId = questionFormIdMap[key];
          let submitAnswer = value;
          if (Array.isArray(value)) {
            submitAnswer = value.join('|');
          }

          return {
            questionId,
            submitAnswer,
          }
        })
      }

      const response = yield call(
        services.submitAnswer,
        {
          homeworkId,
          studentId,
          list,
        }
      );

      const { success } = response;
      if (success) {
        yield put({
          type: 'changePromptStatus',
          payload: {
            when: false,
          },
        })
        showNotification('通知', '提交答案成功', NOTIFICATION_TYPE.success);
        router.goBack();
      }
    },
  },

  subscriptions: {
    setup(
      { dispatch, history }: { dispatch: Dispatch<any>, history: any }
    ) {
      return history.listen((
        { pathname, query }: { pathname: string, query: { [k: string]: string } }) => {
        if (pathname === '/student/homework/edit') {
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
              type: 'fetchHomeworkDetail',
              payload: {
                homeworkId,
                studentId
              }
            });

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

export default studentHomeworkEdit;
