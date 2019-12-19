import { TableListPaginationProps } from './components';

export interface FilterFieldsModel {
  // 题目内容
  content?: string;
}

export interface questionListItem {
  // 题目id
  id: string;
  // 课程名
  courseName: string;
  // 题目类型
  questionType: number;
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
export interface TablePaginationModel {
  // 题目类型
  questionType: number;
  // 题目内容
  content?: string;
}
