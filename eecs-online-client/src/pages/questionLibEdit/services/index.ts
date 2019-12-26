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
 *
 * @param questionId 题目id
 */
export function fetchQuestionDetail(questionId: string) {
  return request.get('/question_lib/question/teacher/detail', {
    params: {
      questionId
    },
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
