import { useEffect, useState } from 'react';
import styles from './Info.module.scss';
import { useGetUserApiSetMutation, useSendMessageMutation } from '../../store/MovieApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Spin, Modal, Input, message } from 'antd';
import { useAppSelector } from '../../hooks/redux';
import { nanoid } from '@reduxjs/toolkit';

const { TextArea } = Input;

const Info = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const myName = useAppSelector((state) => state.sliceMovie.myName);
  const { name } = useParams();
  const [getUserApiSet, { data, isLoading }] = useGetUserApiSetMutation();
  const [sendMessage] = useSendMessageMutation();
  const [theme, setTheme] = useState('');
  const [text, setText] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const placeholderImage = 'https://cdn-icons-png.flaticon.com/512/219/219983.png';

  //hooks
  useEffect(() => {
    const getUser = () => {
      getUserApiSet({ username: name });
    };
    getUser();
  }, [getUserApiSet, name]);

  //functions
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'You cant send an empty message',
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (theme.length < 1 || text.length < 1) {
      error();
      return;
    }
    const dataZ = {
      id: nanoid(),
      username: data.username,
      myname: myName,
      theme: theme,
      text: text,
      date: new Date().toISOString().slice(0, 10).split('-').reverse().join('.'),
      time: new Date().toLocaleTimeString(),
      read: false,
    };
    sendMessage(dataZ);
    success();
    setTheme('');
    setText('');
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onErr = (error) => {
    error.target.src = placeholderImage;
  };
  const handlerTextTheme = ({ target: { value } }) => {
    setTheme(value);
  };
  const handlerTextArea = ({ target: { value } }) => {
    setText(value);
  };
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Message sent',
    });
  };

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <>
          <div className={styles.zagr}>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </div>
        </>
      ) : (
        <div className={styles.container}>
          {data && (
            <>
              <div className={styles.el}>Username:</div>
              <div className={styles.el}>{data.username}</div>
              <div className={styles.el}>Avatar:</div>
              <div className={styles.el}>
                <img
                  className={styles.ava}
                  src={`https://backmovie.onrender.com${data?.avatar}`}
                  alt="no"
                  onError={onErr}
                />
              </div>
              <div className={styles.el}>Information:</div>
              <div className={styles.el}>{data.info}</div>
              <div className={styles.el}> Roles:</div>
              <div className={styles.el}>
                {data.roles.map((item) => {
                  return item;
                })}
              </div>

              <div className={styles.gr}>
                <Button onClick={showModal}>Send message</Button>
              </div>

              <Modal
                title="Send message"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <div className={styles.theme}>
                  <Input
                    value={theme}
                    name="theme"
                    onChange={handlerTextTheme}
                    placeholder="Theme"
                  />
                </div>
                <div className={styles.text}>
                  <TextArea
                    value={text}
                    name="area"
                    onChange={handlerTextArea}
                    rows={4}
                    placeholder="Message"
                    maxLength={60}
                  />
                </div>
              </Modal>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Info;
