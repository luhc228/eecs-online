/**
 * define the common enum
 */
export enum USER_TYPE {
  Student,
  Teacher,
}

export enum FORM_COMPONENT {
  // 单选框
  Input = 'Input',
  // 选择框
  Select = 'Select',
  // 数字输入框
  InputNumber = 'InputNumber',
  // 文本框
  TextArea = 'TextArea',
  // 上传组件
  Upload = 'Upload',
  // 动态增加组件
  DynamicFieldSet = 'DynamicFieldSet',
  // 单选框
  Radio = 'Radio',
  // 多选框
  Checkbox = 'Checkbox',
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
