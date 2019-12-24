import { Reducer } from 'redux';
import router from 'umi/router';
import { EffectsCommandMap } from 'dva';
import * as courseEditService from '../services';
import { CourseFieldsModel } from '@/interfaces/course';
import { Effect } from '@/interfaces/reduxState';

export interface StateType {
  courseFields: CourseFieldsModel,
  when: boolean,
}

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

  state: {
    courseFields: {
      courseName: undefined,
      courseLocation: undefined,
      className: undefined,
    },
    when: true,
  },

  reducers: {
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
  },

  effects: {
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
    * 更新课程信息(Edit)
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
}

export default Model;
