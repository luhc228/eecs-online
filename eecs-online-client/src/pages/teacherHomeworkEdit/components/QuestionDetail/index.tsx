import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'dva';
import { StateType } from '../../models';
import { UmiComponentProps } from '@/interfaces/components';
import TableTransfer from '@/components/TableTransfer';

export interface QuestionDetailProps extends UmiComponentProps {
  teacherHomeworkEdit: StateType;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ teacherHomeworkEdit, dispatch }) => {
  const { questionList, targetKeys } = teacherHomeworkEdit;

  const leftTableColumns: ColumnProps<any>[] = [
    {
      dataIndex: 'questionName',
      title: '题目名称',
    },
    // {
    //   dataIndex: 'questionType',
    //   title: '题目类型',
    // },
    {
      dataIndex: 'questionScore',
      title: '题目分值',
    },
  ];

  const rightTableColumns: ColumnProps<any>[] = [
    {
      dataIndex: 'questionName',
      title: '题目名称',
    },
    {
      dataIndex: 'questionScore',
      title: '题目分值',
    },
    {
      dataIndex: 'questionType',
      title: '题目类型',
    },
  ];

  const handleChange = (nextTargetKeys: string[]) => {
    dispatch({
      type: 'teacherHomeworkEdit/changeTargetKeys',
      payload: {
        targetKeys: nextTargetKeys,
      },
    });
  };

  return (
    <TableTransfer
      dataSource={questionList}
      targetKeys={targetKeys}
      disabled={false}
      showSearch
      rowKey={(record: QuestionDetailModel) => record.questionId}
      onChange={handleChange}
      filterOption={(inputValue, item) =>
        item.courseName.indexOf(inputValue) !== -1 ||
        // item.questionId.indexOf(inputValue) !== -1 ||
        item.questionName.indexOf(inputValue) !== -1 ||
        item.questionType.indexOf(inputValue) !== -1
      }
      leftColumns={leftTableColumns}
      rightColumns={rightTableColumns}
    />
  );
};

const mapStateToProps = ({
  teacherHomeworkEdit,
  loading,
}: {
  teacherHomeworkEdit: StateType;
  loading: any;
}) => ({
  teacherHomeworkEdit,
  loading: loading.effects['teacherHomeworkEdit/fetchQuestionDetail'],
});

export default connect(mapStateToProps)(QuestionDetail);
