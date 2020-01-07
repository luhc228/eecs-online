import { QUESTION_TYPE } from '@/enums';

export interface QuestionDetailModel {
  // 试题id
  questionId: number;
  // 课程id
  courseId: number;
  // 题目类型
  questionType: QUESTION_TYPE;
  // 题目分数
  questionScore: number;
  // 题目内容
  content: string;
  // 题目图片
  contentImage: string;
  // 题目选项
  options?: any;
  // 题目正确答案
  answer: string;

  [k: string]: any;
}

export interface TeacherHomeworkFormFields {
  // 作业id
  homeworkId?: number;
  // 作业名称
  homeworkName: string;
  // 作业总分
  homeworkScore: number;
  // 作业描述
  description?: string;
  // 发布时间
  startAt: string;
  // 截止时间
  endAt: string;
}

export interface TeacherHomeworkEditDetail {
  homeworkFields: TeacherHomeworkFormFields;
  // 题目列表
  list: QuestionDetailModel[];
}
