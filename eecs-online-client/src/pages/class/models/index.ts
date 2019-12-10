import { ClassTableData, ClassFieldsModal } from '@/interfaces/class';

export interface StateType {
    data: ClassTableData;
    filterFields: ClassFieldsModal;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

