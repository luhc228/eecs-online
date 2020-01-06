import React, { ChangeEventHandler, forwardRef, useImperativeHandle } from 'react';
import { Input, Icon, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import styles from './index.less';

export interface DynamicFieldSetProps extends FormComponentProps {
  handleAdd?: () => void;
  handleDelete?: (k: number) => void;
  value?: string;
  dynamicKey?: number;
  onChange?: ChangeEventHandler<any>;
}

const DynamicFieldSet = forwardRef<FormComponentProps, DynamicFieldSetProps>(
  ({ handleAdd,
    handleDelete,
    dynamicKey,
    onChange,
    value,
    form
  }: DynamicFieldSetProps, ref) => {
    useImperativeHandle(ref, () => ({
      form
    }));

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
)

export default DynamicFieldSet;
