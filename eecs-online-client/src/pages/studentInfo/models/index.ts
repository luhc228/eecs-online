import { Reducer } from 'redux';
import router from 'umi/router';
import { EffectsCommandMap, Dispatch } from 'dva';
import { StudentInfoFieldsModel } from '@/interfaces/studentInfo';
import * as studentInfoService from '../services';
import { Effect } from '@/interfaces/reduxState';
import { fetchCollegeList, fetchClassList } from '@/services';
import userUtils from '@/utils/user-utils';
import { SelectComponentDatasourceModel } from '@/interfaces/components';

export interface StateType {
  studentInfoFields: StudentInfoFieldsModel;
  // password: string;
  when: boolean;
  collegeIdDataSource: SelectComponentDatasourceModel[];
  classIdDataSource: SelectComponentDatasourceModel[];
}

const initState = {
  // studentInfoFields: userUtils.getUserInfo(),
  studentInfoFields: {
    studentId: '',
    studentName: '',
    studentGender: '',
    studentCollege: '',
    studentClass: '',
  },
  when: true,
  collegeIdDataSource: [],
  classIdDataSource: [],
};

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    changeStudentInfoFields: Reducer<StateType>;
    fetchStudentInfoFields: Reducer<StateType>;
    changePromptStatus: Reducer<StateType>;
  };
  effects: {
    updateStudentInfo: Effect<StateType>;
    fetchInfoFields: Effect<StateType>;
  };
}

const Model = {
  namespace: 'studentInfo',

  state: initState,

  reducers: {
    initState(state: StateType, { payload }: { type: string; payload: { state: StateType } }) {
      return { ...payload.state };
    },

    changeStudentInfoFields(
      state: StateType,
      { payload }: { type: string; payload: { data: StudentInfoFieldsModel } },
    ) {
      // console.log(payload.data);
      return {
        ...state,
        studentInfoFields: payload.data,
        when: true,
      };
    },

    fetchStudentInfoFields(
      state: StateType,
      { payload }: { type: string; payload: { data: StudentInfoFieldsModel } },
    ) {
      // console.log(payload.data);
      return {
        ...state,
        studentInfoFields: payload.data,
      };
    },

    changePromptStatus(
      state: StateType,
      { payload }: { type: string; payload: { when: boolean } },
    ) {
      return { ...state, when: payload.when };
    },

    saveCollegeIdDataSource(
      state: StateType,
      { payload }: { type: string; payload: { data: SelectComponentDatasourceModel[] } },
    ) {
      console.log(payload.data);
      return { ...state, collegeIdDataSource: payload.data };
    },

    saveClassIdDataSource(
      state: StateType,
      { payload }: { type: string; payload: { data: SelectComponentDatasourceModel[] } },
    ) {
      console.log(payload.data);
      return { ...state, classIdDataSource: payload.data };
    },
  },

  effects: {
    *fetchInfoFields(
      { payload }: { type: string; payload: { data: StudentInfoFieldsModel } },
      { call, put }: EffectsCommandMap,
    ) {
      const response = yield call(studentInfoService.fetchStudentInfo, payload.data);
      const { data } = response;
      console.log('data', data);
      yield put({
        type: 'fetchStudentInfoFields',
        payload: {
          data,
        },
      });
    },

    *fetchClassList({ payload }: { type: string; payload: {} }, { call, put }: EffectsCommandMap) {
      const response = yield call(fetchClassList, payload);
      if (!response) {
        return;
      }
      const {
        data: { list },
      } = response;
      const classIdDataSource = list.map((item: any) => ({
        label: item.class,
        value: item.class,
      }));

      yield put({
        type: 'saveClassIdDataSource',
        payload: {
          data: classIdDataSource,
        },
      });
    },

    *fetchCollegeList(
      { payload }: { type: string; payload: {} },
      { call, put }: EffectsCommandMap,
    ) {
      const response = yield call(fetchCollegeList, payload);
      if (!response) {
        return;
      }
      const {
        data: { list },
      } = response;
      const collegeIdDataSource = list.map((item: any) => ({
        label: item.college,
        value: item.college,
      }));

      yield put({
        type: 'saveCollegeIdDataSource',
        payload: {
          data: collegeIdDataSource,
        },
      });
    },

    /**
     * 更新学生信息
     */
    *updateStudentInfo(
      { payload }: { type: string; payload: { data: StudentInfoFieldsModel } },
      { call, put }: EffectsCommandMap,
    ) {
      yield call(studentInfoService.updateStudentInfo, payload.data);
      yield put({
        type: 'changePromptStatus',
        payload: {
          when: false,
        },
      });
      router.goBack();
    },
  },

  subscriptions: {
    setup({ dispatch, history }: { dispatch: Dispatch<any>; history: any }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/student/userInfo') {
          dispatch({
            type: 'initState',
            payload: {
              state: initState,
            },
          });

          const studentInfo = userUtils.getUserInfo();
          const { studentInfoFields } = initState;
          studentInfoFields.studentId = studentInfo.studentId;
          studentInfoFields.studentName = studentInfo.studentName;
          if (Object.keys(studentInfo).length !== 0) {
            // console.log(studentInfo);
            console.log('studentInfoFields', initState.studentInfoFields);
            dispatch({
              type: 'fetchInfoFields',
              // payload: { ...initState.studentInfoFields },
              payload: {
                data: studentInfoFields,
              },
            });
            dispatch({
              type: 'fetchCollegeList',
              payload: {},
            });
            dispatch({
              type: 'fetchClassList',
              payload: {},
            });
          }
        }
      });
    },
  },
};

export default Model;
