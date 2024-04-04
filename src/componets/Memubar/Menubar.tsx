import React, { useEffect, useState } from 'react';
import styles from './Menubar.module.scss';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link, useLocation } from 'react-router-dom';
import { TrophyOutlined, StarOutlined } from '@ant-design/icons';
import { toggleDropdown } from '../../store/sliceMovie';

const Menubar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [puk, setPuk] = useState(true);
  const numerKey = useAppSelector((state) => state.sliceMovie.dropdown);
  const items: MenuProps['items'] = [
    {
      label: (
        <Link className={styles.lin} to="/" target="_blank" rel="noopener noreferrer">
          All
        </Link>
      ),
      icon: <StarOutlined />,
      key: 'alipay',
    },
    {
      label: (
        <Link className={styles.lin} to="/popular" rel="noopener noreferrer" target="_blank">
          Popular
        </Link>
      ),
      key: 'mail',
      icon: <TrophyOutlined />,
    },
  ];

  useEffect(() => {
    let url = location;
    if (url.pathname === '/popular' || url.pathname === '/') {
      setPuk(true);
    } else {
      setPuk(false);
      return;
    }

    if (url.pathname === '/popular') {
      dispatch(toggleDropdown('mail'));
    }
    if (url.pathname === '/') {
      dispatch(toggleDropdown('alipay'));
    }
  }, [location, dispatch]);

  const onClick: MenuProps['onClick'] = (e) => {
    // dispatch(toggleDropdown(e.key));
  };

  return (
    <>
      {
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemHoverColor: '#808080',
              },
            },
          }}>
          <div className={puk ? styles.container : styles.hidden}>
            <Menu
              className={styles.menu}
              onClick={onClick}
              selectedKeys={[numerKey]}
              mode="horizontal"
              items={items}
            />
          </div>
        </ConfigProvider>
      }
    </>
  );
};

export default Menubar;
