import request from '@/utils/request';
import { QuestionFieldsModel } from '@/interfaces/questionLibEdit';

/**
 * 新增题目信息
 * @param data
 */
export function createQuestion(data: QuestionFieldsModel) {
  return request.post('/question_lib/question/teacher/add', {
    data,
  })
}

/**
 * 获取已存在的题目的详情
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
export function updateQuestion(data: QuestionFieldsModel) {
  return request.post('/question_lib/question/teacher/update', {
    data,
  })
}
