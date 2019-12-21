import { EffectsCommandMap } from 'dva';
import * as studentHomeworkService from '../services';
import { TableData, FilterFieldsModel, StudentHomeworkPaginationProps } from '@/interfaces/studentHomework';
import { DEFAULT_TABLE_PAGINATION_STATE } from '@/constants';
import { HOMEWORK_STATUS } from '@/enums';

export interface StateType {
  data: TableData;
  filterFields: FilterFieldsModel;
}

const studentHomeworkModel = {
  namespace: 'studentHomework',

  state: {
    data: DEFAULT_TABLE_PAGINATION_STATE,
    filterFields: {
      // 作业状态
      status: '1',
      // 课程id
      courseId: undefined,
    },
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
      { payload }: { payload: { type: string, filterFields: FilterFieldsModel } }
    ) {
      return { ...state, filterFields: payload.filterFields }
    },
  },

  effects: {
    /**
* 获取题库信息分页
* 包括信息筛选
*/
    *fetchStudentHomeworkPagination(
      { payload }: { type: string; payload: { data: StudentHomeworkPaginationProps } },
      { put, call }: EffectsCommandMap
    ) {
      const response = yield call(studentHomeworkService.fetchStudentHomeworkPagination, payload.data);
      const { data } = response;
      yield put({
        type: 'save',
        payload: {
          data,
        },
      })
    },
  }
}

export default studentHomeworkModel;
