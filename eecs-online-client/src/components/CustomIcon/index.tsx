import React from 'react';

interface IconfontProps {
  name: string;
  classname?: string;
  onClick?: () => void;
}
/**自定义图标 */
const Iconfont: React.SFC<IconfontProps> = props => {
  return (
    <i
      onClick={props.onClick}
      className={`iconfont ${props.name || ''} ${props.classname || ''}`}
    />
  );
};

export default Iconfont;
