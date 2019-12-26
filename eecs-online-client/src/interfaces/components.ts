import React from 'react';
import { Dispatch } from 'dva';
import History from 'history';
import { AnyAction } from 'redux';
import { FORM_COMPONENT, USER_TYPE } from '@/enums';

export interface PageMatchModel {
  isExact: boolean,
  params: object,
  path: string,
  url: string,
}

export interface PageBasicPropsModel {
  history: History;
  location: CustomLocation;
  match: PageMatchModel;
  children: any;
}

export interface CustomLocation extends Location {
  query: {
    [x: string]: string,
  };
}

export interface TableColumnsProps<T> {
  title: string,
  dataIndex: string,
  key: string,
  render?: (_: string, record: T, index: any) => React.ReactNode,
}

export interface ButtonProps {
  text: string;
  icon: string;
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'danger';
  onClick: () => void;
}

export interface PaginationProps {
  pageSize: number;
  page: number;
}
export interface TableListPaginationProps extends PaginationProps {
  total: number;
}

export interface SelectComponentDatasourceModel {
  value: string | number,
  label: string,
}


export interface FormItemComponentProps {
  label?: string,
  name: string,
  initialValue?: any,
  required: boolean;
  message?: string;
  component: FORM_COMPONENT,
  datasource?: SelectComponentDatasourceModel[],
  // 组件属性
  props?: { [key: string]: any },
}

export interface MenuItem {
  key: string;
  name: string;
  link?: string;
  icon?: string;
  userType?: USER_TYPE;
}

export interface MenuListItemModel extends MenuItem {
  children?: MenuItem[]
}

export interface TabsContentProps {
  tab: string,
  key: number,
}

export interface UmiHistory extends History {
  location: { [k: string]: any }
}
export interface UmiComponentProps {
  // TODO: add interface instead of History
  history: UmiHistory;
  dispatch: Dispatch<AnyAction>;
}
