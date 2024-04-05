import React from 'react';
import styles from '../../pages/OneMovie/OneMovie.module.scss';
import { oneMovieProps } from '../../types';

export function CharacherRight({dataMain:data}:oneMovieProps) {
  
  if(!data) return <>Произошла ошибка</>
  return (
    <div className={styles.container__right}>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Название:</div>
        <div className={styles.itemRight}>{data.name}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Год:</div>
        <div className={styles.itemRight}>{data.year}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Страна:</div>
        <div className={styles.itemRight}>{data.countries[0].name}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Жанр:</div>
        <div className={styles.itemRight}>{data.genres[0].name}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Возрастной рейтинг:</div>
        <div className={styles.itemRight}>{data.ageRating + '+'}</div>
      </div>
      {data.slogan&&<div className={styles.ParentItem}>
        <div className={styles.item}>Слоган:</div>
        <div className={styles.itemRight}>{'"' + data.slogan + '"'}</div>
      </div>}
      {data.seasonsInfo.length>0 && <div className={styles.ParentItem}>
        <div className={styles.item}>Сезонов:</div>
        <div className={styles.itemRight}>{data.seasonsInfo.length}</div>
      </div>}
      {data.totalSeriesLength>0 && <div className={styles.ParentItem}>
        <div className={styles.item}>Количество серий:</div>
        <div className={styles.itemRight}>{data.totalSeriesLength}</div>
      </div>}

    </div>
  );
}
