import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

export interface CodeEditorProps {
  value?: string;
  onChange?: Function;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const handleCodeChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  }
  return (
    <div style={{ display: 'block', height: '800px !important' }}>
      <AceEditor

        mode="python"
        theme="github"
        value={value}
        onChange={handleCodeChange}
        name="program"
        width="80%"
        fontSize={16}
        style={{ display: 'block' }}
        editorProps={{ $blockScrolling: true }}
      />
    </div>

  )
}

export default CodeEditor;

// import React from 'react';
// import { UnControlled as CodeMirror } from 'react-codemirror2'
// import './index.less'

// export interface CodeEditorProps {
//   value?: string;
//   onChange?: Function;
// }

// const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
//   const handleCodeChange = (_: any, __: any, newValue: string) => {
//     if (onChange) {
//       onChange(newValue);
//     }
//   }

//   return (
//     <CodeMirror
//       value={value}
//       options={{
//         mode: 'python',
//         theme: 'material',
//         lineNumbers: true
//       }}

//       onChange={handleCodeChange}
//     />
//   )
// }

// export default CodeEditor;
