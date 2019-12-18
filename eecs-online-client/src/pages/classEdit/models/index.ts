import { Reducer } from 'redux';
import { Dispatch } from 'dva';
import { Effect } from '@/interfaces/reduxState';
import * as classEditService from '../services';
import { StudentDetailModel } from '@/interfaces/class';
import { SelectComponentDatasourceModel } from '@/interfaces/components';

export interface collegeListItem extends SelectComponentDatasourceModel {
  children: SelectComponentDatasourceModel[]
}

export interface StateType {
  classFields: object;
  when: boolean;
  studentList: StudentDetailModel[];
  targetKeys: string[];
  collegeList: collegeListItem[];
  tableFilterValue: [string, string];
}

export interface ModelType {
  namespace: string;

  state: StateType;

  reducers: {
    changeStudentList: Reducer<any>;
    changeOriginTargetKeys: Reducer<any>;
  };
  effects: {
    createClass: Effect<StateType>,
    updateClass: Effect<StateType>,
    fetchStudentDetail: Effect<StateType>,
    fetchCollegeList: Effect<StateType>,
  };

  subscriptions: {
    setup: ({ dispatch }: { dispatch: Dispatch<any> }) => void;
  }
}

// @ts-ignore
const Model: ModelType = {
  namespace: 'classEdit',

  state: {
    classFields: {},
    when: true,
    studentList: [],
    targetKeys: [],
    collegeList: [],
    tableFilterValue: ['', ''],
  },

  reducers: {
    changeStudentList(
      state: StateType,
      { payload: { studentList } }: { payload: { studentList: StudentDetailModel[] } }) {
      return { ...state, studentList }
    },

    changeOriginTargetKeys(
      state: StateType,
      { payload: { studentList } }: { payload: { studentList: StudentDetailModel[] } }) {
      // TODO:
      const originTargetKeys: string[] = studentList.map((item: StudentDetailModel) => item.studentId);
      return { ...state, targetKeys: [] }
    },

    changeTargetKeys(state: StateType, { payload: { nextTargetKeys } }: { payload: { nextTargetKeys: string[] } }) {
      return { ...state, targetKeys: nextTargetKeys }
    },

    setCollegeList(state: StateType, { payload: { collegeList } }: { payload: { collegeList: SelectComponentDatasourceModel } }) {
      return { ...state, collegeList }
    },

    setTableFilterValue(state: StateType, { payload: { tableFilterValue } }: { payload: { tableFilterValue: [string, string] } }) {
      return { ...state, tableFilterValue }
    },
  },

  effects: {
    /**
     * 获取所有学院信息
     */
    * fetchCollegeList(_: any, { call, put }: any) {
      const response = yield call(classEditService.fetchCollegeList);
      const collegeList: collegeListItem[] = response.data.list;
      yield put({
        type: 'setCollegeList',
        payload: { collegeList },
      });

      let tableFilterValue: [string, string] = ['', ''];

      if (collegeList && !!collegeList.length) {
        tableFilterValue = [collegeList[0].value, collegeList[0].children[0].value]
      }

      yield put({
        type: 'setTableFilterValue',
        payload: {
          tableFilterValue,
        },
      });
    },

    /**
     * 获取所有学生详情
     */
    * fetchStudentDetail({ payload }: any, { call, put }: any) {
      const response = yield call(classEditService.fetchStudentDetail, payload);
      const studentList = response.data.list;
      console.log(studentList);
      yield put({
        type: 'changeStudentList',
        payload: {
          studentList,
        },
      });
      // yield put({
      //   type: 'changeOriginTargetKeys',
      //   payload: {
      //     studentList,
      //   },
      // })
    },

    /**
     * 新增班级信息
     */
    * createClass({ payload }: any, { call }: any) {
      yield call(classEditService.createClass, payload);
    },

    /**
     * 更新班级信息
     */
    * updateClass({ payload }: any, { call }: any) {
      yield call(classEditService.updateClass, payload);
    },
  },

  subscriptions: {
    setup({ dispatch }: { dispatch: Dispatch<any> }) {
      dispatch({
        type: 'fetchCollegeList',
      })
    },
  },
}
export default Model;
