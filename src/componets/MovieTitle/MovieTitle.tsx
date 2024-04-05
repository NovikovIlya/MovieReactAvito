import React from 'react';
import styles from './MovieTitle.module.scss';
import { darkMode as darkModeAdd, setNumReduce } from '../../store/sliceMovie';
import { useAppDispatch } from '../../hooks/redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MovieTitle = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();



  const clickTitle = () => {
    dispatch(setNumReduce(1));
    if(location.pathname === '/'){
      window.location.reload();
    }
  };

  return (
    <>
      <div className={styles.themeSwitch}>
        <Link onClick={clickTitle} className={styles.lin} to="/">
          <img className={styles.imageStyle} src='https://i.ibb.co/7SpdwyL/12-Photoroom-png-Photoroom.png' alt='image'/>
        </Link>
      </div>
    </>
  );
};

export default MovieTitle;
