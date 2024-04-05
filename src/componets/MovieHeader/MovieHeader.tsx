import { useState } from 'react';
import MovieTitle from '../MovieTitle/MovieTitle';
import Search from '../Search/Search';
import styles from './Movie.module.scss';
import UserInfo from '../UserInfo/UserInfo';
import { Divider, FloatButton } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CommentOutlined } from '@ant-design/icons';
import {
  useAuthApiQuery,

} from '../../store/MovieApi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';



const MovieHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myName = useAppSelector((state) => state.sliceMovie.myName);
  const [hidd, setHidd] = useState(false);
  const location = useLocation();
  const { data: dataApi } = useAuthApiQuery('');


  const placeholder = 'input text';

  //hooks
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/auth') {
      setHidd(true);
    } else {
      setHidd(false);
    }
  }, [location.pathname]);

  //functions
  const onClickMess = () => {
    navigate(`/chat?name=${dataApi.username}&room=main`);
  };
  const onClickMail = () => {
    navigate(`/mail`);
  };

  return (
    <div className={hidd ? styles.hiddenZ : ''}>
      {
        <div className={styles.main}>
          <div>
          
          </div>
          <div className={styles.container}>
            <div className={styles.title}>
              <MovieTitle />
            </div>
            <div className={styles.search}>
              <Search placeholder={placeholder} />
            </div>
            <div className={styles.userInfo}>
              <UserInfo />
            </div>
          </div>
          <div className={styles.container3}>
            <Divider className={styles.divi} />
          </div>
        </div>
      }
    </div>
  );
};

export default MovieHeader;
