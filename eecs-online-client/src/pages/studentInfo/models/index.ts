import { Reducer, AnyAction } from 'redux';
import { Effect } from '@/interfaces/reduxState';
import * as service from '../services';
import { StudentUserForm } from '@/interfaces/studentInfo';
import { ViewItemType } from '../components/collegeClass';

export interface StateType {
  user?: Partial<StudentUserForm>;
  college?: ViewItemType[];
  studentClass?: ViewItemType[];
  loading?: boolean;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchCurrent: Effect<StateType>;
    // fetch: Effect;
    fecthCollege: Effect<StateType>;
    fetchStudentClass: Effect<StateType>;
  };
  reducers: {
    save: Reducer<StateType>;
    setCollege: Reducer<StateType>;
    setStudentClass: Reducer<StateType>;
    changeLoading: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'studentInfo',

  state: {
    user: {},
    college: [],
    studentClass: [],
    loading: false,
  },

  reducers: {
    save(state: any, action: AnyAction) {
      return {
        ...state,
        user: action.payload || {},
      };
    },
    setCollege(state: any, action: AnyAction) {
      return {
        ...state,
        college: action.payload,
      };
    },
    setStudentClass(state: any, action: AnyAction) {
      return {
        ...state,
        studentClass: action.payload,
      };
    },
    changeLoading(state: any, action: AnyAction) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },

  effects: {
    // *fetch(_: any, { call, put }: any) {
    //   const response = yield call(service.queryUsers);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },

    *fetchCurrent(_: any, { call, put }: any) {
      const response = yield call(service.queryCurrent);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fecthCollege(_: any, { call, put }: any) {
      // yield put({
      //   type: 'changeLoading',
      //   payload: true,
      // });
      const response = yield call(service.queryCollege);
      console.log('response', response.data.list);
      yield put({
        type: 'setCollege',
        payload: response,
      });
    },

    *fetchStudentClass(_: any, { call, put }: any) {
      const { response } = yield call(service.queryCollege);
      yield put({
        type: 'setStudentClass',
        payload: { response },
      });
    },
  },
};

export default Model;
