// import mockjs from 'mockjs';

// export default {
//   'POST /api/vir_class/pagination': (req: any, res: any) => {
//     const { page, pageSize } = req.body;
//     res.send(
//       mockjs.mock({
//         success: true,
//         message: '获取课程分页信息成功',
//         data: {
//           page,
//           pageSize,
//           total: 100,
//           'list|8': [
//             { 'id|+1': 1, className: 'EECS@id', 'studentNum|1-100': 100 },
//           ],
//         },
//       }),
//     )
//   },

//   'POST /api/student/detail': (req: any, res: any) => {
//     const { college, studentClass } = req.body;
//     res.send(
//       mockjs.mock({
//         success: true,
//         message: '获取学生详情成功',
//         data: {
//           'list|100': [
//             {
//               studentClass,
//               college,
//               studentId: '@id',
//               studentName: '@name',
//             },
//           ],
//         },
//       }),
//     )
//   },

//   'GET /api/college/detail': (req: any, res: any) => {
//     res.send(
//       mockjs.mock({
//         success: true,
//         message: '获取学院列表信息成功',
//         data: {
//           list: [
//             {
//               value: '1',
//               label: '信息科学与工程学院',
//               children: [
//                 {
//                   value: '1',
//                   label: '18通信1班',
//                 },
//                 {
//                   value: '2',
//                   label: '18通信2班',
//                 },
//               ]
//             },
//             {
//               value: '2',
//               label: '环境学院',
//               children: [
//                 {
//                   value: '9',
//                   label: '18环境1',
//                 },
//                 {
//                   value: '10',
//                   label: '18环境2',
//                 },
//               ]
//             },
//           ],
//         },
//       }),
//     )
//   },

//   'GET /api/student/class/detail': (req: any, res: any) => {
//     res.send(
//       mockjs.mock({
//         success: true,
//         message: '获取学生班级列表信息成功',
//         data: {
//           list: [
//             {
//               value: '1',
//               label: '18通信1班',
//             },
//             {
//               value: '2',
//               label: '18通信2班',
//             },
//           ],
//         },
//       }),
//     )
//   },
// }
