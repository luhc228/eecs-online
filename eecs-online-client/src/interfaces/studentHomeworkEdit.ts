import { QUESTION_TYPE } from '@/enums';

export interface HomeworkListItem {
  questionId: number;
  content: string;
  contentImage?: string;
  options?: string;
  questionScore: number;
  questionType: QUESTION_TYPE;
}

export interface HomeworkDetail {
  total: number;
  homeworkScore: number;
  homeworkName: string;
  singleQuestionList?: HomeworkListItem[];
  multipleQuestionList?: HomeworkListItem[];
  judgeQuestionList?: HomeworkListItem[];
  programQuestionList?: HomeworkListItem[];
}

export interface AnswerList {
  questionId: number;
  submitAnswer: string | number;
}

export interface AnswerModel {
  studentId: string;
  homeworkId: number;
  list: AnswerList[];
}
