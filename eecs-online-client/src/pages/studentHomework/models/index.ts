import { EffectsCommandMap, Dispatch } from 'dva';
import * as studentHomeworkService from '../services';
import { TableData, FilterFieldsModel, StudentHomeworkPaginationProps } from '@/interfaces/studentHomework';
import { DEFAULT_TABLE_PAGINATION_STATE } from '@/constants';
import { HOMEWORK_STATUS } from '@/enums';
import { SelectComponentDatasourceModel } from '@/interfaces/components';
import userUtils from '@/utils/user-utils';
import { fetchCourseList } from '@/services';

export interface StateType {
  data: TableData;
  filterFields: FilterFieldsModel;
  courseIdDataSource: SelectComponentDatasourceModel[];
}

const studentHomeworkModel = {
  namespace: 'studentHomework',

  state: {
    data: DEFAULT_TABLE_PAGINATION_STATE,
    filterFields: {
      // 作业状态
      status: HOMEWORK_STATUS.Undone,
      // 课程id
      courseId: undefined,
    },
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
      return { ...state, filterFields: payload.filterFields }
    },
  },

  effects: {
    /**
* 获取所有课程信息
*/
    *fetchCourseList(
      { payload }: { type: string; payload: { studentId: string } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(fetchCourseList, undefined, payload.studentId);

      const { data: { list }, success } = response;
      if (!success) {
        return;
      }
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
    * 获取题库信息分页
    * 包括信息筛选
    */
    *fetchStudentHomeworkPagination(
      { payload }: { type: string; payload: { data: StudentHomeworkPaginationProps } },
      { put, call }: EffectsCommandMap
    ) {
      const response = yield call(
        studentHomeworkService.fetchStudentHomeworkPagination,
        payload.data
      );
      const { data } = response;
      yield put({
        type: 'save',
        payload: {
          data,
        },
      })
    },
  },

  subscriptions: {
    setup(
      { dispatch, history }: { dispatch: Dispatch<any>, history: any }
    ) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/student/homework') {
          const userInfo = userUtils.getUserInfo();

          if (Object.keys(userInfo).length !== 0) {
            dispatch({
              type: 'fetchCourseList',
              payload: {
                studentId: userInfo.studentId
              }
            })
          }
        }
      })
    },
  }
}

export default studentHomeworkModel;
