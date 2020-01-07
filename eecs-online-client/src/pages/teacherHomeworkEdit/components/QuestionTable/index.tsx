import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'dva';
import { StateType } from '../../models';
import { UmiComponentProps } from '@/interfaces/components';
import TableTransfer from '@/components/TableTransfer';
import { QuestionDetailModel } from '@/interfaces/teacherHomeworkEdit';

export interface QuestionTableProps extends UmiComponentProps {
  teacherHomeworkEdit: StateType;
}

const QuestionTable: React.FC<QuestionTableProps> = ({ teacherHomeworkEdit, dispatch }) => {
  const { questionList, targetKeys, homeworkFormFields } = teacherHomeworkEdit;

  const leftTableColumns: ColumnProps<any>[] = [
    {
      dataIndex: 'questionTypeName',
      title: '题目类型',
    },
    {
      dataIndex: 'content',
      title: '题目内容',
      width: 150,
    },
    {
      dataIndex: 'questionScore',
      title: '题目分值',
    },
  ];

  const rightTableColumns: ColumnProps<any>[] = [
    {
      dataIndex: 'questionTypeName',
      title: '题目类型',
    },
    {
      dataIndex: 'content',
      title: '题目内容',
      width: 150,
    },
    {
      dataIndex: 'questionScore',
      title: '题目分值',
    },
  ];

  const handleChange = (nextTargetKeys: string[]) => {
    let homeworkScore = 0;
    const list: number[] = [];
    nextTargetKeys.forEach((key: string) => {
      const questionId = Number(key);
      const result = questionList.find(
        (questionItem: QuestionDetailModel) => questionItem.questionId === questionId
      );
      if (!result) {
        return;
      }
      const { questionScore } = result;

      homeworkScore += questionScore
      list.push(questionId);
    })

    dispatch({
      type: 'teacherHomeworkEdit/changeTargetKeys',
      payload: {
        targetKeys: nextTargetKeys,
      },
    });

    dispatch({
      type: 'teacherHomeworkEdit/changeTeacherHomeworkFormFields',
      payload: {
        data: {
          ...homeworkFormFields,
          homeworkScore,
        }
      }
    });

    dispatch({
      type: 'teacherHomeworkEdit/changeSelectQuestionList',
      payload: {
        data: list
      }
    });
  };

  return (
    <TableTransfer
      dataSource={questionList}
      targetKeys={targetKeys}
      disabled={false}
      showSearch
      rowKey={(record: QuestionDetailModel) => record.questionId.toString()}
      onChange={handleChange}
      filterOption={(inputValue, item) => (
        item.questionTypeName.indexOf(inputValue) !== -1 ||
        item.content.indexOf(inputValue) !== -1
      )
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
  loading: loading.effects['teacherHomeworkEdit/fetchCourseQuestionLib'],
});

export default connect(mapStateToProps)(QuestionTable);
