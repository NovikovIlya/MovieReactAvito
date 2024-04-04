import React, { useEffect, useState } from 'react';
import styles from './Similar.module.scss';
import { useSimilarFetchQuery } from '../../store/MovieApi';
import { MovieYts } from '../../types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import '../../Main.css';

export type SimilarProps = {
  gengreText: string;
};

const Similar = ({ gengreText }: SimilarProps) => {
  const [text, setText] = useState(null);
  const { data, isLoading, refetch } = useSimilarFetchQuery(text, { refetchOnFocus: true });
  const [arrayYts, setArrayYts] = useState<MovieYts[]>([]);
  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    );
  const settings = {
    centerMode: true,
    slidesToShow: mobile ? 1 : arrayYts?.length > 2 ? 3 : 1,
    speed: 500,
  };

  useEffect(() => {
    setArrayYts(data?.data.movies);
    if (gengreText === undefined) {
      return;
    }
    if (gengreText !== undefined) {
      setText(gengreText);
      refetch();
    }
  }, [data, gengreText, refetch]);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.head}>If you liked this movie:</h2>
        <Slider {...settings}>
          {isLoading ? (
            <div></div>
          ) : (
            arrayYts?.map((item) => {
              return (
                <Link
                  key={item.imdb_code}
                  className={styles.lin}
                  target="_blank"
                  to={`/${item.imdb_code}`}>
                  <div>
                    <img className={styles.img} src={item.medium_cover_image} alt="no" />
                    <div className={styles.text}>{item.title}</div>
                  </div>
                </Link>
              );
            })
          )}
        </Slider>
      </div>
    </>
  );
};

export default Similar;
