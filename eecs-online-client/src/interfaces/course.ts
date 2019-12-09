import { TableListPaginationProps } from './components';

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

// item和tablepage组成整个coursetable
export interface CourseTableData extends TableListPaginationProps {
  courseList: CourseListItem[];
}
