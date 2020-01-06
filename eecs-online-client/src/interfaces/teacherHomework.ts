import { TableListPaginationProps, PaginationProps } from './components';

export interface TeacherHomeworkFilterFieldsModel {
  // 作业名称
  homeworkName?: string;
  // 作业总分
  homeworkScore?: string;
  // 作业描述
  description?: string;
  // 发布时间
  startAt?: string;
  // 截止事件
  endAt?: string;
  // 课程名称
  courseName?: string;
  // 课程id
  courseId?: string;
}

/**
 * 教师作业分页请求参数接口
 */
export interface PaginationParamsModel extends TeacherHomeworkFilterFieldsModel, PaginationProps {}

export interface TeacherHomeworkListItem extends TeacherHomeworkFilterFieldsModel {
  // 作业id
  homeworkId: number;
}

/**
 * 教师作业分页接口
 */
export interface TeacherHomeworkTableData extends TableListPaginationProps {
  // 作业列表
  list: TeacherHomeworkListItem[];
}
