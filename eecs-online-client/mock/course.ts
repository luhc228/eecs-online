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
          'list|8': [
            { id: '@id', courseName: 'EECS', location: 'N5', time: '@time("A HH:mm:ss")', classNames: '崇新20' },
          ],
        },
      }),
    )
  },

}
