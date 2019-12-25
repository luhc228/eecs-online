import { EffectsCommandMap } from 'dva';
import { Dispatch } from 'redux';
import { TableData, FilterFieldsModel, TablePaginationModel } from '@/interfaces/questionLib';
import * as questionLibService from '../services';
import { QUESTION_TYPE } from '@/enums';
import { DEFAULT_TABLE_PAGINATION_STATE } from '@/constants';
import userUtils from '@/utils/user-utils';
import { fetchCourseList } from '@/services';
import { SelectComponentDatasourceModel } from '@/interfaces/components';

export interface StateType {
  data: TableData;
  filterFields: FilterFieldsModel;
  currentTabKey: QUESTION_TYPE;
  courseIdDataSource: SelectComponentDatasourceModel[]
}

const questionLibModel = {
  namespace: 'questionLib',

  state: {
    data: DEFAULT_TABLE_PAGINATION_STATE,
    filterFields: {
      content: undefined
    },
    currentTabKey: QUESTION_TYPE.Single,
    courseIdDataSource: []
  },

  reducers: {
    saveCourseIdDataSource(
      state: StateType,
      { payload }: { type: string; payload: { data: SelectComponentDatasourceModel[] } }
    ) {
      return { ...state, courseIdDataSource: payload.data }
    },

    save(
      state: StateType,
      { payload }: { type: string; payload: { data: TableData } }
    ) {
      return { ...state, data: payload.data }
    },

    changeFilterFields(
      state: StateType,
      { payload }: { payload: { type: string, filterFields: FilterFieldsModel } }
    ) {
      console.log(payload.filterFields);
      return { ...state, filterFields: payload.filterFields }
    },

    changecurrentTabKey(
      state: StateType,
      { payload }: { payload: { type: string, currentTabKey: QUESTION_TYPE } }
    ) {
      return { ...state, currentTabKey: payload.currentTabKey }
    },
  },

  effects: {
    /**
    * 获取所有课程信息
    */
    *fetchCourseList(
      { payload }: { type: string; payload: { teacherId: string } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(fetchCourseList, payload.teacherId);
      if (!response) {
        return;
      }

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

      yield put({
        type: 'changeFilterFields',
        payload: {
          filterFields: {
            courseId: courseIdDataSource[0].value
          },
        },
      });
    },

    /**
    * 获取题库信息分页
    * 包括信息筛选
    */
    *fetchQuestionLibPagination(
      { payload }: { type: string; payload: { data: TablePaginationModel } },
      { put, call }: EffectsCommandMap
    ) {
      const response = yield call(questionLibService.fetchQuestionLibPagination, payload.data);
      console.log(response);
      const { data } = response;
      yield put({
        type: 'save',
        payload: {
          data,
        },
      })
    },

    /**
     * 删除某条题目
     */
    *removeQuestion(
      { payload }: { type: string; payload: { id: string } },
      { put, call, select }: EffectsCommandMap
    ) {
      yield call(questionLibService.removeQuestion, payload.id);

      const paginationData = yield select((state: any) => {
        const { questionLib: { data, filterFields } } = state;
        const { page, pageSize } = data;
        return {
          page,
          pageSize,
          ...filterFields,
        }
      });

      yield put({
        type: 'fetchQuestionLibPagination',
        payload: {
          data: paginationData
        },
      })
    }
  },

  subscriptions: {
    setup(
      { dispatch }: { dispatch: Dispatch<any> }
    ) {
      const userInfo = userUtils.getUserInfo();
      if (Object.keys(userInfo).length !== 0) {
        dispatch({
          type: 'fetchCourseList',
          payload: {
            teacherId: userInfo.teacherId
          }
        })
      }
    },
  }
}

export default questionLibModel;
