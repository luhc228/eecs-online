import { TableListPagination } from './component';

export interface CourseListItem {
  // 课程唯一id
  id: string;
  // 课程名称
  courseName: string;
  // 上课地点
  location: string;
  // 上课时间
  time: string;
  // 虚拟班级名称
  classNames: string;
}

export interface CourseTableData extends TableListPagination {
  courseList: CourseListItem[];
}
