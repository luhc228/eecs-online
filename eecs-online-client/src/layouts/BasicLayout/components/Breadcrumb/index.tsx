import React from 'react';
import { Breadcrumb } from 'antd';
import Link from 'umi/link';
import breadcrumbConfig, { excludePaths } from '../../../../../config/breadcrumbConfig';
import styles from './index.less';

interface BreadcrumbProps {
  location: Location
}

const HeaderBreadcrumb: React.SFC<BreadcrumbProps> = props => {
  const { location } = props
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const breadcrumbItems: React.ReactNode[] = pathSnippets.map((_, index) => {
    const path: any = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    // 如果path在exclude path里面，或者是最后一个，表示不可点击，否则可以点击跳转
    if (excludePaths.includes(path)) {
      return null;
    }
    if (index === pathSnippets.length - 1) {
      return (
        <Breadcrumb.Item key={path}>
          <span>{breadcrumbConfig[path]}</span>
        </Breadcrumb.Item>
      );
    }
    return (
      <Breadcrumb.Item key={path}>
        <Link to={`${path}`}>{breadcrumbConfig[path]}</Link>
      </Breadcrumb.Item>
    );
  });

  return (
    <div className={styles.breadcrumb}>
      <Breadcrumb separator=">">{breadcrumbItems}</Breadcrumb>
    </div>
  )
}

export default HeaderBreadcrumb;
