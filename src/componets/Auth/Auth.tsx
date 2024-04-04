import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';
import styles from '../Login/LoginPage.module.scss';
import { Input as AntdInput, Button as AndtdButton, message, Spin } from 'antd';
import { LoginOutlined, DatabaseOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { FormInputs } from '../../types';
import { useRegistrApiSetMutation } from '../../store/MovieApi';


function Auth() {
  const [lama,setLama] = useState(false)
  const items: MenuProps['items'] = [
    {
      label: (
        <Link className={styles.lin} to="/login" rel="noopener noreferrer">
          Login
        </Link>
      ),
      key: 'mail',
      icon: <LoginOutlined />,
    },
    {
      label: (
        <Link className={styles.lin} to="/auth" rel="noopener noreferrer">
          Sign up
        </Link>
      ),
      key: 'alipay',
      icon: <DatabaseOutlined />,
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();
  const [current, setCurrent] = useState('alipay');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const [RegistrApiSet, result] = useRegistrApiSetMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: 'all',
  });
  const onSubmit = async (data) => {
    setLama(true)
    try {
       await RegistrApiSet(data);
       setLama(false)
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    if (result.error) {
      const info = () => {
        messageApi.info('This user was not found!');
      };
      info();
    }
    if (result.data) {
      const infoSeccus = () => {
        messageApi.info('Succesful!');
      };
      infoSeccus();
    }
  }, [result,messageApi]);

  return (
    <>
      {contextHolder}
      <Menu
        className={styles.menu}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div className={styles.Main}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <Controller
            render={({ field }) => <AntdInput placeholder="Username" {...field} />}
            rules={{
              required: 'Field cannot be empty',
              minLength: { value: 4, message: 'Minimum 4 characters' },
            }}
            name="username"
            control={control}
            defaultValue=""
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ messages }) => {
              return messages
                ? _.entries(messages).map(([type, message]: [string, string]) => (
                    <p className={styles.error} key={type}>
                      {message}
                    </p>
                  ))
                : null;
            }}
          />
        </div>

        <Controller
          render={({ field }) => <AntdInput placeholder="Password" type="password" {...field} />}
          rules={{
            required: 'Field cannot be empty',
            minLength: { value: 4, message: 'Minimum 4 characters' },
          }}
          name="password"
          control={control}
          defaultValue=""
        />

        <ErrorMessage
          errors={errors}
          name="password"
          render={({ messages }) => {
            return messages
              ? _.entries(messages).map(([type, message]: [string, string]) => (
                  <p className={styles.error} key={type}>
                    {message}
                  </p>
                ))
              : null;
          }}
        />
        <div className={styles.container__btn}>
          <AndtdButton type="primary" htmlType="submit">
            Send
          </AndtdButton>
        </div>
      </form>
      {lama&&     <Spin className={styles.spin} tip="Loading" size="large">
            <div className="content" />
          </Spin>}
      </div>
    </>
  );
}

export default Auth;
