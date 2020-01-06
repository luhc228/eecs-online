import { TableListPaginationProps, PaginationProps } from './components';

export interface CompletionFilterFieldsModel {
  //
  studentName?: string;
  //
  studentId?: number;
  //
  studentClass?: string;
  //
  delay?: boolean;
  //
  homeworkScore: number;
  //
  courseId?: number;
}

/**
 * 作业完成情况分页请求参数接口
 */
export interface PaginationParamsModel extends CompletionFilterFieldsModel, PaginationProps {}

export interface CompletionListItem extends CompletionFilterFieldsModel {
  //
  homeworkId: number;
}

/**
 * 完成情况分页接口
 */
export interface CompletionTableData extends TableListPaginationProps {
  // 完成情况学生列表
  list: CompletionListItem[];
}
