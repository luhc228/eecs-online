import { TableListPaginationProps, PaginationProps } from './components';
import { QUESTION_TYPE } from '@/enums';

export interface HomeworkFieldsModel {
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

export interface HomeworkListItem extends HomeworkFieldsModel {
  // 作业id
  homeworkId: number;
}

export interface HomeworkTableData extends TableListPaginationProps {
  list: HomeworkListItem[];
}

/**
 * 教师作业分页接口
 */
export interface PaginationParamsModel extends HomeworkFieldsModel, PaginationProps {}

export interface TeacherHomeworkTableData extends TableListPaginationProps {
  // 作业列表
  list: HomeworkListItem[];
}

export interface QuestionFieldsModel {
  // 题目内容
  content?: string;
  // 题目类型
  questionType?: QUESTION_TYPE;
}

export interface QuestionListItem extends QuestionFieldsModel {
  // 题目ID
  id: string;
}

export interface QuestionDetailModel {
  // 所属课程
  course: string;
  // 题目内容
  content: string;
  // 题目类型
  questionType: QUESTION_TYPE;
  // 题目分值
  questionScore: number;
}
