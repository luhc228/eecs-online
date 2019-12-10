import { TableListPaginationProps } from './components';
import { Table, List } from 'antd';

export interface ClassFieldsModal{
    // 班级名称
    courseClassName?: string;
    // 所属课程名称
    courseName?: string;
    // 学生总数
    studentTotal?: number;
    // 学生列表
    studentList: StudentListItem[]; 
}

export interface ClassListItem extends ClassFieldsModal{
    // 班级ID
    id: string;
}

export interface StudentFieldsModal{
    // 学生姓名
    studentName?: string;
    // 学生学号
    studentNumber?: string;
}
export interface StudentListItem extends StudentFieldsModal{
    // 学生ID
    id: string;
}

export interface ClassTableData extends TableListPaginationProps{
    // 班级列表
    classList: ClassListItem[];
}

export interface filterFieldsProps extends ClassFieldsModal{
}