import { Spin } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import cn from 'classnames';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Main.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useAuthApiQuery } from '../../store/MovieApi';
import styles from '../App/App.module.scss';
import stylesDark from '../App/AppDark.module.scss';
import MovieList from '../MovieList/MovieList';
import { setMyName } from '../../store/sliceMovie';

export type movieType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

function MainPage() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  const navigate = useNavigate();
  const MovieData = useAppSelector((state) => state.sliceMovie.films);
  const { data, refetch, isFetching, error,isLoading } = useAuthApiQuery('');

  const darkModeTheme = cn({
    [styles.container2]: !darkMode,
    [stylesDark.container2]: darkMode,
  });
  const darkModeThemeMain = cn({
    [styles.Main2]: !darkMode,
    [stylesDark.Main2]: darkMode,
  });

  //hooks
  useEffect(() => {
    if (data) {
      dispatch(setMyName(data.username));
    }
  }, [data, dispatch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
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

  if (isFetching) {
    return <div></div>;
  }

  return (
    <>
      {
        <Spin spinning={isLoading} tip="Loading...">
          <div className={darkModeThemeMain}>
            <div className={darkModeTheme}>
              <div className="">
                <div className="">
                  <MovieList movie={MovieData} />
                </div>
              </div>
            </div>
          </div>
        </Spin>
      }
    </>
  );
}

export default MainPage;
