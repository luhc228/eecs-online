import { Model, EffectsCommandMap } from 'dva';
import { TableData, FilterFieldsModel, TablePaginationModel } from '@/interfaces/questionLib';
import * as questionLibService from '../services';

export interface StateType {
  data: TableData;
  filterFields: FilterFieldsModel;
}

const QuestionLibModel: Model = {
  namespace: 'questionLib',

  state: {
    data: {
      list: [],
      total: 0,
      page: 1,
      pageSize: 8,
    },
    filterFields: {
      content: undefined
    },

    reducers: {
      save(
        state: StateType,
        { payload }: { type: string; payload: { data: TableData } }
      ) {
        return { ...state, data: payload.data }
      },

      changeFilterFields(
        state: StateType,
        { payload }: { type: string; payload: { filterFields: FilterFieldsModel } }
      ) {
        return { ...state, filterFields: payload.filterFields }
      }
    },

    effects: {
      /**
      * 获取题库信息分页
      * 包括信息筛选
      */
      *fetchQuestionLibPagination(
        { payload }: { type: string; payload: { data: TablePaginationModel } },
        { put, call }: EffectsCommandMap
      ) {
        const response = yield call(questionLibService.fetchQuestionLibPagination, payload);
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

        const page = yield select((state: any) => {
          const { questionLib: { data } } = state;
          return data.page
        });

        yield put({
          type: 'fetchQuestionLibPagination',
          payload: {
            data: { page }
          },
        })
      }
    }
  }
}

export default QuestionLibModel;
