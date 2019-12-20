import request from '@/utils/request';

/**
 * 新增题目信息
 * @param data
 */
// TODO: add Interface
export function createQuestion(data: any) {
  return request.post('/question_lib/question/teacher/add', {
    data,
  })
}

/**
 * 更新题目信息
 * @param data
 */
// TODO: add Interface
export function updateQuestion(data: any) {
  return request.post('/question_lib/question/teacher/update', {
    data,
  })
}
