import { Reducer } from 'redux';
import router from 'umi/router';
import { Dispatch } from 'dva';
import * as classEditService from '../services';
import { StudentDetailModel } from '@/interfaces/class';

export interface StateType {
  classDetail: any;
  when: boolean;
  studentList: StudentDetailModel[]
}

export interface ModelType {
  namespace: string;

  state: StateType;

  subscriptions: {
    setup: ({ dispatch, history }: { dispatch: any, history: any }) => void;
  }
}

const Model = {
  namespace: 'classEdit',

  state: {
    classFields: {},
    when: true,
    studentList: [],
  },

  reducers: {
    changeStudentList(state: StateType, { payload: { studentList } }: any) {
      return { ...state, studentList }
    },
  },

  effects: {
    /**
     * 新增班级信息
     */
    *createClass({ payload }: any, { call, put }: any) {
      yield call(classEditService.createClass, payload);
    },

    /**
     * 更新班级信息
     */
    *updateClass({ payload }: any, { call, put }: any) {
      yield call(classEditService.updateClass, payload);
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
      })
    },
  },

  subscriptions: {
    setup({ dispatch, history }: { dispatch: Dispatch<any>, history: History }) {
      // return history.listen(({ pathname }: { pathname: string }) => {
      //   if (pathname !== '/login') {
      //     const currentUser: CurrentUserModels = userUtils.getUserInfo();
      //     dispatch({ type: 'save', payload: { currentUser } });
      //   }
      // });
      console.log(123123123213)
      const payload = { studentClass: '通信一班', college: '信息科学与工程学院' }
      dispatch({
        type: 'fetchStudentDetail',
        payload,
      })
    },
  },
}


export default Model;
