import { TableListPaginationProps } from './components';

export interface ClassListItem {
  // 虚拟班级唯一id
  id: string;
  // 虚拟班级名称
  classNames: string;
  // 课程名称
  courseName: string
  // 学生总人数
  studentTotal: number;
}

export interface ClassTableData extends TableListPaginationProps {
  classList: ClassListItem[];
}
