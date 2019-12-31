import { TableListPaginationProps, PaginationProps } from './components';
import { HOMEWORK_STATUS } from '@/enums';

export interface FilterFieldsModel {
  // 作业状态
  status: HOMEWORK_STATUS;
  // 课程id
  courseId?: number;
}

export interface StudentHomeworkPaginationProps extends PaginationProps, FilterFieldsModel { }

export interface studentHomeworkListItem {
  // 学生作业id
  homeworkId: number;
  // 作业名称
  homeworkName: string;
  // 课程名称
  courseName: string;
  // 作业总分
  homeworkScore: string;
  // 起始时间
  startAt: string;
  // 结束时间
  endAt: string;
  // 作业状态
  status: number;
  // 作业描述
  description?: string;
}

export interface TableData extends TableListPaginationProps {
  // 班级列表
  list: studentHomeworkListItem[];
}
