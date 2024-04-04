import { useState } from 'react';
import styles from './Onemail.module.scss';
import { useGetMessageMutation, useUpdateMessageMutation } from '../../store/MovieApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Button, Spin } from 'antd';
import { useSendMessageMutation } from '../../store/MovieApi';
import { Modal, Input, message } from 'antd';
import { nanoid } from '@reduxjs/toolkit';
import TextArea from 'antd/es/input/TextArea';
import { SendMessageRequest } from '../../types';

const Onemail = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const myName = useAppSelector((state) => state.sliceMovie.myName);
  const [sendMessage] = useSendMessageMutation();
  const [theme, setTheme] = useState('');
  const [text, setText] = useState('');
  const { id, name } = useParams();
  const [getMessage, { data: dataMessage }] = useGetMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [messageZ, setMessage] = useState<SendMessageRequest | undefined>();

  //hooks
    //Нахождения почты в массиве
  useEffect(() => {
    if (dataMessage) {
      const mess = dataMessage.find((item) => {
        return item.id === id;
      });
      setMessage(mess);
    }
  }, [dataMessage]);

    //Получение почты и Обновление(read)почты
  useEffect(() => {
    getMessage({ username: myName });
    updateMessage({
      username: myName,
      id: id,
    });
  }, [myName]);

  //functions
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Message sent',
    });
  };

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
      username: name,
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

  const handlerTextTheme = ({ target: { value } }) => {
    setTheme(value);
  };

  const handlerTextArea = ({ target: { value } }) => {
    setText(value);
  };

  return (
    <>
      {messageZ ? (
        <div className={styles.container}>
          {contextHolder}
          <div className={styles.container__message}>{messageZ?.text}</div>
          <div className={styles.gr}>
            <Button onClick={showModal}>Reply to message</Button>
          </div>

          <Modal title="Send message" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className={styles.theme}>
              <Input value={theme} name="theme" onChange={handlerTextTheme} placeholder="Theme" />
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
        </div>
      ) : (
        <>
          <Spin className={styles.zagr} tip="Loading" size="large">
            <div data-testid="z" className="content" />
          </Spin>
        </>
      )}
    </>
  );
};

export default Onemail;
