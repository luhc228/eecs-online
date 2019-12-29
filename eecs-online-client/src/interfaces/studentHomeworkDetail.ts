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
  // 学生提交的答案
  submitAnswer?: any;
  // 题目分数
  questionScore: number;
  // 得分
  score: number;
}

export interface HomeworkDetailData {
  homeworkName: string;
  homeworkScore: number;
  finalScore: number;
  list: HomeworkDetailListItem[];
}
