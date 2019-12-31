import request from '@/utils/request';

/**
 * 学生获取题目情况信息
 */
export function fetchHomeworkCondition(homeworkId: number, studentId: string) {
  return request.get('/homework_condition/student/list', {
    params: {
      homeworkId,
      studentId,
    }
  })
}
