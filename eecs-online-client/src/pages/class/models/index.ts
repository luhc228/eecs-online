import { ClassTableData, filterFieldsProps } from '@/interfaces/class';
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';

export interface StateType {
    data: ClassTableData;
    filterFields: filterFieldsProps;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    save: Reducer<StateType>;
    changeFilterFields: Reducer<StateType>;
  };
  effects: {
    fetchClassPagination: Effect,
    removeClass: Effect,
  };
}

const Model: ModelType = {
  namespace: 'courseClass';
  state: {
    
  }
}