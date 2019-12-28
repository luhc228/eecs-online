import request from '@/utils/request';

/**
 * 新增题目信息
 * @param homeworkId 作业id
 * @param studentId 学生id
 */
export function fetchHomeworkDetail(homeworkId: number, studentId: string) {
  return request.get('/homework/student/question/list', {
    params: {
      homeworkId,
      studentId,
    }
  })
}

/**
 * 暂存作业答案
 * @param data
 */
// TODO: add Interface
export function saveAnswer(data: any) {
  return request.post('/homework_condition/student/answer/save', {
    data,
  })
}

/**
 * 提交作业答案
 * @param data
 */
// TODO: add Interface
export function submitAnswer(data: any) {
  return request.post('/homework_condition/student/answer/submit', {
    data,
  })
}
