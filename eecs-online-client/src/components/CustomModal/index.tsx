import React from 'react';
import { Modal } from 'antd';

interface CustomModalProps {
  title: string;
  width?: number;
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
}

const CustomModal: React.SFC<CustomModalProps> = ({
  okText,
  cancelText,
  title,
  children,
  onCancel,
  visible,
  onOk,
  width
}) => (
    <Modal
      title={title}
      visible={visible}
      centered
      width={width}
      destroyOnClose
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </Modal>
  )

CustomModal.defaultProps = {
  width: 650,
  okText: '确定',
  cancelText: '取消',
}

export default CustomModal;
