import request from '@/utils/request';

/**
 * 获取学生题目情况信息
 */
export function fetchHomeworkCondition(homeworkId: number, studentId: string) {
  return request.get('/homework_condition/teacher/detail', {
    params: {
      homeworkId,
      studentId,
    },
  });
}

/**
 * 修改学生得分情况
 */
export function homeworkScoreEdit(homeworkId: number, studentId: number, questionId: number, questionScore: string) {
    return request.post('/homework_condition/teacher/question/score/edit',{
        params: {
            homeworkId,
            studentId,
            questionId,
            questionScore,
        }
    })
}