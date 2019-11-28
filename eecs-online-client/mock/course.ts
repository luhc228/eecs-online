import mockjs from 'mockjs';

export default {
  'POST /api/course/pagination': (req: any, res: any) => {
    const { page, pageSize } = req.body;
    res.send(
      mockjs.mock({
        success: true,
        message: '获取课程分页信息成功',
        data: {
          page,
          pageSize,
          total: 100,
          'courseList|10': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
        },
      }),
    )
  },

}
