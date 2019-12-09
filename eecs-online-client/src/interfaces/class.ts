import { TableListPaginationProps } from './components';
import { Table, List } from 'antd';

export interface ClassListItem{
    //
    id: string;
    //
    courseClassName: string;
    //
    courseName: string;
    //
    studentTotal: number;
}

export interface StudentListItem{
    //
    id: string;
    //
    studentName: string;
    //
    studentNumber: string;
}

export interface ClassTableData extends TableListPaginationProps{
    classList: ClassListItem[];
}
