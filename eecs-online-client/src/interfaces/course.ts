import { TableListPaginationProps } from './components';

export interface CourseFieldsModel {
  courseName?: string,
  // 上课地点
  location?: string,
  // 虚拟班级名称
  classNames?: string,
}

export interface CourseListItem extends CourseFieldsModel {
  // 课程唯一id
  id: string,
}

export interface CourseTableData extends TableListPaginationProps {
  list: CourseListItem[];
}

export interface filterFieldsProps {
  // 课程名称
  courseName?: string,
  // 地点
  location?: string,
  // 上课班级
  classNames?: string,
}
