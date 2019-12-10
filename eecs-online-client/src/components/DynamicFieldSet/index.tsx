import React from 'react';
import { Button, Icon } from 'antd';
import { DynamicFieldSetProps } from '@/interfaces/components';

const DynamicFieldSet: React.SFC<DynamicFieldSetProps> = () => {
  const formItems = []
  const handleAdd = () => {

  }

  return (
    <>
      <>
        <Button type="dashed" onClick={handleAdd} style={{ width: '60%' }}>
          <Icon type="plus" /> Add field
        </Button>
      </>
    </>
  )
}

export default DynamicFieldSet;
