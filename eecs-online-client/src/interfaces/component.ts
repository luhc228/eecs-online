import React from 'react';


export interface PageMatchModel {
  isExact: boolean;
  params: object;
  path: string;
  url: string;
}

export interface PageBasiocPropsModel {
  history: History;
  location: CustomLocation;
  match: PageMatchModel;
  children: any;
}

export interface CustomLocation extends Location {
  query: {
    [x: string]: string;
  };
}

export interface TableColumnsProps<T> {
  title: string;
  dataIndex: string;
  key: string;
  render?: (_: string, record: T, index: any) => React.ReactNode;
}

export interface ButtonProps {
  text: string;
  icon: string;
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'danger';
  onClick: () => void;
}
