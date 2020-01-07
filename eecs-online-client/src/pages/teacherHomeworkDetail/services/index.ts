import request from '@/utils/request';
import { FilterFieldsModel, DetailEditModel } from '@/interfaces/teacherHomeworkDetail';
/**
 * 获取学生题目情况信息
 */
export function fetchHomeworkCondition(data: FilterFieldsModel) {
  return request.get('/homework_condition/teacher/detail', {
    data,
  });
}

/**
 * 修改学生得分情况
 */
export function updateTeacherHomeworkDetail(
  // homeworkId: number,
  // studentId: number,
  // questionId: number,
  // questionScore: string,
  params: DetailEditModel,
) {
  return request.post('/homework_condition/teacher/question/score/edit', {
    params,
    // : {
    //   homeworkId,
    //   studentId,
    //   questionId,
    //   questionScore,
    // },
  });
}
