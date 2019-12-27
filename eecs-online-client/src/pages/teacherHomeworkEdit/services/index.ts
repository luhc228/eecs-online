import request from '@/utils/request';
import { QUESTION_TYPE } from '@/enums';

export interface QuestionDetailData {
  courseId: number;
  // questionName: string;
  questionType?: QUESTION_TYPE;
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
  return request.post('/homework/teacher/add', {
    data,
  });
}

/**
 * 更新作业信息
 * @param data
 */
export function updateTeacherHomework(data: any) {
  return request.post('/homework/teacher/update', {
    data,
  });
}

/**
 * 获取问题分页
 * @param data
 */
export function fetchQuestionDetail(data: QuestionDetailData) {
  console.log('question_lib', data);
  return request.post('/question_lib/teacher/pagination', {
    data,
  });
}
