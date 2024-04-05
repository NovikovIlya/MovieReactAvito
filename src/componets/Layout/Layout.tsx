import React from 'react';
import { Outlet } from 'react-router-dom';
import MovieHeader from '../MovieHeader';



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
