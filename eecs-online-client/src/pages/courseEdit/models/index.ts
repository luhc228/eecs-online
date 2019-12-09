import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import * as courseEditService from '../services';
import { CourseFieldsModel } from '@/interfaces/course';

export interface StateType {
  courseFields: CourseFieldsModel
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
  },

  reducers: {
    changeCourseFields(state: any, { payload: { data } }: any) {
      return { ...state, courseFields: data }
    },
  },

  effects: {
    /**
     * 新增课程信息
     */
    *createCourse({ payload }: any, { call }: any) {
      yield call(courseEditService.createCourse, payload);
    },

    /**
    * 更新课程信息(Edit)
    */
    *updateCourse({ payload }: any, { call }: any) {
      yield call(courseEditService.updateCourse, payload);
    },
  },
}

export default Model;
