import request from '@/utils/request';

/**
 * 新增题目信息
 * @param data
 */
// TODO: add Interface
export function fetchHomeworkList(data: any) {
  return request.post('/homework_condition/student/list', {
    data,
  })
}

/**
 * 暂存答案
 * @param data
 */
// TODO: add Interface
export function saveAnswer(data: any) {
  return request.post('/homework_condition/student/answer/save', {
    data,
  })
}

/**
 * 提交答案
 * @param data
 */
// TODO: add Interface
export function submitAnswer(data: any) {
  return request.post('/homework_condition/student/answer/submit', {
    data,
  })
}
