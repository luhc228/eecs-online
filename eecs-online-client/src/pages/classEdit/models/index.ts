import { Reducer } from 'redux';
import { Effect } from '@/interfaces/reduxState';
import { Dispatch } from 'dva';
import * as classEditService from '../services';
import { StudentDetailModel } from '@/interfaces/class';
import { SelectComponentDatasourceModel } from '@/interfaces/components';

export interface collegeListItem extends SelectComponentDatasourceModel {
  studentClassList: SelectComponentDatasourceModel[]
}

export interface StateType {
  classFields: object;
  when: boolean;
  studentList: StudentDetailModel[];
  targetKeys: string[];
  studentClassList: SelectComponentDatasourceModel[];
  collegeList: collegeListItem[];
  currentSelectedCollege?: string;
  currentSelectedStudentClass?: string;
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
    // fetchStudentClassList: Effect<StateType>,
  };

  subscriptions: {
    setup: ({ dispatch }: { dispatch: Dispatch<any> }) => void;
  }
}

const Model: ModelType = {
  namespace: 'classEdit',

  state: {
    classFields: {},
    when: true,
    studentList: [],
    targetKeys: [],
    collegeList: [],
    studentClassList: [],
    currentSelectedCollege: undefined,
    currentSelectedStudentClass: undefined,
  },

  reducers: {
    changeStudentList(state: StateType, { payload: { studentList } }: { payload: { studentList: StudentDetailModel[] } }) {
      return { ...state, studentList }
    },

    changeOriginTargetKeys(state: StateType, { payload: { studentList } }: { payload: { studentList: StudentDetailModel[] } }) {
      const originTargetKeys: string[] = studentList.map((item: StudentDetailModel) => item.studentId);
      return { ...state, targetKeys: originTargetKeys }
    },

    changeTargetKeys(state: StateType, { payload: { nextTargetKeys } }: { payload: { nextTargetKeys: string[] } }) {
      return { ...state, targetKeys: nextTargetKeys }
    },

    setCollegeList(state: StateType, { payload: { collegeList } }: { payload: { collegeList: SelectComponentDatasourceModel } }) {
      return { ...state, collegeList }
    },

    setStudentClassList(state: StateType, { payload: { studentClassList } }: { payload: { studentClassList: SelectComponentDatasourceModel } }) {
      return { ...state, studentClassList }
    },

    setCurrentSelectedCollege(state: StateType, { payload: { college } }: { payload: { college: string | number | undefined } }) {
      return { ...state, currentSelectedCollege: college }
    },

    setCurrentSelectedStudentClass(state: StateType, { payload: { studentClass } }: { payload: { studentClass: string | number | undefined } }) {
      return { ...state, currentSelectedStudentClass: studentClass }
    }
  },

  effects: {
    /**
     * 获取所有学院信息
     */
    *fetchCollegeList(_: any, { call, put }: any) {
      const response = yield call(classEditService.fetchCollegeList);
      const collegeList = response.data.list;
      yield put({
        type: 'setCollegeList',
        payload: { collegeList },
      });

      if (collegeList && !!collegeList.length) {
        yield put({
          type: 'setCurrentSelectedCollege',
          payload: {
            college: collegeList[0].value
          }
        });

        const currentStudentClassList = collegeList.find((item: collegeListItem) => item.value === collegeList[0].value)?.studentClassList;
        yield put({
          type: 'setStudentClassList',
          payload: {
            studentClassList: currentStudentClassList
          }
        });
        if (currentStudentClassList && !!currentStudentClassList.length) {
          yield put({
            type: 'setCurrentSelectedStudentClass',
            payload: {
              studentClass: currentStudentClassList[0].value
            }
          });
        }
      }
    },

    /**
     * 获取学生详情
     */
    *fetchStudentDetail({ payload }: any, { call, put }: any) {
      const response = yield call(classEditService.fetchStudentDetail, payload);
      const studentList = response.data.list;
      yield put({
        type: 'changeStudentList',
        payload: {
          studentList,
        },
      });
      yield put({
        type: 'changeOriginTargetKeys',
        payload: {
          studentList,
        },
      })
    },

    /**
    * 新增班级信息
    */
    *createClass({ payload }: any, { call }: any) {
      yield call(classEditService.createClass, payload);
    },

    /**
     * 更新班级信息
     */
    *updateClass({ payload }: any, { call }: any) {
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
