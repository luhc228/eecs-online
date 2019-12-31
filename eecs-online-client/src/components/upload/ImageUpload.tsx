import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Upload, Icon, message, Spin, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import appConfig from '@/appConfig';

export interface ImageUploadProps extends FormComponentProps {
  name?: string;
  multiple?: boolean;
  action?: string;
  onChange?: () => void;
}

const ImageUpload = forwardRef<FormComponentProps, ImageUploadProps>(
  (props: ImageUploadProps, ref) => {
    useImperativeHandle(ref, () => ({
      form: props.form
    }));

    const [loading, setLoading] = useState(false);

    const handleChange = (info: any) => {
      const { status } = info.file;
      if (status !== 'uploading') {
        setLoading(true);
      }

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setLoading(false);
      } else if (status === 'error') {
        setLoading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    return (
      <Spin tip="Uoloading..." spinning={loading}>
        <Upload
          onChange={handleChange}
          listType="picture"
          {...props}
        >
          <Button>
            <Icon type="upload" />Click to upload
        </Button>
        </Upload>
      </Spin>
    )
  }
)

ImageUpload.defaultProps = {
  name: 'file',
  multiple: false,
  action: appConfig.uploadUrl,
}

export default ImageUpload;
