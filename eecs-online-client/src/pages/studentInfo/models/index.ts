import { Effect } from 'dva';
import { Reducer, AnyAction } from 'redux';
import * as service from '../services';
import { StudentUserForm } from '@/interfaces/studentInfo';
import { ViewItemType } from '../components';

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
        // fetchCurrent: Effect;
        fetch: Effect;
        fecthCollege: Effect;
        fetchStudentClass: Effect;
    };
    reducers: {
        saveCurrentUser: Reducer<StateType>;
        setCollege: Reducer<StateType>;
        setStudentClass: Reducer<StateType>;
        changeLoading: Reducer<StateType>
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
      saveCurrentUser(state:any, action:AnyAction) {
        return {
          ...state,
          currentUser: action.payload || {},
        };
      },
      setCollege(state:any, action:AnyAction) {
        return {
          ...state,
          college: action.payload,
        };
      },
      setStudentClass(state:any, action:AnyAction) {
        return {
          ...state,
          studentClass: action.payload,
        };
      },
      changeLoading(state:any, action:AnyAction) {
        return {
          ...state,
          loading: action.payload,
        };
      },
    },

    effects: {
        *fetch(_: any, { call, put }: any) {
            const response = yield call(service.queryUsers);
            yield put({
                type: 'save',
                payload: response,
            });
        },

        // *fetchCurrent(_:any, { call, put }:any) {
        //     const response = yield call(service.queryCurrent);
        //     yield put({
        //         type: 'saveCurrentUser',
        //         payload: response,
        //     });
        // },

        *fecthCollege(_:any, { call, put }:any) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const response = yield call(service.queryCollege);
            yield put({
                type: 'setCollege',
                payload: response,
            });
        },

        *fetchStudentClass(_:any, { call, put }:any) {
            const { response } = yield call(service.queryCollege);
            yield put({
                type: 'setStudentClass',
                payload: { response },
            })
        },
    },
}

export default Model
