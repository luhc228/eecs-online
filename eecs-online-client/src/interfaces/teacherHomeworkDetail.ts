import { QUESTION_TYPE } from '@/enums';

export interface FilterFieldsModel {
  studentId?: string;
  homeworkId?: number;
}

export interface HomeworkDetailListItem {
  questionId?: number;
  content?: string;
  contentImage?: string;
  questionType?: QUESTION_TYPE;
  options?: string;
  questionScore?: number;
  status?: number;
  submitAnswer?: string;
  answer?: string;
  score?: number;
}

export interface QuestionScoreItem {
  questionId?: number;
  score?: number;
}

export interface HomeworkDetailData {
  total?: number;
  homeworkName?: string;
  homeworkScore?: string;
  // status?: string;
  finalScore?: string;
  studentId: number;
  studentName: string;
  list: HomeworkDetailListItem[];
  questionScoreList: QuestionScoreItem[];
}

export interface DetailEditModel {
  studentId?: string;
  homeworkId?: number;
  questionId?: number;
  score?: number;
  status?: number;
}
