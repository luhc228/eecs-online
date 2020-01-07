import { QUESTION_TYPE } from '@/enums';

export interface HomeworkDetailListItem {
  // 问题id
  questionId: number;
  // 题目内容
  content: string;
  // 题目图片
  contentImage?: string;
  // 题目类型
  questionType: QUESTION_TYPE;
  // 选项
  options?: string;
  // 答案
  answer: any;
  // 学生答案
  submitAnswer?: any;
  // 题目分数
  questionScore: number;
  // 学生得分
  score: number;
}

export interface FilterFieldsModel {
  studentId?: number;
  homeworkId?: number;
}

export interface DetailEditModel {
  studentId?: number;
  homeworkId?: number;
  questionId?: number;
  questionScore?: string;
}

export interface HomeworkDetailData extends FilterFieldsModel {
  homeworkName: string;
  homeworkScore: number;
  finalScore: number;
  studentName: string;
  list: HomeworkDetailListItem[];
}
