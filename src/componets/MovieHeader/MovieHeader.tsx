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
  useChatAllMutation,
  useGetEmailMutation,
  useGetMessageMutation,
} from '../../store/MovieApi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setEmailAll } from '../../store/sliceMovie';
import { ChatAllResponse } from '../../types';

const MovieHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myName = useAppSelector((state) => state.sliceMovie.myName);
  const [hidd, setHidd] = useState(false);
  const location = useLocation();
  const { data: dataApi } = useAuthApiQuery('');
  const [ChatAll, { data: dataChat }] = useChatAllMutation();
  const [cccvalue, setCccValue] = useState<ChatAllResponse[] | string>('');
  const [getUserApiSetTwo, { data: dataGetEmail }] = useGetEmailMutation({});
  const [mess, setMess] = useState(false);
  const [getMessage, { data: dataMessage }] = useGetMessageMutation();
  const [someFalse, setSomefalse] = useState(false);
  const placeholder = 'input text';

  //hooks
  useEffect(() => {
    getMessage({ username: myName });
  }, [getMessage, myName]);

  useEffect(() => {
    if (dataMessage) {
      if (pathname.includes('mail') || pathname.includes('onemail')) {
        setSomefalse(false);
      } else {
        var some = dataMessage.some((item) => item.read === false);
        setSomefalse(some);
      }
    }
  }, [dataMessage, pathname]);

  useEffect(() => {
    if (dataApi) {
      if (dataApi.username) {
        const data = {
          username: dataApi.username,
          time: new Date().toLocaleTimeString(),
        };
        ChatAll(data);
      }
    }
  }, [dataApi]);

  useEffect(() => {
    if (dataApi) {
      if (dataApi.username && dataApi.username !== undefined) {
        const interval = setInterval(() => {
          getUserApiSetTwo({ username: dataApi.username });
          const data = {
            username: dataApi.username,
            time: new Date().toLocaleTimeString(),
          };
          ChatAll(data);
        }, 600000);
        return () => clearInterval(interval);
      }
    }
  }, [dataApi]);

  useEffect(() => {
    if (dataChat) {
      const ccc = dataChat.filter((element) => element !== null);
      dispatch(setEmailAll(ccc));

      setCccValue(ccc);
    }
  }, [dataChat]);

  useEffect(() => {
    if (dataGetEmail !== undefined) {
      if (dataGetEmail < cccvalue.length) {
        setMess(true);
      } else {
        setMess(false);
      }
    }
  }, [dataGetEmail, cccvalue]);

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
            {mess && (
              <div>
                {' '}
                <FloatButton
                  icon={<CommentOutlined />}
                  description="New message in chat"
                  shape="square"
                  style={{ right: 24 }}
                  onClick={onClickMess}
                />
              </div>
            )}
            {someFalse && (
              <div>
                {' '}
                <FloatButton
                  icon={<CommentOutlined />}
                  description="New message in mail"
                  shape="square"
                  style={{ right: 24 }}
                  onClick={onClickMail}
                />
              </div>
            )}
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
