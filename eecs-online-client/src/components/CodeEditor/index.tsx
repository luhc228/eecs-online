import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

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
    <div style={{ display: 'block' }}>
      <AceEditor
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
    // <div style={{ maxHeight: 400, overflow: 'auto' }}>
    //   <Editor
    //     value="111"
    //     onValueChange={handleCodeChange}
    //     highlight={code => highlight(code, languages.js)}
    //     padding={10}
    //     style={{
    //       fontFamily: '"Fira code", "Fira Mono", monospace',
    //       fontSize: 12,
    //     }}
    //   />
    // </div>
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
