/**
 * define the common enum
 */
export enum USER_TYPE {
  Student,
  Teacher,
}

// 相关渲染与值更新在CustomForm
export enum FORM_COMPONENT {
  Input = 'Input',  
  Select = 'Select',
  InputNumber = 'InputNumber',
}

export enum FORM_LAYOUTS {
  Horizontal = 'horizontal',
  Inline = 'inline',
  Vertical = 'vertical',
}

export enum CUSTOM_FORM_TYPES {
  Filter = 'filter',
  Common = 'common',
}
