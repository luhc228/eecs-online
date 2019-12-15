/**
 * 班级信息查看、新增和编辑共用页面
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Icon } from 'antd';
import { Dispatch } from 'redux';
import { ColumnProps } from 'antd/es/table';
import RouterPrompt from '@/components/RouterPrompt';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT } from '@/enums';
import { FormItemComponentProps } from '@/interfaces/components';
import { StateType } from './models';
import CustomTable from '@/components/CustomTable';
import StudentListModal from './components/StudentTableModal';
import StudentTable from './components/StudentTable';

const formConfig: FormItemComponentProps[] = [
  {
    label: '班级名称',
    name: 'className',
    component: FORM_COMPONENT.Input,
    required: true,
  },
]

const columns: ColumnProps<any>[] = [
  {
    dataIndex: 'college',
    title: '学院',
  },
  {
    dataIndex: 'studentClass',
    title: '班级',
  },
  {
    dataIndex: 'studentName',
    title: '学生姓名',
  },
  {
    dataIndex: 'studentId',
    title: '学号',
  },
  {
    dataIndex: 'operation',
    title: '操作',
    // render: () => {

    // }
  }
];

interface ClassEditProps {
  classEdit: StateType,
  dispatch: Dispatch<any>,
  location: Location
}

const ClassEdit: React.FC<ClassEditProps> = ({ classEdit, location, dispatch }) => {
  const { classDetail, when, studentList, targetKeys } = classEdit;

  const handleChange = (nextTargetKeys: string[]) => {
    dispatch({
      type: 'classEdit/changeTargetKeys',
      payload: { nextTargetKeys },
    })
  }

  const handleSubmit = (allFields: object) => {
    const isCreate = location.pathname.split('/')[3] === 'create';
    if (isCreate) {
      dispatch({
        type: 'classEdit/createClass',
        payload: { ...allFields },
      })
    } else {
      dispatch({
        type: 'classEdit/updateClass',
        payload: { ...allFields },
      })
    }
  }

  const handleFieldsChange = () => {

  }

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
        {/* <TableTransfer
          rowKey={(record: StudentDetailModel) => record.studentId}
          dataSource={studentList}
          targetKeys={targetKeys}
          disabled={false}
          showSearch
          onChange={handleChange}
          filterOption={(inputValue, item) => item.title.indexOf(inputValue) !== -1}
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        >
          <TableFilter />
        </TableTransfer> */}
        {/* 
        <CustomTable
          loading={false}
          columns={columns}
          dataSource={[]}
          rowKey={record => record.studentId}
          onPagination={(current: number) => {
            console.log(current);
          }}
        /> */}
        <StudentTable />
        <StudentListModal record={{}}>
          <Button type="dashed" onClick={() => { }} style={{ width: '100%' }}>
            <Icon type="plus" /> 添加学生
          </Button>
        </StudentListModal>
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
