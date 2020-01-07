import { Reducer } from 'redux';
import router from 'umi/router';
import { EffectsCommandMap, Dispatch } from 'dva';
import { TeacherInfoFieldsModel } from '@/interfaces/teacherInfo';
import * as teacherInfoService from '../services';
import { Effect } from '@/interfaces/reduxState';
import { fetchCollegeList } from '@/services';
import userUtils from '@/utils/user-utils';
import { SelectComponentDatasourceModel } from '@/interfaces/components';

export interface StateType {
  teacherInfoFields: TeacherInfoFieldsModel;
  when: boolean;
  collegeIdDataSource: SelectComponentDatasourceModel[];
}

const initState = {
  teacherInfoFields: userUtils.getUserInfo(),
  // {
  //   teacherId: undefined,
  //   teacherName: undefined,
  //   teacherGender: undefined,
  //   teacherCollege: undefined,
  // },
  when: true,
  collegeIdDataSource: [],
};

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    changeTeacherInfoFields: Reducer<StateType>;
    changePromptStatus: Reducer<StateType>;
  };
  effects: {
    updateTeacherInfo: Effect<StateType>;
  };
}

const Model = {
  namespace: 'teacherInfo',

  state: initState,

  reducers: {
    initState(state: StateType, { payload }: { type: string; payload: { state: StateType } }) {
      return { ...payload.state };
    },

    changeTeacherInfoFields(
      state: StateType,
      { payload }: { type: string; payload: { data: TeacherInfoFieldsModel } },
    ) {
      console.log(payload.data);
      return {
        ...state,
        teacherInfoFields: payload.data,
        when: true,
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
  },

  effects: {
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
        value: item.collegeId,
      }));
      // console.log(collegeIdDataSource);

      yield put({
        type: 'saveCollegeIdDataSource',
        payload: {
          data: collegeIdDataSource,
        },
      });
    },

    /**
     * 更新课程信息
     */
    *updateTeacherInfo(
      { payload }: { type: string; payload: { data: TeacherInfoFieldsModel } },
      { call, put }: EffectsCommandMap,
    ) {
      yield call(teacherInfoService.updateTeacherInfo, payload.data);
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
        if (pathname === '/teacher/userInfo') {
          dispatch({
            type: 'initState',
            payload: {
              state: initState,
            },
          });

          const userInfo = userUtils.getUserInfo();
          if (Object.keys(userInfo).length !== 0) {
            dispatch({
              type: 'fetchCollegeList',
              payload: {},
            });
          }
        }
      });
    },
  },
};

export default Model;
