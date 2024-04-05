import type { PaginationProps } from 'antd';
import { ConfigProvider, Empty, Pagination, Select, Spin, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthApiQuery, useFetchMoviesPopularQuery } from '../../store/MovieApi';
import styles from './MainPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setMyName, setNumReduce } from '../../store/sliceMovie';

const New = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [imgSrc, setImageSrc] = useState(true);
  const [genre, setGenre] = useState('Россия');
  const [sortHow, setSortHow] = useState('12-18');
  const [sort, setSort] = useState('2020-2024');
  const num = useAppSelector((state) => state.sliceMovie.num);
  const { data, refetch, isFetching, error,isLoading:isLoadingAuth } = useAuthApiQuery('');
  const { data: dataPopular, isLoading,isFetching:isFetch } = useFetchMoviesPopularQuery(
    `page=${num}&year=${sort}&countries.name=${genre}&ageRating=${sortHow}&limit=10`
    // `sort_by=${sort}&order_by=${sortHow}&limit=8&page=${num}&genre=${genre}`,
  );
  const placeholderImage =
    'https://www.zidart.rs/build/images/background/no-results-bg.2d2c6ee3.png';

  //hooks
  useEffect(() => {
    if (data) {
      dispatch(setMyName(data.username));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    if (error) {
      if ('data' in error && typeof error.data === 'object') {
        if ('message' in error.data) {
          if (error.data.message === 'Пользователь не авторизован') {
            navigate('/login');
          }
        }
      }
    }
  }, [data, navigate, isFetching, error]);



  //functions
  const onErr = (error) => {
    error.target.src = placeholderImage;
  };
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    // setNum(pageNumber.toString());
    dispatch(setNumReduce(pageNumber.toString()));
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  const onClickDrop = (value) => {
    
    setSort(value);
  };
  const onClickDropTwo = (value) => {
    setGenre(value);
  };
  const onClickDropThree = (value) => {
    setSortHow(value);
  };
  const onSearch = (value: string) => {};
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const content = (
    <div>
      <p>Выберите год</p>
    </div>
  );
  const contentSort = (
    <div>
      <p>Выберите страну</p>
    </div>
  );
  const contentHowSort = (
    <div>
      <p>Выберите возрастной рейтинг</p>
    </div>
  );

  return (
    <>
      {isFetch &&(
        <div className={styles.zagr2}>
        <Spin tip="Загрузка" size="large">
          <div className="content" />
        </Spin>
      </div>
      )}
      {isLoading ?  (
        <div className={styles.zagr}>
        </div>
      ) : (
        <Spin spinning={isLoadingAuth} tip="Загрузка...">
          <div className={styles.parentDrop}>
            <Popover content={content} title="">
              <Select
                showSearch
                onSearch={onSearch}
                filterOption={filterOption}
                defaultValue="2020-2024"
                className={styles.drop}
                style={{ width: 120 }}
                onChange={onClickDrop}
                options={[
                  { value: '2020-2024', label: '2020-2024' },
                  { value: '2010-2019', label: '2010-2019' },
                  { value: '2000-2009', label: '2000-2009' },
                  { value: '1990-1999', label: '1990-1999' },
                  { value: '1980-1989', label: '1980-1989' },
                  { value: '1970-1979', label: '1970-1979' },
                  { value: '1960-1969', label: '1960-1969' },
                  { value: '1950-1959', label: '1950-1959' },
                  { value: '1940-1949', label: '1940-1949' },
                  { value: '1930-1939', label: '1930-1939' },
                  { value: '1920-1929', label: '1920-1929' },
                  { value: '1910-1919', label: '1910-1919' },
                  { value: '1900-1909', label: '1900-1909' },
                 
                ]}
              />
            </Popover>
            <Popover content={contentSort} title="">
              <Select
                showSearch
                onSearch={onSearch}
                filterOption={filterOption}
                defaultValue="Россия"
                className={styles.drop2}
                style={{ width: 120 }}
                onChange={onClickDropTwo}
                options={[
                  { value: 'Россия', label: 'Россия' },
                  { value: 'США', label: 'США' },
                  { value: 'Франция', label: 'Франция' },
                  { value: 'Великобритания', label: 'Великобритания' },
                ]}
              />
            </Popover>
            <Popover content={contentHowSort} title="">
              <Select
                showSearch
                onSearch={onSearch}
                filterOption={filterOption}
                defaultValue="12-18"
                className={styles.drop2}
                style={{ width: 120 }}
                onChange={onClickDropThree}
                options={[
                  { value: '0-12', label: '0-12' },
                  { value: '12-18', label: '12-18' },
                ]}
              />
            </Popover>
          </div>
          <div className={styles.parent}>
            {dataPopular?.docs?.map((item) => {
              return (
                <div key={item.id} className="mda1 zz rowChild f-flex justify-content-start">
                  <div className={styles.text}><div className='toH'>{item.name}</div></div>
                  {item.poster.url ? (
                    <Link to={`/${item.id}`}>
                      <img
                        className={styles.img}
                        onError={onErr}
                        key={item.imdb_code}
                        src={item.poster.url}
                        alt="no"
                      />
                    </Link>
                  ) : (
                    <Empty />
                  )}
                </div>
              );
            })}
            
          </div>
          {dataPopular?.docs?.length === 0 && (
              <div className={styles.empty}>
                <Empty />
                <div className={styles.notText}>Ничего не найдено</div>
              </div>
            )}
          <div className={styles.pag}>
              <Pagination onChange={onChange} defaultCurrent={num} total={dataPopular?.total} />
            </div>
        </Spin>
      )}
      
    </>
  );
};

export default New;
