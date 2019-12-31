import { TableListPaginationProps, PaginationProps } from './components';

export interface CourseFieldsModel {
  courseName?: string,
  // 上课地点
  courseLocation?: string,
  // 虚拟班级名称
  className?: string,
}

/**
 * 虚拟班级分页请求参数接口
 */
export interface PaginationParamsModel extends CourseFieldsModel, PaginationProps { }

export interface CourseListItem extends CourseFieldsModel {
  // 课程唯一id
  courseId: number,
  teacherName: string;
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
