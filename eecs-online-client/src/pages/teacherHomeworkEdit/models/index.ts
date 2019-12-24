import { Reducer } from 'redux';
import { Dispatch } from 'dva';
import { Effect } from '@/interfaces/reduxState';
import * as teacherHomeworkEditService from '../services';
import { QuestionDetailModel } from '@/interfaces/teacherHomework';
import { SelectComponentDatasourceModel } from '@/interfaces/components';

export interface courseListItem extends SelectComponentDatasourceModel {
  children: SelectComponentDatasourceModel[];
}

export interface StateType {
  teacherHomeworkFields: object;
  when: boolean;
  questionList: QuestionDetailModel[];
  targetKeys: string[];
  courseList: courseListItem[];
  tableFilterValue: [string, string];
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
    fetchQuestionDetail: Effect<StateType>;
    fetchCourseList: Effect<StateType>;
  };

  subscriptions: {
    setup: ({ dispatch }: { dispatch: Dispatch<any> }) => void;
  };
}

const Model: ModelType = {
  namespace: 'teacherHomeworkEdit',

  state: {
    teacherHomeworkFields: {},
    when: true,
    questionList: [],
    targetKeys: [],
    courseList: [],
    tableFilterValue: ['', ''],
  },

  reducers: {
    changeQuestionList(
      state: StateType,
      { payload: { questionList } }: { payload: { questionList: QuestionDetailModel[] } },
    ) {
      return { ...state, questionList };
    },

    changeOriginTargetKeys(
      state: StateType,
      { payload: { questionList } }: { payload: { questionList: QuestionDetailModel[] } },
    ) {
      // TODO:
      const originTargetKeys: string[] = questionList.map(
        (item: QuestionDetailModel) => item.content,
      );
      return { ...state, targetKeys: [] };
    },

    changeTargetKeys(
      state: StateType,
      { payload: { nextTargetKeys } }: { payload: { nextTargetKeys: string[] } },
    ) {
      return { ...state, targetKeys: nextTargetKeys };
    },

    setCourseList(
      state: StateType,
      { payload: { courseList } }: { payload: { courseList: SelectComponentDatasourceModel } },
    ) {
      return { ...state, courseList };
    },

    setTableFilterValue(
      state: StateType,
      { payload: { tableFilterValue } }: { payload: { tableFilterValue: [string, string] } },
    ) {
      return { ...state, tableFilterValue };
    },
  },

  effects: {
    /**
     * 获取所有课程信息
     */
    *fetchCourseList(_: any, { call, put }: any) {
      const response = yield call(teacherHomeworkEditService.fetchCourseList);
      const courseList: courseListItem[] = response.data.list;
      yield put({
        type: 'setCourseList',
        payload: { courseList },
      });

      let tableFilterValue: [string, string] = ['', ''];

      if (courseList && !!courseList.length) {
        tableFilterValue = [courseList[0].value, courseList[0].children[0].value];
      }

      yield put({
        type: 'setTableFilterValue',
        payload: {
          tableFilterValue,
        },
      });
    },

    /**
     * 获取所有题目详情
     */
    *fetchQuestionDetail({ payload }: any, { call, put }: any) {
      const response = yield call(teacherHomeworkEditService.fetchQuestionDetail, payload);
      const questionList = response.data.list;
      console.log(questionList);
      yield put({
        type: 'changeQuestionList',
        payload: {
          questionList,
        },
      });
    },

    *createTeacherHomework({ payload }: any, { call }: any) {
      yield call(teacherHomeworkEditService.createTeacherHomework, payload);
    },

    *updateTeacherHomework({ payload }: any, { call }: any) {
      yield call(teacherHomeworkEditService.updateTeacherHomework, payload);
    },
  },

  subscriptions: {
    setup({ dispatch }: { dispatch: Dispatch<any> }) {
      dispatch({
        type: 'fetchCourseList',
      });
    },
  },
};
export default Model;
