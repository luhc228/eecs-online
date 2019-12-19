import React from 'react';
import { Tabs } from 'antd';
import { QUESTION_TYPE } from '@/enums';
import { TabsContentProps } from '@/interfaces/components';
import LibFilter from './components/LibFilter';

const { TabPane } = Tabs;

const QuestionEdit: React.FC<{}> = props => {
  function callback(key) {
    console.log(key);
  }
  const tabsContent: TabsContentProps[] = [
    {
      tab: '单选题',
      key: QUESTION_TYPE.Single,
    },
    {
      tab: '多选题',
      key: QUESTION_TYPE.Multiple,
    },
    {
      tab: '判断题',
      key: QUESTION_TYPE.Judge,
    },
    {
      tab: '编程题',
      key: QUESTION_TYPE.Program,
    },
  ]

  return (
    <Tabs defaultActiveKey={QUESTION_TYPE.Single.toString()} onChange={callback}>
      {tabsContent.map((item: TabsContentProps) => (
        <TabPane tab={item.tab} key={item.key.toString()}>
          <LibFilter />
        </TabPane>
      ))}
    </Tabs>
  )
}


export default QuestionEdit;
