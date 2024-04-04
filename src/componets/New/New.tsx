import type { PaginationProps } from 'antd';
import { ConfigProvider, Empty, Pagination, Select, Spin, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthApiQuery, useFetchMoviesPopularQuery } from '../../store/MovieApi';
import styles from './New.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setMyName, setNumReduce } from '../../store/sliceMovie';

const New = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [imgSrc, setImageSrc] = useState(true);
  const [genre, setGenre] = useState('');
  const [sortHow, setSortHow] = useState('desc');
  const [sort, setSort] = useState('date_added');
  const num = useAppSelector((state) => state.sliceMovie.num);
  const { data, refetch, isFetching, error,isLoading:isLoadingAuth } = useAuthApiQuery('');
  const { data: dataPopular, isLoading,isFetching:isFetch } = useFetchMoviesPopularQuery(
    `sort_by=${sort}&order_by=${sortHow}&limit=8&page=${num}&genre=${genre}`,
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
    setGenre(value);
  };
  const onClickDropTwo = (value) => {
    setSort(value);
  };
  const onClickDropThree = (value) => {
    setSortHow(value);
  };
  const onSearch = (value: string) => {};
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const content = (
    <div>
      <p>Select a genre</p>
    </div>
  );
  const contentSort = (
    <div>
      <p>Select a sort</p>
    </div>
  );
  const contentHowSort = (
    <div>
      <p>How to sort</p>
    </div>
  );

  return (
    <>
      {isFetch &&(
        <div className={styles.zagr2}>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
      )}
      {isLoading ?  (
        <div className={styles.zagr}>
          {/* <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin> */}
        </div>
      ) : (
        <Spin spinning={isLoadingAuth} tip="Loading...">
          <div className={styles.parentDrop}>
            <Popover content={content} title="">
              <Select
                showSearch
                onSearch={onSearch}
                filterOption={filterOption}
                defaultValue="All"
                className={styles.drop}
                style={{ width: 120 }}
                onChange={onClickDrop}
                options={[
                  { value: '', label: 'All' },
                  { value: 'Action', label: 'Action' },
                  { value: 'Adventure', label: 'Adventure' },
                  { value: 'Animation', label: 'Animation' },
                  { value: 'Biography', label: 'Biography' },
                  { value: 'Comedy', label: 'Comedy' },
                  { value: 'Crime', label: 'Crime' },
                  { value: 'Documentary', label: 'Documentary' },
                  { value: 'Drama', label: 'Drama' },
                  { value: 'Family', label: 'Family' },
                  { value: 'Fantasy', label: 'Fantasy' },
                  { value: 'Film-Noir', label: 'Film-Noir' },
                  { value: 'History', label: 'History' },
                  { value: 'Horror', label: 'Horror' },
                  { value: 'Music', label: 'Music' },
                  { value: 'Musical', label: 'Musical' },
                  { value: 'Mystery', label: 'Mystery' },
                  { value: 'Sci-Fi', label: 'Sci-Fi' },
                  { value: 'Romance', label: 'Romance' },
                  { value: 'Sport', label: 'Sport' },
                  { value: 'Thriller', label: 'Thriller' },
                  { value: 'War', label: 'War' },
                  { value: 'Western', label: 'Western' },
                ]}
              />
            </Popover>
            <Popover content={contentSort} title="">
              <Select
                showSearch
                onSearch={onSearch}
                filterOption={filterOption}
                defaultValue="Date added"
                className={styles.drop2}
                style={{ width: 120 }}
                onChange={onClickDropTwo}
                options={[
                  { value: 'title', label: 'Title' },
                  { value: 'date_added', label: 'Date added' },
                ]}
              />
            </Popover>
            <Popover content={contentHowSort} title="">
              <Select
                showSearch
                onSearch={onSearch}
                filterOption={filterOption}
                defaultValue="desc"
                className={styles.drop2}
                style={{ width: 120 }}
                onChange={onClickDropThree}
                options={[
                  { value: 'desc', label: 'Descending' },
                  { value: 'asc', label: 'Ascending' },
                ]}
              />
            </Popover>
          </div>
          <div className={styles.parent}>
            {dataPopular?.data?.movies?.map((item) => {
              return (
                <div key={item.imdb_code} className="mda1 zz rowChild f-flex justify-content-start">
                  <div className={styles.text}><div className='toH'>{item.title}</div></div>
                  {item.large_cover_image ? (
                    <Link to={`/${item.imdb_code}`}>
                      <img
                        className={styles.img}
                        onError={onErr}
                        key={item.imdb_code}
                        src={imgSrc ? item.large_cover_image : placeholderImage}
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
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveColorDisabled: 'rgb(128,128,128)',
                },
              },
            }}>
            <div className={styles.pag}>
              <Pagination onChange={onChange} defaultCurrent={num} total={50000} />
            </div>
          </ConfigProvider>{' '}
        </Spin>
      )}
    </>
  );
};

export default New;
