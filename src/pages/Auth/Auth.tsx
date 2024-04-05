import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import _ from "lodash";
import styles from "../../pages/Login/LoginPage.module.scss";
import { Input as AntdInput, Button as AndtdButton, message, Spin } from "antd";
import { LoginOutlined, DatabaseOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { FormInputs } from "../../types";
import { useRegistrApiSetMutation } from "../../store/MovieApi";

function Auth() {
  const [lama, setLama] = useState(false);
  const items: MenuProps["items"] = [
    {
      label: (
        <Link className={styles.lin} to="/login" rel="noopener noreferrer">
          Войти
        </Link>
      ),
      key: "mail",
      icon: <LoginOutlined />,
    },
    {
      label: (
        <Link className={styles.lin} to="/auth" rel="noopener noreferrer">
          Зарегистрироваться
        </Link>
      ),
      key: "alipay",
      icon: <DatabaseOutlined />,
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();
  const [current, setCurrent] = useState("alipay");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const [RegistrApiSet, result] = useRegistrApiSetMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });
  const onSubmit = async (data) => {
    setLama(true);
    try {
      await RegistrApiSet(data);
      setLama(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (result.error) {
      const info = () => {
        //@ts-ignore
        messageApi.info("Произошла ошибка! " + result.error.data.errors.errors[0].msg === 'Пароль не должен быть больше 4 и меньше 10 символов' ? 'Пароль не должен быть меньше 4 и больше 10 символов' : result.error.data.errors.errors[0].msg);
      };
      info();
    }
    if (result.data) {
      const infoSeccus = () => {
        messageApi.info("Успешно зарегестрировались!");
      };
      infoSeccus();
    }
  }, [result, messageApi]);

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
              render={({ field }) => (
                <AntdInput placeholder="Имя пользователя" {...field} />
              )}
              rules={{
                required: "Поле не может быть пустым",
                minLength: { value: 4, message: "Минимум 4 буквы" },
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
                  ? _.entries(messages).map(
                      ([type, message]: [string, string]) => (
                        <p className={styles.error} key={type}>
                          {message}
                        </p>
                      )
                    )
                  : null;
              }}
            />
          </div>

          <Controller
            render={({ field }) => (
              <AntdInput placeholder="Пароль" type="password" {...field} />
            )}
            rules={{
              required: "Поле не может быть пустым",
              minLength: { value: 4, message: "Минимум 4 буквы" },
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
                ? _.entries(messages).map(
                    ([type, message]: [string, string]) => (
                      <p className={styles.error} key={type}>
                        {message}
                      </p>
                    )
                  )
                : null;
            }}
          />
          <div className={styles.container__btn}>
            <AndtdButton type="primary" htmlType="submit">
              Отправить
            </AndtdButton>
          </div>
        </form>
        {lama && (
          <Spin className={styles.spin} tip="Загрузка..." size="large">
            <div className="content" />
          </Spin>
        )}
      </div>
    </>
  );
}

export default Auth;
