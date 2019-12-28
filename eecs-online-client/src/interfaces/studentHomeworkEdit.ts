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
  singleQuestionList?: HomeworkListItem[];
  multipleQuestionList?: HomeworkListItem[];
  judgeQuestionList?: HomeworkListItem[];
  programQuestionList?: HomeworkListItem[];
}
