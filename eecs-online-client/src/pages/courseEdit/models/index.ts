import { Reducer } from 'redux';
import router from 'umi/router';
import { EffectsCommandMap, Dispatch } from 'dva';
import * as courseEditService from '../services';
import { CourseFieldsModel } from '@/interfaces/courseEdit';
import { Effect } from '@/interfaces/reduxState';
import { fetchVirClassList } from '@/services';
import userUtils from '@/utils/user-utils';
import { SelectComponentDatasourceModel } from '@/interfaces/components';

export interface StateType {
  courseFields: CourseFieldsModel;
  when: boolean;
  classIdDataSource: SelectComponentDatasourceModel[];
}

<<<<<<< HEAD
const initState = {
  courseFields: {
    courseId: undefined,
    courseName: undefined,
    courseLocation: undefined,
    classId: [],
  },
  when: true,
  classIdDataSource: [],
}

=======
>>>>>>> teacher_modules
export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    changeCourseFields: Reducer<StateType>;
    changePromptStatus: Reducer<StateType>;
  };
  effects: {
    createCourse: Effect<StateType>,
    updateCourse: Effect<StateType>,
  };
}

const Model = {
  namespace: 'courseEdit',

  state: initState,

  reducers: {
    initState(
      state: StateType,
      { payload }: { type: string; payload: { state: StateType } }
    ) {
      return { ...payload.state }
    },

    changeCourseFields(
      state: StateType,
      { payload }: { type: string; payload: { data: CourseFieldsModel } }
    ) {
      return {
        ...state,
        courseFields: payload.data,
        when: true
      }
    },

    changePromptStatus(
      state: StateType,
      { payload }: { type: string; payload: { when: boolean } }
    ) {
      return { ...state, when: payload.when }
    },

    saveClassIdDataSource(
      state: StateType,
      { payload }: { type: string; payload: { data: SelectComponentDatasourceModel[] } }
    ) {
      return { ...state, classIdDataSource: payload.data }
    },
  },

  effects: {
    /**
    * 获取所有学院信息
    */
    *fetchvirClassList(
      { payload }: { type: string; payload: { teacherId: string } },
      { call, put }: EffectsCommandMap
    ) {
      const response = yield call(fetchVirClassList, payload.teacherId);
      if (!response) {
        return;
      }
      const { data: { list } } = response;
      const classIdDataSource = list.map((item: any) => ({
        label: item.className,
        value: item.classId
      }));

      yield put({
        type: 'saveClassIdDataSource',
        payload: {
          data: classIdDataSource,
        },
      })
    },

    /**
     * 新增课程信息
     */
    *createCourse(
      { payload }: { type: string; payload: { data: CourseFieldsModel } },
      { call, put }: EffectsCommandMap
    ) {
      yield call(courseEditService.createCourse, payload.data);
      yield put({
        type: 'changePromptStatus',
        payload: {
          when: false,
        },
      })
      router.goBack();
    },

    /**
    * 更新课程信息
    */
    *updateCourse(
      { payload }: { type: string; payload: { data: CourseFieldsModel } },
      { call, put }: EffectsCommandMap
    ) {
      yield call(courseEditService.updateCourse, payload.data);
      yield put({
        type: 'changePromptStatus',
        payload: {
          when: false,
        },
      })
      router.goBack();
    },
  },

  subscriptions: {
    setup(
      { dispatch, history }: { dispatch: Dispatch<any>, history: any }
    ) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/teacher/course/create' || pathname === '/teacher/course/edit') {
          dispatch({
            type: 'initState',
            payload: {
              state: initState
            }
          });

          const userInfo = userUtils.getUserInfo();
          if (Object.keys(userInfo).length !== 0) {
            dispatch({
              type: 'fetchCourseList',
              payload: {
                teacherId: userInfo.teacherId
              }
            });
          }
        }
      });
    },
  },
}

export default Model;
