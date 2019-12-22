import request from '@/utils/request';

/**
 * 获取作业信息分页
 * @param data
 */
export function fetchHomeworkPagination(data: any) {
  return request.post('/homework/pagination', {
    data,
  })
}

/**
 * 删除作业
 * @param data
 */
export function removeHomework(data: any) {
  return request.post('/homework/delete', {
    data,
  })
}