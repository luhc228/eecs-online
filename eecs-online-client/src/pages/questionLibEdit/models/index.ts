import { EffectsCommandMap, Dispatch } from 'dva';
import router from 'umi/router';
import { SelectComponentDatasourceModel } from '@/interfaces/components';
import userUtils from '@/utils/user-utils';
import { fetchCourseList } from '@/services';
import * as questionLibEditServices from '../services';
import { QuestionFieldsModel } from '@/interfaces/questionLibEdit';
import { QUESTION_TYPE } from '@/enums';

export interface StateType {
  questionFields: QuestionFieldsModel;
  when: boolean;
  courseIdDataSource: SelectComponentDatasourceModel[];
  optionDisplay: boolean;
  dynamicKeys: number[];
}

const initState = {
  questionFields: {
    questionType: QUESTION_TYPE.judge,
  },
  when: true,
  courseIdDataSource: [],
  optionDisplay: false,
  dynamicKeys: undefined,
}

const questionLibEdit = {
  namespace: 'questionLibEdit',

  state: initState,

  reducers: {
    initState(
      _: StateType,
      { payload }: { type: string; payload: { state: StateType } }
    ) {
      return { ...payload.state }
    },

    setOptionsDisplay(
      state: StateType,
      { payload }: { type: string; payload: { optionDisplay: boolean } }
    ) {
      return {
        ...state,
        optionDisplay: payload.optionDisplay,
      }
    },

    changeDynamicKeys(
      state: StateType,
      { payload }: { type: string; payload: { dynamicKeys: number[] } }
    ) {
      return {
        ...state,
        dynamicKeys: payload.dynamicKeys,
      }
    },

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
      // let questionFields = { ...state.questionFields, ...payload.data };
      // // 传进来的fields是空的 需要做初始化
      // if (!Object.getOwnPropertyNames(payload.data).length) {
      //   questionFields = {
      //     questionType: QUESTION_TYPE.judge,
      //   } as QuestionFieldsModel;
      // }

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
     * 获取试题详情
     */
    *fetchQuestionDetail(
      { payload }: { type: string; payload: { questionId: number } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(questionLibEditServices.fetchQuestionDetail, payload.questionId);
      const { data } = response;
      const { answer, options }: { answer: string, options: string } = data;

      let newQuestionFields = data;
      if (answer) {
        const newAnswer = answer.includes('|') ? answer.split('|') : answer;
        newQuestionFields = {
          ...newQuestionFields,
          answer: newAnswer,
        }
      }

      if (options) {
        const optionsArray = options.split('|');

        yield put({
          type: 'changeDynamicKeys',
          payload: {
            dynamicKeys: [...new Array(optionsArray.length).keys()],
          },
        });

        yield put({
          type: 'setOptionsDisplay',
          payload: {
            optionDisplay: true
          },
        });

        optionsArray.forEach((item: string, index: number) => {
          newQuestionFields[`option${index}`] = item;
        })

        delete newQuestionFields.options;
      }
      yield put({
        type: 'changeQuestionFields',
        payload: {
          data: newQuestionFields,
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
      return history.listen(({ pathname, query }: { pathname: string, query: { [k: string]: string } }) => {
        if (pathname === '/teacher/question-lib/create' ||
          pathname === '/teacher/question-lib/edit') {
          const { questionId } = query;

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

          if (questionId) {
            dispatch({
              type: 'fetchQuestionDetail',
              payload: {
                questionId
              }
            });
          }
        }
      });
    },
  }
}

export default questionLibEdit;
