import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuthApiQuery, useLoginApiSetMutation } from '../../store/MovieApi';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';
import styles from './LoginPage.module.scss';
import { Input as AntdInput, Button as AndtdButton, message, Spin } from 'antd';
import { LoginOutlined, DatabaseOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleRender } from '../../store/sliceMovie';
import { FormInputs } from '../../types';

function LoginPage() {
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
        <Link className={styles.lin} to="/auth">
          Sign up
        </Link>
      ),
      icon: <DatabaseOutlined />,
      key: 'alipay',
    },
  ];
  const [lama, setLama] = useState(false);
  const [dis, setDis] = useState(false);
  const [current, setCurrent] = useState('mail');
  const [messageApi, contextHolder] = message.useMessage();
  const [LoginApiSet, result] = useLoginApiSetMutation();
  const { data: dataApi, refetch, isFetching } = useAuthApiQuery('');
  const renderValue = useAppSelector((state) => state.sliceMovie.render);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: 'all',
  });

  //hooks
  useEffect(() => {
    if (result.error) {
      const info = () => {
        messageApi.info('This user was not found!');
      };
      info();
    }
  }, [result, messageApi]);

  useEffect(() => {
    if (!isFetching) {
      dispatch(toggleRender());
    }
    if (dataApi) {
      navigate('/');
    }
  }, [dataApi, navigate, isFetching, dispatch]);

  //functions
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };
  const onSubmit = async (data) => {
    try {
      setLama(true);
      setDis(true);
      const tok = await LoginApiSet(data);

      if ('data' in tok) {
        localStorage.setItem('token', tok.data.token);
        refetch();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setDis(false);
      setLama(false);
      reset({ username: '', password: '' });
    }
  };
  const onSubmit1 = async () => {
    try {
      const time = new Date().toLocaleTimeString('ru-RU');
      setLama(true);
      const tok = await LoginApiSet({ username: 'papa123', password: 'papa321', time: time });
      if ('data' in tok) {
        localStorage.setItem('token', tok.data.token);
        refetch();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLama(false);
    }
  };

  //render
  if (!renderValue) {
    return (
      <>
        <div className={styles.render}>
          <p>Please wait, the server is waking up on Render (about 30 sec)</p>
        </div>
      </>
    );
  }

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
                shouldUnregister: false,
              }}
              name="username"
              disabled={dis}
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
            render={({ field }) => (
              <AntdInput disabled={dis} placeholder="Password" type="password" {...field} />
            )}
            rules={{
              required: 'Field cannot be empty',
              minLength: { value: 4, message: 'Minimum 4 characters' },
            }}
            disabled={dis}
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
          <div className={styles.container__btn}>
            <AndtdButton type="primary" htmlType="button" onClick={onSubmit1}>
              Enter test user
            </AndtdButton>
          </div>
        </form>

        {lama && (
          <>
            <Spin className={styles.spin} tip="Loading" size="large">
              <div className="content" />
            </Spin>
            <div className={styles.spin2}>
              Please wait, the server is waking up on Render (about 30 sec)
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default LoginPage;
