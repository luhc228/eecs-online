import { TableListPaginationProps, PaginationProps } from './components';

export interface FilterFieldsModel {
  //
  classId?: number;
  // 课程Id
  courseId?: number;
  //
  homeworkId?: number;
}

export interface CompletionListItem extends FilterFieldsModel {
  courseName: string;
  className: string;
  homeworkName: string;
  studentId: number;
  studentName: string;
  homeworkScore: string;
}

/**
 * 作业完成情况分页请求参数接口
 */
export interface PaginationParamsModel extends FilterFieldsModel, PaginationProps {}

/**
 * 完成情况分页接口
 */
export interface CompletionTableData extends TableListPaginationProps {
  // 完成情况学生列表
  list: CompletionListItem[];
}
