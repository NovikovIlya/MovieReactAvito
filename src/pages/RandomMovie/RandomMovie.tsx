import React, { useEffect, useState } from "react";
import styles from "./RandomMovie.module.scss";
import { useFetchRandomQuery } from "../../store/MovieApi";
import { Button, Popover, Select } from "antd";
import { Link } from "react-router-dom";

const RandomMovie = () => {
  const [realObj, setRealObj] = useState({
    genre: "драма",
    country: "США",
    type: 1,
    rating: "7-10",
    network: "Netflix",
    year: "2020-2024",
    random: 1,
  });
  const [realData, setRealData] = useState<any>([""]);
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
    // жанр
    setObj((prev) => ({ ...prev, genre: value }));
  };
  const onClickDropFive = (value) => {
    // рейтинг
    setObj((prev) => ({ ...prev, rating: value }));
  };
  const onClickDropSix = (value) => {
    // сеть производства
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
      const min = 1;
      const max = data.docs.length;
      const random = Math.floor(Math.random() * (max - min + 1)) + min - 1;
      setRealData(data.docs[random]);
    } else {
      setRealData([]);
    }
  }, [data]);

  return (
    <>
      <div className={styles.filters}>
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
              { value: "2020-2024", label: "2020-2024" },
              { value: "2010-2019", label: "2010-2019" },
              { value: "2000-2009", label: "2000-2009" },
              { value: "1990-1999", label: "1990-1999" },
              { value: "1980-1989", label: "1980-1989" },
              { value: "1970-1979", label: "1970-1979" },
              { value: "1960-1969", label: "1960-1969" },
              { value: "1950-1959", label: "1950-1959" },
              { value: "1940-1949", label: "1940-1949" },
              { value: "1930-1939", label: "1930-1939" },
              { value: "1920-1929", label: "1920-1929" },
              { value: "1910-1919", label: "1910-1919" },
              { value: "1900-1909", label: "1900-1909" },
            ]}
          />
        </Popover>
        <Popover content={contentSort} title="">
          <Select
            showSearch
            onSearch={onSearch}
            filterOption={filterOption}
            defaultValue="США"
            className={styles.drop2}
            style={{ width: 120 }}
            onChange={onClickDropTwo}
            options={[
              { value: "Россия", label: "Россия" },
              { value: "США", label: "США" },
              { value: "Франция", label: "Франция" },
              { value: "Великобритания", label: "Великобритания" },
            ]}
          />
        </Popover>
        <Popover content={contentHowSort} title="">
          <Select
            showSearch
            onSearch={onSearch}
            filterOption={filterOption}
            defaultValue="драма"
            className={styles.drop2}
            style={{ width: 120 }}
            onChange={onClickDropThree}
            options={[
              { value: "драма", label: "драма" },
              { value: "комедия", label: "комедия" },
              { value: "ужасы", label: "ужасы" },
              { value: "мелодрама", label: "мелодрама" },
            ]}
          />
        </Popover>
        <Popover content={contentType} title="">
          <Select
            showSearch
            onSearch={onSearch}
            filterOption={filterOption}
            defaultValue="Фильмы"
            className={styles.drop2}
            style={{ width: 120 }}
            onChange={onClickDropFour}
            options={[
              { value: "1", label: "Фильмы" },
              { value: "2", label: "Сериалы" },
              { value: "3", label: "Мультфильмы" },
              { value: "4", label: "Аниме" },
            ]}
          />
        </Popover>
        <Popover content={contentRating} title="">
          <Select
            showSearch
            onSearch={onSearch}
            filterOption={filterOption}
            defaultValue="7-10"
            className={styles.drop2}
            style={{ width: 120 }}
            onChange={onClickDropFive}
            options={[
              { value: "7-10", label: "7-10" },
              { value: "1-6", label: "1-6" },
            ]}
          />
        </Popover>
        <Popover content={contentNetwork} title="">
          <Select
            showSearch
            onSearch={onSearch}
            filterOption={filterOption}
            defaultValue="Netflix"
            className={styles.drop2}
            style={{ width: 120 }}
            onChange={onClickDropSix}
            options={[
              { value: "Netflix", label: "Netflix" },
              { value: "HBO", label: "HBO" },
              { value: "Amazon", label: "Amazon" },
            ]}
          />
        </Popover>
      </div>
      <div className={styles.btnz}>
        <Button onClick={() => getRandom()}>Случайный фильм!</Button>
      </div>
      {isFetching && (
        <div className={styles.parenNotTex}>
          <div className={styles.notText2}>Загружаем...</div>
        </div>
      )}
      {!isFetching && realData.length === 0 && (
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
