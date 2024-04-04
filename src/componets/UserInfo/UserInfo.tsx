import {
  DownOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  StarOutlined,
  UserOutlined,
  WechatOutlined,
  UsergroupAddOutlined,
  MailOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { auth } from '../../store/MovieApi';
import styles from './UserInfo.module.scss';
import { setClosed } from '../../store/sliceMovie';

type MenuItem = Required<MenuProps>['items'][number];

const UserInfo = () => {
  const navigate = useNavigate();
  const { data: dataApi, refetch } = auth.useAuthApiQuery('');
  const dispatch = useAppDispatch();
  const exitFnc = () => {
    localStorage.setItem('token', '');
    dispatch(auth.util.resetApiState());
    refetch();
    dispatch(setClosed(false));
    navigate('/login');
  };
  const handleMenuClick: MenuProps['onClick'] = (e) => {
  };
  const items: MenuProps['items'] = [
    getItem(
      <Link className={styles.lin} to="/">
        Home
      </Link>,
      '1',
      <HomeOutlined />,
    ),
    getItem(
      <Link className={styles.lin} to="/profile">
        Profile
      </Link>,
      '5',
      <UserOutlined />,
    ),
    getItem(
      <Link className={styles.lin} to="/favorites">
        Favorite
      </Link>,
      '3',
      <StarOutlined />,
    ),

    getItem(<div onClick={exitFnc}>Exit</div>, '6', <LogoutOutlined />),
    ,
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  //functions
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  return (
    <div className={styles.container}>
      <Dropdown className={styles.menu} menu={menuProps}>
        <Button>
          <Space>
            <MenuOutlined />
            Меню
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserInfo;
