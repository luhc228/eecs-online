import Link from 'umi/link';
import React from 'react';
import logo from '@/assets/logo.svg';
import Footer from './components/Footer';
import styles from './index.less';

const UserLayout: React.SFC<{}> = props => {
  const {
    children,
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>EECS在线判分系统</span>
            </Link>
          </div>
          <div className={styles.desc}>{}</div>
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
