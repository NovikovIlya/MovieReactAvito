import React from 'react';
import { Outlet } from 'react-router-dom';
import MovieHeader from '../MovieHeader';
import styles from './Layout.module.scss'


const Layout = () => {
  return (
    <>
      <div >
        <div>
            <MovieHeader />
            <div className={styles.lay}></div>
            <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
