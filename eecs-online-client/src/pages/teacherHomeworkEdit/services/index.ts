import request from '@/utils/request';
import { QUESTION_TYPE } from '@/enums';

export interface QuestionDetailData {
  course: string;
  questionType?: QUESTION_TYPE;
}

export function fetchCourseList() {
  return request.get('/course/detail');
}

// export function fetchStudentClassList(params: { college: string }) {
//     return request.get('/student/class/detail', {
//       params
//     })
// }

/**
 * 新增作业信息
 * @param data
 */
export function createTeacherHomework(data: any) {
  return request.post('/vir_teacherhomework/add', {
    data,
  });
}

/**
 * 更新作业信息
 * @param data
 */
export function updateTeacherHomework(data: any) {
  return request.post('/vir_teacherhomework/edit', {
    data,
  });
}

/**
 * 获取问题分页
 * @param data
 */
export function fetchQuestionDetail(data: QuestionDetailData) {
  return request.post('/question/detail', {
    data,
  });
}
