import React, { ChangeEventHandler } from 'react';
import { Input, Icon, Row } from 'antd';
import styles from './index.less';

export interface DynamicFieldSetProps {
  handleAdd?: () => void;
  handleDelete?: (k: number) => void;
  value?: string;
  dynamicKey?: number;
  onChange?: ChangeEventHandler<any>;
}

const DynamicFieldSet: React.SFC<DynamicFieldSetProps> = (props) => {
  const {
    handleAdd,
    handleDelete,
    dynamicKey,
    onChange,
    value,
  } = props;
  return (
    <Row>
      <Input
        placeholder="请输入"
        style={{ width: '80%', marginRight: 8 }}
        onChange={onChange}
        value={value}
      />
      {dynamicKey !== undefined && <Icon
        className={styles.dynamicButton}
        type="minus-circle"
        onClick={() => handleDelete(dynamicKey)}
      />}
      <Icon
        className={styles.dynamicButton}
        type="plus-circle"
        onClick={() => handleAdd()}
      />
    </Row>
  )
}


export default DynamicFieldSet;
