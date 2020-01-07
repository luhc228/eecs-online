import request from '@/utils/request';

/**
 * 获取题目信息列表
 * @param courseId
 */
export function fetchCourseQuestionList(courseId: number) {
  return request.get('/question_lib/question/teacher/get', {
    params: {
      courseId
    },
  });
}

/**
 * 获取作业信息列表
 * @param data
 */
export function fetchTeacherHomeworkDetail(homeworkId: number) {
  return request.get('/homework/teacher/get', {
    params: {
      homeworkId,
    },
  });
}

/**
 * 新增作业信息
 * @param data
 */
export function createTeacherHomework(data: any) {
  return request.post('/homework/teacher/add', {
    data,
  });
}

/**
 * 更新作业信息
 * @param data
 */
export function updateTeacherHomework(data: any) {
  return request.post('/homework/teacher/update', {
    data,
  });
}
