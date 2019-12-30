/**
 * 班级信息查看、新增和编辑共用页面
 */
import React from 'react';
import { connect } from 'dva';
import RouterPrompt from '@/components/RouterPrompt';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT } from '@/enums';
import { FormItemComponentProps, UmiComponentProps } from '@/interfaces/components';
import { StateType } from './models';
import CustomCard from '@/components/CustomCard';
import StudentDetail from './components/StudentDetail';

const formConfig: FormItemComponentProps[] = [
  {
    label: '班级名称',
    name: 'className',
    component: FORM_COMPONENT.Input,
    required: true,
  },
]

interface ClassEditProps extends UmiComponentProps {
  classEdit: StateType,
  location: Location
}

const ClassEdit: React.FC<ClassEditProps> = ({ classEdit, location, dispatch }) => {
  const { when, targetKeys, classDetailFields } = classEdit;
  const { query } = location;

  const handleSubmit = (allFields: object) => {
    const isCreate = location.pathname.split('/')[3] === 'create';
    if (isCreate) {
      dispatch({
        type: 'classEdit/createClass',
        payload: {
          data: {
            ...allFields,
            studentIdList: targetKeys
          }
        },
      })
    } else {
      let { classId } = query;
      if (typeof classId === 'string') {
        classId = Number(classId)
      }
      dispatch({
        type: 'classEdit/updateClass',
        payload: {
          data: {
            ...allFields,
            studentIdList: targetKeys,
            classId,
          }
        },
      })
    }
  }

  // const handleFieldsChange = (allFields: object) => {
  //   dispatch({
  //     type: 'classEdit/changeClassDetailFields',
  //     payload: {
  //       data: {
  //         ...allFields
  //       }
  //     }
  //   })
  // }

  return (
    <>
      <RouterPrompt when={when} />
      <CustomCard>
        <CustomForm
          layout="vertical"
          values={classDetailFields}
          formTypes={CUSTOM_FORM_TYPES.OneColumn}
          loading={false}
          // TODO: bug: when add this fieldsChange function the error will disappear
          onFieldsChange={() => { }}
          formConfig={formConfig}
          onSubmit={handleSubmit}
        >
          <StudentDetail />
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
