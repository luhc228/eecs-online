import React from 'react';
import { Modal } from 'antd';

interface CustomModalProps {
  title: string;
  width?: number;
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
}

const CustomModal: React.SFC<CustomModalProps> = ({ title, children, onCancel, visible, onOk }) => (
  <Modal
    title={title}
    visible={visible}
    centered
    destroyOnClose
    onOk={onOk}
    onCancel={onCancel}
  >
    {children}
  </Modal>
)

CustomModal.defaultProps = {
  width: 650,
}

export default CustomModal;
