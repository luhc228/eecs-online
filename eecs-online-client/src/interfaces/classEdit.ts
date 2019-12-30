export interface StudentDetailModel {
  // 学院
  studentCollege: number;
  // 学生班级
  studentClass: string;
  // 学生姓名
  studentName: string;
  // 学生学号
  studentId: string;
  // 性别
  studentGender: string;
}

export interface ClassDetailFields {
  // 虚拟班级名称
  className: string;
}

export interface ClassDetailModel extends ClassDetailFields {
  // 虚拟班级id
  classId?: number;
  // 学生id List
  studentIdList: string[]
}
