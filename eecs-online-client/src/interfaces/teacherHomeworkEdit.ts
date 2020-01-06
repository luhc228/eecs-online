import { QUESTION_TYPE } from '@/enums';

export interface QuestionDetailModel {
  // 所属课程名称
  courseName: string;
  // 所属课程Id
  courseId: number;
  // 问题类型
  questionType: QUESTION_TYPE;
  // 问题Id
  questionId: number;
  // 问题名字
  questionName: string;
  // // 选项
  // options?: string;
  // // 答案
  // answer: any;
  // 题目分数
  questionScore: number;
  // 题目图片
  contentImage?: string;
}

export interface TeacherHomeworkEditData {
  // 作业id
  homeworkId?: number;
  // 作业名称
  homeworkName?: string;
  // 作业总分
  homeworkScore?: string;
  // 作业描述
  description?: string;
  // 发布时间
  startAt?: string;
  // 截止时间
  endAt?: string;
}

export interface TeacherHomeworkEditListItem extends TeacherHomeworkEditData {
  homeworkId?: number;
  // 题目列表
  list: QuestionDetailModel[];
}
