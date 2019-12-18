import request from '@/utils/request';

/**
 * 获取题库信息（分页）
 * @param data
 */
export function fetchQuestionLibPagination(data: any) {
  return request.post('/question_lib/teacher/pagination', {
    data,
  })
}

/**
 * 删除题目
 * @param data
 */
export function removeQuestion(id: string) {
  return request.post('/question_lib/question/teacher/delete', {
    data: {
      id
    },
  })
}
