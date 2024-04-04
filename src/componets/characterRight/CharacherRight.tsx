import React from 'react';
import styles from '../MovieCharacterisics/MovieCharacteristics.module.scss';
import { useFetchMoviesOneQuery } from '../../store/MovieApi';

export function CharacherRight({arg}) {
  const { data } = useFetchMoviesOneQuery(arg);
  
  return (
    <div className={styles.container__right}>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Title:</div>
        <div className={styles.itemRight}>{data.Title}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Year:</div>
        <div className={styles.itemRight}>{data.Year}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Director:</div>
        <div className={styles.itemRight}>{data.Director}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Country:</div>
        <div className={styles.itemRight}>{data.Country}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Genre:</div>
        <div className={styles.itemRight}>{data.Genre}</div>
      </div>

      <div className={styles.ParentItem}>
        <div className={styles.item}>Production:</div>
        <div className={styles.itemRight}>{data.Production}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Language:</div>
        <div className={styles.itemRight}>{data.Language}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>BoxOffice:</div>
        <div className={styles.itemRight}>{data.BoxOffice}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>DVD:</div>
        <div className={styles.itemRight}>{data.DVD}</div>
      </div>
      <div className={styles.ParentItem}>
        <div className={styles.item}>Awards:</div>
        <div className={styles.itemRight}>{data.Awards}</div>
      </div>
    </div>
  );
}
