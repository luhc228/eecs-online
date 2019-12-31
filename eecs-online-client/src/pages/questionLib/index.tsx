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
  [QUESTION_TYPE.judge]: '判断题',
  [QUESTION_TYPE.single]: '单选题',
  [QUESTION_TYPE.multiple]: '多选题',
  [QUESTION_TYPE.program]: '编程题',
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
    dispatch({
      type: 'questionLibEdit/changeQuestionFields',
      payload: {
        data: {}
      }
    });

    router.push('/teacher/question-lib/create')
  }

  const tabsContent: CardTabListType[] = [
    {
      tab: questionTypeMap[QUESTION_TYPE.single],
      key: QUESTION_TYPE.single.toString(),
    },
    {
      tab: questionTypeMap[QUESTION_TYPE.multiple],
      key: QUESTION_TYPE.multiple.toString(),
    },
    {
      tab: questionTypeMap[QUESTION_TYPE.judge],
      key: QUESTION_TYPE.judge.toString(),
    },
    {
      tab: questionTypeMap[QUESTION_TYPE.program],
      key: QUESTION_TYPE.program.toString(),
    },
  ];

  return (
    <CustomCard
      tabList={tabsContent}
      tabBarExtraContent={<Button type="primary" onClick={handleCreate}>新增题目</Button>}
      activeTabKey={currentTabKey ? currentTabKey.toString() : QUESTION_TYPE.single.toString()}
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
