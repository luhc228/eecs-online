import { Reducer } from 'redux';
import { Dispatch, EffectsCommandMap } from 'dva';
import { Effect } from '@/interfaces/reduxState';
import * as classEditService from '../services';
import { StudentDetailModel } from '@/interfaces/classEdit';

export interface StateType {
  studentList: StudentDetailModel[];
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

const initState = {
  studentList: [],
}

const Model = {
  namespace: 'classEdit',

  state: initState,

  reducers: {
    initState(
      _: StateType,
      { payload }: { type: string; payload: { state: StateType } }
    ) {
      return { ...payload.state }
    },

    changeStudentList(
      state: StateType,
      { payload: { studentList } }: { payload: { studentList: StudentDetailModel[] } }) {
      return { ...state, studentList }
    },

    changeTargetKeys(
      state: StateType,
      { payload: { nextTargetKeys } }: { payload: { nextTargetKeys: string[] } }
    ) {
      return { ...state, targetKeys: nextTargetKeys }
    },

  },

  effects: {
    /**
     * 获取所有学生详情
     */
    *fetchStudentDetail(
      { payload }: { type: string, payload: { values: any } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(classEditService.fetchStudentDetail, payload.values);
      const { data } = response;
      const { list } = data;


      yield put({
        type: 'changeStudentList',
        payload: {
          studentList: list,
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
    *createClass(
      { payload }: { type: string, payload: { data: any } },
      { call }: EffectsCommandMap
    ) {
      yield call(classEditService.createClass, payload.data);
    },

    /**
     * 更新班级信息
     */
    *updateClass(
      { payload }: { type: string, payload: { data: any } },
      { call }: EffectsCommandMap
    ) {
      yield call(classEditService.updateClass, payload.data);
    },
  },

  subscriptions: {
    setup({ dispatch, history }: { dispatch: Dispatch<any>, history: any }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/teacher/class/create' || pathname === '/teacher/class/edit') {
          dispatch({
            type: 'initState',
            payload: {
              state: initState
            }
          });

          dispatch({
            type: 'fetchStudentDetail',
            payload: {
              values: {}
            }
          })
        }
      })
    },
  },
}
export default Model;
