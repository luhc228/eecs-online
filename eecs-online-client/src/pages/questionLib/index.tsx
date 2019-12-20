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
  const { currentTabKey } = questionLib;
  function callback(key: string) {
    dispatch({
      type: 'questionLib/changecurrentTabKey',
      payload: {
        currentTabKey: Number(key),
      }
    });
    // TODO: add fetch pagination
    // dispatch({
    //   type: 'questionLib/fetchQuestionLibPagination',
    //   payload: {
    //     currentTabKey: Number(key),
    //   }
    // })
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
    // <Tabs
    //   activeKey={currentTabKey ? currentTabKey.toString() : QUESTION_TYPE.Single.toString()}
    //   onChange={callback}
    // >
    //   {tabsContent.map((item: TabsContentProps) => (
    //     <TabPane tab={item.tab} key={item.key.toString()}>
    //       <LibFilter />

    //       <CustomCard
    //         extra={
    //           <Button type="primary" onClick={handleCreate}>新增题目</Button>}
    //       >
    //         <LibTable />
    //       </CustomCard>

    //     </TabPane>
    //   ))}
    // </Tabs>
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
