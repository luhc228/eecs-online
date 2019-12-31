export interface QuestionFieldsModel {
  // 试题id
  questionId?: number;
  // 课程id
  courseId: number;
  // 题目类型
  questionType: number;
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
