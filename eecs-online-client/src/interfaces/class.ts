import { TableListPaginationProps, PaginationProps } from './components';

export interface ClassFilterFieldsModel {
    // 班级名称
    className?: string;
    // 学生总数
    studentNum?: number;
}

/**
 * 虚拟班级分页请求参数接口
 */
export interface PaginationParamsModel extends ClassFilterFieldsModel, PaginationProps { }

export interface ClassListItem extends ClassFilterFieldsModel {
    // 班级ID
    classId: number;
}

/**
 * 虚拟班级分页接口
 */
export interface ClassTableData extends TableListPaginationProps {
    // 班级列表
    list: ClassListItem[];
}
