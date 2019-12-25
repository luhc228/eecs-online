import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { CardTabListType } from 'antd/es/card';
import { QUESTION_TYPE } from '@/enums';
import { UmiComponentProps } from '@/interfaces/components';
import LibFilter from './components/LibFilter';
import LibTable from './components/LibTable';
import { StateType } from './models';
import CustomCard from '@/components/CustomCard';
import { PAGINATION_CONFIGS } from '@/constants';

interface QuestionEditProps extends UmiComponentProps {
  questionLib: StateType
}

export const questionTypeMap = {
  [QUESTION_TYPE.Single]: '单选题',
  [QUESTION_TYPE.Multiple]: '多选题',
  [QUESTION_TYPE.Judge]: '判断题',
  [QUESTION_TYPE.Program]: '编程题',
}

const QuestionLib: React.FC<QuestionEditProps> = ({ dispatch, questionLib }) => {
  const { currentTabKey, filterFields } = questionLib;
  function callback(key: string) {
    dispatch({
      type: 'questionLib/changecurrentTabKey',
      payload: {
        currentTabKey: Number(key),
      }
    });

    dispatch({
      type: 'questionLib/fetchQuestionLibPagination',
      payload: {
        data: {
          ...PAGINATION_CONFIGS,
          ...filterFields,
          questionType: Number(key),
        }
      }
    })
  }

  function handleCreate() {
    router.push('/teacher/question-lib/create')
  }

  const tabsContent: CardTabListType[] = [
    {
      tab: questionTypeMap[QUESTION_TYPE.Single],
      key: QUESTION_TYPE.Single.toString(),
    },
    {
      tab: questionTypeMap[QUESTION_TYPE.Multiple],
      key: QUESTION_TYPE.Multiple.toString(),
    },
    {
      tab: questionTypeMap[QUESTION_TYPE.Judge],
      key: QUESTION_TYPE.Judge.toString(),
    },
    {
      tab: questionTypeMap[QUESTION_TYPE.Program],
      key: QUESTION_TYPE.Program.toString(),
    },
  ];

  return (
    <CustomCard
      tabList={tabsContent}
      tabBarExtraContent={<Button type="primary" onClick={handleCreate}>新增题目</Button>}
      activeTabKey={currentTabKey ? currentTabKey.toString() : QUESTION_TYPE.Single.toString()}
      onTabChange={callback}
    >
      <LibFilter />
      <LibTable />
    </CustomCard>
  )
}

const mapStateToProps = ({
  questionLib
}: {
  questionLib: StateType
}) => ({
  questionLib
});

export default connect(mapStateToProps)(QuestionLib);
