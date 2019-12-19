import React from 'react';
import { Tabs, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { QUESTION_TYPE } from '@/enums';
import { TabsContentProps, UmiComponentProps } from '@/interfaces/components';
import LibFilter from './components/LibFilter';
import LibTable from './components/LibTable';
import { StateType } from './models';
import styles from './index.less';

const { TabPane } = Tabs;

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
    })
  }

  function handleCreate() {
    router.push('/teacher/question-lib/create')
  }

  const tabsContent: TabsContentProps[] = [
    {
      tab: questionTypeMap[QUESTION_TYPE.Single],
      key: QUESTION_TYPE.Single,
    },
    {
      tab: questionTypeMap[QUESTION_TYPE.Multiple],
      key: QUESTION_TYPE.Multiple,
    },
    {
      tab: questionTypeMap[QUESTION_TYPE.Judge],
      key: QUESTION_TYPE.Judge,
    },
    {
      tab: questionTypeMap[QUESTION_TYPE.Program],
      key: QUESTION_TYPE.Program,
    },
  ];

  return (
    <Tabs
      activeKey={currentTabKey ? currentTabKey.toString() : QUESTION_TYPE.Single.toString()}
      onChange={callback}
    >
      {tabsContent.map((item: TabsContentProps) => (
        <TabPane tab={item.tab} key={item.key.toString()}>
          <LibFilter />
          <div className={styles.buttons}>
            <Button type="primary" onClick={handleCreate}>新增题目</Button>
          </div>
          <LibTable />
        </TabPane>
      ))}
    </Tabs>
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
