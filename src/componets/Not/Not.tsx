import React from 'react';
import {  Result } from 'antd';
import styles from './Not.module.scss';

const Not = () => {
  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Извините, но страницы не существует ;c"
       
      />
    </div>
  );
};

export default Not;
