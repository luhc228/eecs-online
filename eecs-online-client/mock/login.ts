export default {
  'POST /api/login/student': (req: any, res: any) => {
    res.send({
      success: true,
      message: 'Login Success',
      data: {
        accessToken: 'xxxx',
        gender: '男',
        class: '大一',
        name: 'winter',
      },
    });
  },

  // 支持自定义函数，API 参考 express@4
  'POST /api/login/teacher': (req: any, res: any) => {
    res.send({
      success: true,
      message: 'Login Success',
      data: {
        accessToken: 'xxxx',
        gender: '男',
        name: 'winterss',
      },
    });
  },
};
