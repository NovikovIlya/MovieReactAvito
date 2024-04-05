import React, { useEffect, useState } from 'react';
import { Rate, message } from 'antd';
import styles from './Rating.module.scss';
import { useAddRatingMutation, useFetchRatingQuery } from '../../store/MovieApi';

const Rating = ({ id }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [resRating, setResRating] = useState(0);
  const { data } = useFetchRatingQuery(id, { refetchOnFocus: true });
  const [AddRatingApi] = useAddRatingMutation();

  useEffect(() => {
    if (data) {
      const summer = () => {
        let suma = 0;
        let res = 0;
        data.forEach((item) => {
          suma = suma + item.rating;
          let len = data.length;
          res = suma / len;
          return res;
        });
        setResRating(res);
      };
      summer();
    }
  }, [data]);

  const success = () => {
    messageApi.open({
      type: 'success',
      content:
        'Ваша оценка зачтена! Она будет суммирована со всеми баллами в течении 30 секунд.',
    });
  };

  const rating = async (e: number) => {
    await AddRatingApi({
      imdbid: id,
      rating: e,
    });
    success();
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Rate value={resRating} className={styles.star} onChange={(e) => rating(e)} />
    </div>
  );
};

export default Rating;
