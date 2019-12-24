import { TableListPaginationProps } from './components';
import { QUESTION_TYPE } from '@/enums';

export interface HomeworkFieldsModel {
  homeworkName?: string;
  // 作业内容
  content?: string;
  // 作业描述
  description?: string;
  // 截止日期
  deadline?: string;
  // 课程名称
  courseName?: string;
  // 课程id
  courseID?: string;
}

export interface HomeworkListItem extends HomeworkFieldsModel {
  // 作业id
  id: string;
}

export interface HomeworkTableData extends TableListPaginationProps {
  list: HomeworkListItem[];
}

/**
 * 虚拟班级分页接口
 */
export interface TeacherHomeworkTableData extends TableListPaginationProps {
  // 班级列表
  list: HomeworkListItem[];
}

export interface QuestionFieldsModel {
  // 学生姓名
  content?: string;
  // 学生学号
  questionType?: QUESTION_TYPE;
}

export interface QuestionListItem extends QuestionFieldsModel {
  // 学生ID
  id: string;
}

export interface QuestionDetailModel {
  // 学院
  course: string;
  // 学生班级
  content: string;
  // 学生姓名
  questionType: QUESTION_TYPE;
  // 学生学号
  questionScore: number;
}
