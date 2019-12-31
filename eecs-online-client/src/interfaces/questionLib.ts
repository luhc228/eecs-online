import { TableListPaginationProps, PaginationProps } from './components';
import { QUESTION_TYPE } from '@/enums';

export interface FilterFieldsModel {
  // 题目内容
  content?: string;
  // 课程Id
  courseId?: number;
}

export interface questionListItem {
  // 题目id
  questionId: number;
  // 课程名
  courseName: string;
  // 题目类型
  questionType: QUESTION_TYPE;
  // 题目分数
  questionScore: number;
  // 题目内容
  content?: string;
  // 题目图片
  contentImage?: string;
}

export interface TableData extends TableListPaginationProps {
  // 班级列表
  list: questionListItem[];
}

// 分页查询参数
export interface TablePaginationModel extends FilterFieldsModel, PaginationProps {
  // 题目类型
  questionType: number;
}
