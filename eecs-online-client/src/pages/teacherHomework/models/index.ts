import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { HomeworkTableData, HomeworkFieldsModel } from '@/interfaces/teacherHomework';
import * as homeworkService from '../services';

export interface StateType {
    data: HomeworkTableData;
    filterFields: HomeworkFieldsModel;
}

export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
    namespace: string;
    state: StateType;
    reducers: {save: Reducer<StateType>;
        changeFilterFields: Reducer<StateType>;
        };
    effects: {
        fetchHomeworkPagination: Effect,
        removeHomework: Effect,
    };
}

const Model: ModelType = {
    namespace: 'homework',

    state: {
        data: {
          list: [],
          total: 0,
          pageSize: 8,
          page: 1,
        },
        filterFields: {
          homeworkName: undefined,
          courseName: undefined,
        },
    },

    reducers: {
        save(state: any, { payload: { data } }: any) {
          return { ...state, data }
        },
    
        changeFilterFields(state: any, { payload: { filterFields } }: any) {
          return { ...state, filterFields }
        },
    },

    effects: {
        /**
         * 获取班级信息分页
         * 包括信息筛选
         */
        *fetchHomeworkPagination({ payload }: any, { call, put }: any) {
          const response = yield call(homeworkService.fetchHomeworkPagination, payload);
          const { data } = response;
          console.log(data);
          yield put({
            type: 'save',
            payload: {
              data,
            },
          })
        },

        /**
        * 删除某个课程
        */
        *removeHomework({ payload }: any, { call, put, select }: any) {
            yield call(homeworkService.removeHomework, payload);
  
            const page = yield select((state: any) => {
                const { teacherHomework: { data } } = state;
                return data.page
            });

            yield put({
                type: 'fetchHomeworkPagination',
                payload: {
                    page,
                },
            })
        },
    },
}
  
export default Model