import React, { forwardRef, useImperativeHandle } from 'react';
import { InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import styles from './index.less';

export interface InputNumberWithUnitProps extends FormComponentProps {
  unit?: string;
  max?: number;
  disabled?: boolean;
  value?: number;
  onChange?: (value?: number) => void;
}

const InputNumberWithUnit = forwardRef<FormComponentProps, InputNumberWithUnitProps>(
  ({ unit, value, max, disabled, onChange, form }: InputNumberWithUnitProps, ref) => {
    useImperativeHandle(ref, () => ({
      form
    }));

    return (
      <div className={styles.wrap}>
        <InputNumber
          min={0}
          max={max}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={disabled ? '' : '请输入'}
        />
        <span className={styles.unit}>{unit}</span>
      </div>
    )
  }
)

export default InputNumberWithUnit;
