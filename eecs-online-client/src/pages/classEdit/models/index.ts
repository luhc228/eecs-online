import { Reducer } from 'redux';
import { Dispatch, EffectsCommandMap } from 'dva';
import router from 'umi/router';
import { Effect } from '@/interfaces/reduxState';
import * as classEditService from '../services';
import { StudentDetailModel, ClassDetailFields } from '@/interfaces/classEdit';
import showNotification from '@/utils/showNotification';
import { NOTIFICATION_TYPE } from '@/enums';

export interface StateType {
  when: boolean;
  studentList: StudentDetailModel[];
  targetKeys: string[];
  classDetailFields: ClassDetailFields;
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
  targetKeys: [],
  classDetailFields: {},
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
      { payload: { targetKeys } }: { payload: { targetKeys: string[] } }
    ) {
      return { ...state, targetKeys }
    },

    changeClassDetailFields(
      state: StateType,
      { payload }: { payload: { data: { className: string } } }
    ) {
      return {
        ...state,
        classDetailFields: payload.data
      }
    },

    changePromptStatus(
      state: StateType,
      { payload }: { type: string; payload: { when: boolean } }
    ) {
      return { ...state, when: payload.when }
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
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(classEditService.createClass, payload.data);
      const { success } = response;
      if (success) {
        yield put({
          type: 'changePromptStatus',
          payload: {
            when: false,
          },
        })
        showNotification('通知', '新增班级信息成功', NOTIFICATION_TYPE.success);
        router.goBack();
      }
    },

    /**
     * 更新班级信息
     */
    *updateClass(
      { payload }: { type: string, payload: { data: any } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(classEditService.updateClass, payload.data);
      const { success } = response;
      if (success) {
        yield put({
          type: 'changePromptStatus',
          payload: {
            when: false,
          },
        })
        showNotification('通知', '更新班级信息成功', NOTIFICATION_TYPE.success);
        router.goBack();
      }
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
