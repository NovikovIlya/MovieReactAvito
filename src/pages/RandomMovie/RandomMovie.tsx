import React, { useEffect, useState } from "react";
import styles from "./RandomMovie.module.scss";
import { useFetchMoviesOneQuery } from "../../store/MovieApi";
import { Button } from "antd";
import { Link } from "react-router-dom";

const RandomMovie = () => {
  const [value, setValue] = useState(476);
  const { data,error } = useFetchMoviesOneQuery(value);

  const getRandom = (min: number, max: number) => {
    //Диапозон округляем
    min = Math.ceil(min);
    max = Math.floor(max);
    setValue(Math.floor(Math.random() * (max - min + 1)) + min);
  };
  const imageLoadOnError = () => {};

  // если не нашли - перезапрашиваем
  useEffect(()=>{
    if(error){
        getRandom(250, 10000)
    }
  },[error])

  return (
    <>
      {data?.id && (
        <div>
          <div className={styles.btnz}><Button onClick={() => getRandom(250, 10000)}>
            Случайный фильм!
          </Button></div>
          {data.error && (
            <div className={styles.err}>
              <div>
                <div>Произошла ошибка</div>
              </div>
            </div>
          )}

          <div className={styles.main}>
            <Link to={"/" + data.id} className={styles.personContainer}>
              <img
                onError={imageLoadOnError}
                className={styles.photo}
                src={
                  data.poster?.url
                    ? data.poster.url
                    : "https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png"
                }
              />
              <div className={styles.name}>
                <div className={styles.name__text}>
                  {data.name ? data.name : data.enName}
                </div>
                <div className={styles.infoText}>
                  <div className={styles.name__info}>Год: {data.year}</div>
                  {data?.countries[0].name && (
                    <div className={styles.name__info}>
                      Страна: {data.countries[0].name}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default RandomMovie;
