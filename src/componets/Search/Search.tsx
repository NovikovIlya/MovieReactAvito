import { AutoComplete } from 'antd';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useFetchMoviesQuery } from '../../store/MovieApi';
import { addMovie } from '../../store/sliceMovie';
import { SearchProps } from '../../types';
import styles from './Search.module.scss';
import { useDebounceValue } from 'usehooks-ts'

const Search: React.FC<SearchProps> = (props) => {
  //data
  const [debouncedValue, setValue] = useDebounceValue('', 1000)
  const navigate = useNavigate();
  const [dataMass, setDataMass] = useState([]);
  const [val2, setVal2] = useState('');
  const [dis, setDis] = useState(true);
  const {
    children = 'Search',
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => handleMovie(e),
  } = props;
  const val = useAppSelector((state) => state.sliceMovie.value);
  const { data, refetch } = useFetchMoviesQuery(debouncedValue);
  const dispatch = useAppDispatch();
 

  //hooks
  useEffect(() => {
    if (data) {
      if (!data.error) {
        setDis(false);
      }
    }
    if (data) {
      if (data.error) {
        setDis(true);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (data.docs.length > 0) {
        //@ts-ignore
        const searchData = data.docs.map((item) => {
          let { name, year,  } = item;
          return { ...item, value: `${name}, ${year}` };
        });
        setDataMass(searchData);
      }
    }
  }, [data]);

  useEffect(() => {
    if (val.length < 1) {
 

    }
  }, [dispatch, refetch, data]);


  //functions
  const onSelect = (data2: string) => {
   
    const data3 = data2.split(',')[0];
    const data4 = data2.split(',')[1].trim()
    const es = data?.docs?.find((item) => {
      return item.name === data3 && String(item.year) === String(data4)
    });
    if (es) {
      navigate(`/${es.id}`);
    } else {
      navigate('/not');
    }
  };

  const handleMovie = (e) => {
    const text = e;
    setValue(text)
    setVal2(text);
    if (debouncedValue.length < 1) {
      setDataMass([]);
    }
  };

  const inputClass = cn({
    [styles.filled]: val.length,
  });

  return (
    <div data-testid="inpCn" className={inputClass}>
      <div className={styles.container}>
        <AutoComplete
          //@ts-ignore
          value={val2}
          //@ts-ignore
          onChange={onChange}
          //@ts-ignore
          onSelect={onSelect}
          style={{ width: 200 }}
          options={dataMass}
          placeholder="Искать..."
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
    </div>
  );
};

export default Search;
