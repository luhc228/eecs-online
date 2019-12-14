import React from 'react';
import { FORM_COMPONENT } from '@/enums';

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

export interface TableListPaginationProps {
  total: number;
  pageSize: number;
  page: number;
}

export interface SelectComponentDatasourceModel {
  value: string | number,
  label: string | number,
}


export interface FormItemComponentProps {
  label?: string,
  name: string,
  required: boolean;
  message?: string;
  component:
  FORM_COMPONENT.Input |
  FORM_COMPONENT.Select |
  FORM_COMPONENT.InputNumber,
  datasource?: SelectComponentDatasourceModel[],
  props?: { [key: string]: any },
  initialValue?: string,
  selectMode?: 'multiple' | 'tags',
}

export interface MenuItem {
  key: string,
  name: string,
  link?: string,
  icon?: string,
}

export interface MenuListItemModel extends MenuItem {
  children?: MenuItem[]
}
