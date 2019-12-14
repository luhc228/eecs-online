import mockjs from 'mockjs';

export default {
  'POST /api/vir_class/pagination': (req: any, res: any) => {
    const { page, pageSize } = req.body;
    res.send(
      mockjs.mock({
        success: true,
        message: '获取课程分页信息成功',
        data: {
          page,
          pageSize,
          total: 100,
          'list|8': [
            { 'id|+1': 1, className: 'EECS@id', 'studentNum|1-100': 100 },
          ],
        },
      }),
    )
  },

  'POST /api/student/detail': (req: any, res: any) => {
    const { college, studentClass } = req.body;
    res.send(
      mockjs.mock({
        success: true,
        message: '获取学生详情成功',
        data: {
          'list|100': [
            {
              studentClass,
              college,
              studentId: '@id',
              studentName: '@name',
            },
          ],
        },
      }),
    )
  },
}
