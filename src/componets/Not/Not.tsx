import React from 'react';
import {  Result } from 'antd';
import styles from './Not.module.scss';

const Not = () => {
  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
       
      />
    </div>
  );
};

export default Not;
