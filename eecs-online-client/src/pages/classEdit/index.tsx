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
import CustomCard from '@/components/CustomCard';

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
    <>
      <RouterPrompt when={when} />
      <CustomCard>
        <CustomForm
          layout="vertical"
          values={classDetail}
          formTypes={CUSTOM_FORM_TYPES.OneColumn}
          loading={false}
          onFieldsChange={handleFieldsChange}
          formConfig={formConfig}
          onSubmit={handleSubmit}
        >

        </CustomForm>
      </CustomCard>
    </>
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
