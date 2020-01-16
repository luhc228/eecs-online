import request from '@/utils/request';
import { AnswerModel } from '@/interfaces/studentHomeworkEdit';


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
export function saveAnswer(data: AnswerModel) {
  return request.post('/homework_condition/student/answer/save', {
    data,
  })
}

/**
 * 提交作业答案
 * @param data
 */
export function submitAnswer(data: AnswerModel) {
  return request.post('/homework_condition/student/answer/submit', {
    data,
  })
}

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

/**
 * 运行代码获取测试结果
 */
export function runCode(answer: string) {
  return request.post('/homework_condition/code/run', {
    data: { answer }
  })
}
