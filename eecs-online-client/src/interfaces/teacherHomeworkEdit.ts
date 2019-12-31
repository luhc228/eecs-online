import { QUESTION_TYPE } from '@/enums';

export interface TeacherHomeworkDetailFields {
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

export interface TeacherHomeworkDetailModel {
  // 作业id
  homeworkId?: number;
  // 题目Id列表
  questionId?: number[];
}

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
}
