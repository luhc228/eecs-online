import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import router from 'umi/router';
import * as courseEditService from '../services';
import { CourseFieldsModel } from '@/interfaces/course';

export interface StateType {
  courseFields: CourseFieldsModel,
  when: boolean,
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    changeCourseFields: Reducer<StateType>;
    changePromptStatus: Reducer<StateType>;
  };
  effects: {
    createCourse: Effect,
    updateCourse: Effect,
  };
}

const Model: ModelType = {
  namespace: 'courseEdit',

  state: {
    courseFields: {
      courseName: undefined,
      location: undefined,
      time: undefined,
      classNames: undefined,
    },
    when: true,
  },

  reducers: {
    changeCourseFields(state: any, { payload: { data } }: any) {
      return { ...state, courseFields: data, when: true }
    },

    changePromptStatus(state: any, { payload: { when } }: any) {
      return { ...state, when }
    },
  },

  effects: {
    /**
     * 新增课程信息
     */
    *createCourse({ payload }: any, { call, put }: any) {
      yield call(courseEditService.createCourse, payload);
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
    *updateCourse({ payload }: any, { call, put }: any) {
      yield call(courseEditService.updateCourse, payload);
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
