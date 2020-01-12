import React, { forwardRef, useImperativeHandle } from 'react';
import AceEditor from 'react-ace';
import { FormComponentProps } from 'antd/lib/form/Form';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

export interface CodeEditorProps extends FormComponentProps {
  value?: string;
  onChange?: Function;
  readOnly?: boolean;
}

const CodeEditor = forwardRef<FormComponentProps, CodeEditorProps>(
  ({ value, onChange, readOnly, form }: CodeEditorProps, ref) => {
    useImperativeHandle(ref, () => ({
      form
    }));

    const handleCodeChange = (newValue: string) => {
      if (onChange) {
        onChange(newValue);
      }
    }

    return (
      <div style={{ display: 'block' }}>
        <AceEditor
          readOnly={readOnly}
          mode="python"
          theme="github"
          value={value}
          onChange={handleCodeChange}
          name="program"
          width="80%"
          fontSize={16}
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    )
  }
)

CodeEditor.defaultProps = {
  readOnly: false
}

export default CodeEditor;
