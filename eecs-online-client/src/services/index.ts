/**
 * 定义共用api接口
<<<<<<< HEAD
*/
=======
 */
>>>>>>> teacher_modules

import request from '@/utils/request';

/**
 * 获取学院信息列表
 */
export function fetchCollegeList() {
<<<<<<< HEAD
  return request.get('/college/detail')
=======
  return request.get('/college/detail');
>>>>>>> teacher_modules
}

/**
 * 获取虚拟班级信息列表
 */
export function fetchVirClassList(teacherId: string) {
  return request.get('/vir_class/list', {
    params: {
<<<<<<< HEAD
      teacherId
    }
  })
=======
      teacherId,
    },
  });
>>>>>>> teacher_modules
}

/**
 * 获取课程信息列表
 */
export function fetchCourseList(teacherId?: string, studentId?: string) {
  return request.get('/course/list', {
    params: {
      teacherId,
      studentId,
<<<<<<< HEAD
    }
  })
=======
    },
  });
>>>>>>> teacher_modules
}
