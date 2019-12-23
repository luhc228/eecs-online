export interface StudentFieldsModel {
  // 学生姓名
  studentName?: string;
  // 学生学号
  studentId?: string;
}

export interface StudentListItem extends StudentFieldsModel {
  // 学生ID
  id: string;
}

export interface StudentDetailModel {
  // 学院
  college: string;
  // 学生班级
  studentClass: string;
  // 学生姓名
  studentName: string;
  // 学生学号
  studentId: string;
}
