// import React from 'react';

// interface IconfontProps {
//   name: string;
//   classname?: string;
//   onClick?: () => void;
// }
// /**自定义图标 */
// const Iconfont: React.SFC<IconfontProps> = props => {
//   return (
//     <i
//       onClick={props.onClick}
//       className={`iconfont ${props.name || ''} ${props.classname || ''}`}
//     />
//   );
// };

// export default Iconfont;


import { Icon } from 'antd';
import * as React from 'react';

interface IconfontProps {
  name: string;
  onClick?: () => void;
}

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1432417_s4mn3v614o.js',
});

const CustomIcon: React.SFC<IconfontProps> = ({ name, onClick }) => (
  <IconFont type={name} />
)

export default CustomIcon;
