/**
 * 班级信息查看、新增和编辑共用页面
 */
import React, { useState } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ColumnProps } from 'antd/es/table';
import TableTransfer from '@/components/TableTransfer';
import RouterPrompt from '@/components/RouterPrompt';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT } from '@/enums';
import { FormItemComponentProps } from '@/interfaces/components';
import { StateType } from './models';

const mockData: any[] = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 4 === 0,
  });
}

const formConfig: FormItemComponentProps[] = [
  {
    label: '虚拟班级名称',
    name: 'className',
    component: FORM_COMPONENT.Input,
    required: true,
  },
]
const leftTableColumns: ColumnProps<any>[] = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];

const rightTableColumns: ColumnProps<any>[] = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
];

interface ClassEditProps {
  classEdit: StateType,
  dispatch: Dispatch<any>,
  location: Location
}

const ClassEdit: React.FC<ClassEditProps> = ({ classEdit, location }) => {
  const originTargetKeys: any[] = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

  const [targetKeys, changeTargetKeys] = useState(originTargetKeys);

  const handleChange = (nextTargetKeys: string[]) => {
    // console.log(nextTargetKeys);
    // console.log(direction);
    // console.log(moveKeys);
    changeTargetKeys(nextTargetKeys);
  }

  const handleSubmit = (allFields: object) => {
    const isCreate = location.pathname.split('/')[3] === 'create';
    console.log(allFields);
  }

  const handleFieldsChange = () => {

  }
  const { classDetail, when } = classEdit;
  return (
    <div style={{ padding: '20px 0' }}>
      <RouterPrompt when={when} />
      <CustomForm
        layout="horizontal"
        values={classDetail}
        formTypes={CUSTOM_FORM_TYPES.TwoColumn}
        loading={false}
        onFieldsChange={handleFieldsChange}
        formConfig={formConfig}
        onSubmit={handleSubmit}
      >
        <TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          disabled={false}
          showSearch
          onChange={handleChange}
          filterOption={(inputValue, item) => item.title.indexOf(inputValue) !== -1

          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
      </CustomForm>
    </div>
  )
}

const mapStateToProps = ({
  classEdit,
  router,
}: {
  classEdit: StateType,
  router: {
    location: Location
  },
}) => ({
  classEdit,
  location: router.location,
})

export default connect(mapStateToProps)(ClassEdit);
