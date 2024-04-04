import React from 'react';
import { Outlet } from 'react-router-dom';
import MovieHeader from '../MovieHeader';
import { useAppSelector } from '../../hooks/redux';
import cn from 'classnames';
import styles from '../App/App.module.scss';
import stylesDark from '../App/AppDark.module.scss';
import { useAuthApiQuery } from '../../store/MovieApi';


const Layout = () => {


  return (
    <>
      <div >
        <div >
          <>
            <MovieHeader />

            <div style={{ height: '150px' }}></div>
            <Outlet />
          </>
        </div>
      </div>
    </>
  );
};

export default Layout;
