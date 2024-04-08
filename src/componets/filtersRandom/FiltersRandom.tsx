import React from "react";
import styles from "./FiltersRandom.module.scss";
import { Popover, Select } from "antd";

const filtersRandom = ({
  content,
  onClickDrop,
  filterOption,
  onSearch,
  contentSort,
  onClickDropTwo,
  contentHowSort,
  onClickDropThree,
  contentType,
  onClickDropFour,
  contentRating,
  onClickDropFive,
  contentNetwork,
  onClickDropSix,
}) => {
  return (
    <>
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
    </>
  );
};

export default filtersRandom;
