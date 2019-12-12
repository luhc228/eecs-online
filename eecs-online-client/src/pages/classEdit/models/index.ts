import { Reducer } from 'redux';
import router from 'umi/router';
import * as classEditService from '../services';

export interface StateType {
  classDetail: any;
  when: boolean;
}


export interface ModelType {
  namespace: string;

  state: StateType;


}
const Model = {
  namespace: 'classEdit',

  state: {
    classFields: {},
    when: true,
  },

  reducers: {

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
  },


}


export default Model;
