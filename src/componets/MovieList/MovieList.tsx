import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useFetchMoviesPopularQuery } from '../../store/MovieApi';
import { MovieListProps } from '../../types';
import styles from './MovieList.module.scss';

const MovieList = ({ movie }: MovieListProps) => {
  const { data: dataPopular } = useFetchMoviesPopularQuery(
    'sort_by=download_count&order_by=desc&limit=10',
  );
  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    );
  const settings = {
    centerMode: true,
    slidesToShow: mobile ? 1 : 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <>
      {dataPopular ? (
        <>
          <Slider {...settings}>
            {dataPopular?.data?.movies?.map((item) => {
              return (
                <div key={item.imdb_code} className="mda1 rowChild f-flex justify-content-start ">
                  <div className={styles.text}>{item.title}</div>
                  <Link className={styles.td} to={`/${item.imdb_code}`}>
                    <img
                      className={styles.img}
                      key={item.imdb_code}
                      src={item.large_cover_image}
                      alt="no"
                    />
                  </Link>
                </div>
              );
            })}
          </Slider>
        </>
      ) : (
        <>
          {' '}
          <div className={styles.zagr}>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </div>
        </>
      )}
    </>
  );
};

export default MovieList;
