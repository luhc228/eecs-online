import request from '@/utils/request';
import { QuestionDetailModel } from '@/interfaces/teacherHomeworkEdit';

/**
 * 获取题目信息列表
 * @param data
 */
export function fetchQuestionDetail(data: QuestionDetailModel) {
  return request.post('/question_lib/teacher/pagination', {
    data,
  });
}

/**
 * 获取作业信息列表
 * @param data
 */
export function fetchTeacherHomeworkDetail(homeworkId: number) {
  return request.post('/homework/teacher/get', {
    data: {
      homeworkId,
    },
  });
}

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
