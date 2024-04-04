import React from 'react';
import styles from './MovieTitle.module.scss';
import { Switch } from 'antd';
import { darkMode as darkModeAdd, setNumReduce } from '../../store/sliceMovie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MovieTitle = () => {
  const location = useLocation();
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  const dispatch = useAppDispatch();

  const onChange = (checked: boolean) => {
    dispatch(darkModeAdd());
  };

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
        {/* <Switch defaultChecked={darkMode} className={styles.switch} onChange={onChange} /> */}
      </div>
    </>
  );
};

export default MovieTitle;
