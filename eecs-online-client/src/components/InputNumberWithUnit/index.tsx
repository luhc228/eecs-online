import React from 'react';
import { InputNumber } from 'antd';
import styles from './index.less';

interface InputNumberWithUnitProps {
  unit: string;
  max?: number;
  disabled?: boolean;
  value?: number | undefined;
  onChange?: (value: number | undefined) => void;
}

const InputNumberWithUnit: React.SFC<InputNumberWithUnitProps> = ({ unit, value, max, disabled, onChange }) => {

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

export default InputNumberWithUnit;
