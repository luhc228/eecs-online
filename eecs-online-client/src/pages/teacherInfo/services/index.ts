import { TeacherUserForm } from '@/interfaces/teacherInfo';
import request from '@/utils/request';

/**
 * 更新信息
 * @param data
 */
export function updateInfo(data: TeacherUserForm) {
    return request.post('/userInfo/update', {
      data,
    })
  }
