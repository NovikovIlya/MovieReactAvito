import React, { useEffect, useState } from "react";
import styles from "./RandomMovie.module.scss";
import { useFetchRandomQuery } from "../../store/MovieApi";
import { Button, Popover, Select } from "antd";
import { Link } from "react-router-dom";
import FiltersRandom from "../../componets/filtersRandom/FiltersRandom";

const RandomMovie = () => {
  // data
  const [oldRandom, setOldRandom] = useState(null);
  const [realObj, setRealObj] = useState({
    genre: "драма",
    country: "США",
    type: 1,
    rating: "7-10",
    network: "Netflix",
    year: "2020-2024",
    random: 1,
  });
  const [realData, setRealData] = useState<any>(["first"]);
  const [obj, setObj] = useState({
    genre: "драма",
    country: "США",
    type: 1,
    rating: "7-10",
    network: "Netflix",
    year: "2020-2024",
  });
  const { data, error, refetch, isLoading, isFetching } =
    useFetchRandomQuery(realObj);
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
      <p>Выберите жанр</p>
    </div>
  );
  const contentType = (
    <div>
      <p>Выберит тип контента</p>
    </div>
  );
  const contentRating = (
    <div>
      <p>Выберите рейтинг</p>
    </div>
  );
  const contentNetwork = (
    <div>
      <p>Выберите сеть</p>
    </div>
  );
  const isNotData = !isFetching && realData?.length === 0;
  // functions
  const onSearch = (value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onClickDrop = (value) => {
    // Год
    setObj((prev) => ({ ...prev, year: value }));
  };
  const onClickDropTwo = (value) => {
    // Страна
    setObj((prev) => ({ ...prev, country: value }));
  };
  const onClickDropFour = (value) => {
    // Тип контента
    setObj((prev) => ({ ...prev, type: value }));
  };

  const onClickDropThree = (value) => {
    setObj((prev) => ({ ...prev, genre: value }));
  };
  const onClickDropFive = (value) => {
    setObj((prev) => ({ ...prev, rating: value }));
  };
  const onClickDropSix = (value) => {
    setObj((prev) => ({ ...prev, network: value }));
  };

  const getRandom = () => {
    setRealObj({
      ...obj,
      random: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
    });
  };
  const imageLoadOnError = () => {};

  useEffect(() => {
    if (data?.docs?.length > 0) {
      const min = 0;
      const max = data?.docs?.length;
      let random = Math.floor(Math.random() * (max - min + 1)) + min - 1  ;
      if(data.docs.length === 1){
        random = 0
      }
      if(random > max){
        random = max - 1
      }
      if(random < min){
        random = 0
      }
      console.log(random)
      // if(random === oldRandom && random === min){
      //  random = min+1
      // }
      // if(random === oldRandom && random === max){
      //   random = max-1
      // }else{
      //   random = oldRandom + 1
      // }
     
      

      setOldRandom(random);
      setRealData(data.docs[random]);
    }
    if (data?.docs?.length === 0) {
      setRealData([]);
    }
  }, [data]);

  return (
    <>
      <div className={styles.filters}>
        <FiltersRandom
          content={content}
          onClickDrop={onClickDrop}
          filterOption={filterOption}
          onSearch={onSearch}
          contentSort={contentSort}
          onClickDropTwo={onClickDropTwo}
          contentHowSort={contentHowSort}
          onClickDropThree={onClickDropThree}
          contentType={contentType}
          onClickDropFour={onClickDropFour}
          contentRating={contentRating}
          onClickDropFive={onClickDropFive}
          contentNetwork={contentNetwork}
          onClickDropSix={onClickDropSix}
        />
      </div>
      <div className={styles.btnz}>
        <Button onClick={() => getRandom()}>Случайный фильм!</Button>
      </div>
      {isFetching && (
        <div className={styles.parenNotTex}>
          <div className={styles.notText2}>Загружаем...</div>
        </div>
      )}
      {isNotData && (
        <div className={styles.parenNotTex}>
          <div className={styles.notText}>По заданным фильтрам нет данных</div>
        </div>
      )}
      {realData?.id && (
        <div>
          {data.error && (
            <div className={styles.err}>
              <div>
                <div>Произошла ошибка</div>
              </div>
            </div>
          )}

          <div className={styles.main}>
            <Link to={"/" + realData.id} className={styles.personContainer}>
              <img
                onError={imageLoadOnError}
                className={styles.photo}
                src={
                  realData.poster?.url
                    ? realData.poster.url
                    : "https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png"
                }
              />
              <div className={styles.name}>
                <div className={styles.name__text}>
                  {realData.name ? realData.name : realData.enName}
                </div>
                <div className={styles.infoText}>
                  <div className={styles.name__info}>Год: {realData.year}</div>
                  {realData?.countries[0].name && (
                    <div className={styles.name__info}>
                      Страна: {realData.countries[0].name}
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
