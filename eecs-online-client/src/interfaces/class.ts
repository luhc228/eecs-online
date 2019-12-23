import { TableListPaginationProps } from './components';

export interface ClassFieldsModel {
    // 班级名称
    className?: string;
    // 学生总数
    studentNum?: number;
}

export interface ClassListItem extends ClassFieldsModel {
    // 班级ID
    classId: string;
}

export interface ClassTableData extends TableListPaginationProps {
    // 班级列表
    list: ClassListItem[];
}

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
