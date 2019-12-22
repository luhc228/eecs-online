import { TableListPaginationProps } from './components';

export interface HomeworkFieldsModel {
    homeworkName?: string,
    // 作业内容
    content?: string,
    // 作业描述
    description?: string,
    // 截止日期
    deadline?: string,
    // 课程名称
    courseName?: string,
    // 课程id
    courseID?: string,
}

export interface HomeworkListItem extends HomeworkFieldsModel {
    // 作业id
    id: string,
}

export interface HomeworkTableData extends TableListPaginationProps {
    list: HomeworkListItem[];
}

