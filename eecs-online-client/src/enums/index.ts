/**
 * define the common enum
 */
export enum USER_TYPE {
  Student,
  Teacher,
}

export enum FORM_COMPONENT {
  Input = 'Input',
  Select = 'Select',
  InputNumber = 'InputNumber',
  TextArea = 'TextArea',
  Upload = 'Upload',
  DynamicFieldSet = 'DynamicFieldSet'
}

export enum FORM_LAYOUTS {
  Horizontal = 'horizontal',
  Inline = 'inline',
  Vertical = 'vertical',
}

export enum CUSTOM_FORM_TYPES {
  Filter,
  TwoColumn,
  OneColumn,
}

export enum QUESTION_TYPE {
  Single,
  Multiple,
  Judge,
  Program,
}

export enum HOMEWORK_STATUS {
  Done,
  Undone,
}
