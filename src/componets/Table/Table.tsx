import React from 'react';
import { Table as Tables } from 'antd';
import styles from './Table.module.scss';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { DataType } from '../../types';


const TableZ = () => {
  const dataSource: DataType[] = [
    {
      key: '1',
      rank: '1',
      title: 'Avatar',
      lifetime: '$2,923,706,026',
      year: '2009',
      imdb: 'tt0499549',
    },
    {
      key: '2',
      rank: '2',
      title: 'Avengers: Endgame',
      lifetime: '$2,799,439,100',
      year: '2019',
      imdb: 'tt4154796',
    },
    {
      key: '3',
      rank: '3',
      title: 'Avatar: The Way of Water',
      lifetime: '$2,320,250,281',
      year: '2022',
      imdb: 'tt1630029',
    },
    {
      key: '4',
      rank: '4',
      title: 'Titanic',
      lifetime: '$2,264,743,305',
      year: '1997',
      imdb: 'tt0120338',
    },
    {
      key: '5',
      rank: '5',
      title: 'Star Wars: Episode VII - The Force Awakens',
      lifetime: '$2,071,310,218',
      year: '2015',
      imdb: 'tt2488496',
    },
    {
      key: '6',
      rank: '6',
      title: 'Avengers: Infinity War',
      lifetime: '$2,052,415,039',
      year: '2018',
      imdb: 'tt4154756',
    },
    {
      key: '7',
      rank: '7',
      title: 'Spider-Man: No Way Home',
      lifetime: '$1,921,847,111',
      year: '2021',
      imdb: 'tt10872600',
    },
    {
      key: '8',
      rank: '8',
      title: 'Jurassic World',
      lifetime: '$1,671,537,444',
      year: '2015',
      imdb: 'tt0369610',
    },
    {
      key: '9',
      rank: '9',
      title: 'The Lion King',
      lifetime: '$1,663,075,401',
      year: '2019',
      imdb: 'tt6105098',
    },
    {
      key: '10',
      rank: '10',
      title: 'The Avengers',
      lifetime: '$1,520,538,536',
      year: '2012',
      imdb: 'tt0848228',
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },

    {
      title: 'Lifetime Gross',
      dataIndex: 'lifetime',
      key: 'lifetime',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Link',
      dataIndex: 'imdb',
      key: 'imdb',
      render: (imdb) => <Link to={`${imdb}`}>Go to movie</Link>,
    },
  ];

  return (
    <div className={styles.Maincontainer}>
      <Tables className={styles.container} dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default TableZ;
