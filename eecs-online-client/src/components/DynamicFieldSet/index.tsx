import React, { ChangeEventHandler } from 'react';
import { Input, Icon } from 'antd';

export interface DynamicFieldSetProps {
  handleAdd?: () => void;
  handleDelete?: (k: number) => void;
  dynamicKey?: number;
  onChange?: ChangeEventHandler<any>;
}

const DynamicFieldSet: React.SFC<DynamicFieldSetProps> = (props) => {
  const {
    handleAdd,
    handleDelete,
    dynamicKey,
    onChange,
  } = props;
  return (
    <div>
      <Input
        placeholder="请输入"
        style={{ width: '80%', marginRight: 8 }}
        onChange={onChange}
      />
      {dynamicKey && dynamicKey > 0 ? (
        <Icon
          type="minus-circle"
          onClick={() => handleDelete(dynamicKey)}
        />
      ) : null}
      <Icon
        type="plus-circle"
        onClick={() => handleAdd()}
      />
    </div>
  )
}


export default DynamicFieldSet;
