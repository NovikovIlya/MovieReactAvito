import { Button, Popover, Spin } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useAuthApiQuery } from '../../store/MovieApi';
import {
  deleteFavorites,
  deletefavoritesNew,
  getFavorites
} from '../../store/sliceMovie';
import styles from './Favorite.module.scss';

export const Favorites = () => {
  const myName = useAppSelector((state)=>state.sliceMovie.myName)
  const isLoad = useAppSelector((state) => state.sliceMovie.isLoad);
  const favoriteMovie = useAppSelector((state) => state.sliceMovie.favoritesNew);
  const favoriteMovieUnique =  favoriteMovie ? (favoriteMovie.filter((elem, index) => {
    return favoriteMovie.findIndex((item) => item.name === elem.name) === index;
  })) : [];
  const { data: dataApi } = useAuthApiQuery('');
  const navigate = useNavigate();
  const { error } = useAuthApiQuery('');
  const dispatch = useAppDispatch();

  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    );
  const settings2 = {
    centerMode: true,
    slidesToShow: mobile
      ? 1
      : favoriteMovieUnique.length > 2
      ? 3
      : favoriteMovieUnique.length > 1
      ? 1
      : 1,
    speed: 500,
  };

  //hooks
  useEffect(() => {
    const data = { oldUsername: myName };
    dispatch(getFavorites(data));
  }, [getFavorites]);

  useEffect(() => {
    if (dataApi) {
      if ('username' in dataApi) {
        const data = { oldUsername: dataApi?.username };
        const dataFav = dispatch(getFavorites(data));
      }
    }
  }, [dataApi, dispatch]);

  useEffect(() => {
    if (error) {
      if ('data' in error && typeof error.data === 'object') {
        const data = error.data;
        if ('message' in data && typeof data.message === 'string') {
          if (data.message === 'Пользователь не авторизован') {
            navigate('/login');
          }
        }
      
      }
    }
  }, [error, navigate]);

  //functions
  const delFavoriteNew = async (item) => {
    const data = {
      oldUsername: dataApi.username,
      id: item.id,
    };
    await dispatch(deleteFavorites(data));
    await dispatch(deletefavoritesNew(data.id));
  };

  return (
    <>
      {favoriteMovie && isLoad ? (
        <div className={styles.zagr}>
          <Spin tip="Загрузка..." size="large">
            <div data-testid="z" className="content" />
          </Spin>
        </div>
      ) : (
        <div className={styles.container}>
          <Slider {...settings2}>
            {favoriteMovie.length > 0 &&
              favoriteMovieUnique.map((item) => {
                return (
                  <div key={item.id} className="rowChild f-flex justify-content-start m-3">
                    <div className={styles.text}>{item.name}</div>
                    <img className={styles.img} key={item.id} src={item.poster.previewUrl} alt="no" />
                    <div className={styles.bottom}>
                      <Link to={`/${item.id}`}>
                        <Button className={styles.btnDesc}>Перейти в фильм</Button>
                      </Link>
                      <Popover  title="">
                        <Button
                          className={styles.btnPlus}
                          onClick={() => delFavoriteNew(item)}
                          type="primary">
                          Удалить
                        </Button>
                      </Popover>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      )}
    </>
  );
};
