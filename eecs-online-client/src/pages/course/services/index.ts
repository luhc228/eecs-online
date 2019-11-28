import request from '@/utils/request';

export function fetchCoursePagination(data: any) {
  return request.post('/course/pagination', {
    data,
  })
}
