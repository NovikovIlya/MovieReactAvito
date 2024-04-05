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
      if (!data.Error) {
        setDis(false);
      }
    }
    if (data) {
      if (data.Error) {
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
      const keka = [
        {
          Title: 'Avengers: Endgame',
          Year: '2019',
          imdbID: 'tt4154796',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg',
        },
        {
          Title: 'Avengers: Infinity War',
          Year: '2018',
          imdbID: 'tt4154756',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
        },
        {
          Title: 'Avengers: Age of Ultron',
          Year: '2015',
          imdbID: 'tt2395427',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg',
        },
        {
          Title: 'The Avengers',
          Year: '1998',
          imdbID: 'tt0118661',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
        },
        {
          Title: "The Avengers: Earth's Mightiest Heroes",
          Year: '2010–2012',
          imdbID: 'tt1626038',
          Type: 'series',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BYzA4ZjVhYzctZmI0NC00ZmIxLWFmYTgtOGIxMDYxODhmMGQ2XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg',
        },
        {
          Title: 'Ultimate Avengers: The Movie',
          Year: '2006',
          imdbID: 'tt0491703',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTYyMjk0NTMwMl5BMl5BanBnXkFtZTgwNzY0NjAwNzE@._V1_SX300.jpg',
        },
        {
          Title: 'Ultimate Avengers II',
          Year: '2006',
          imdbID: 'tt0803093',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BZjI3MTI5ZTYtZmNmNy00OGZmLTlhNWMtNjZiYmYzNDhlOGRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
        },
        {
          Title: 'The Avengers',
          Year: '1961–1969',
          imdbID: 'tt0054518',
          Type: 'series',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BZWQwZTdjMDUtNTY1YS00MDI0LWFkNjYtZDA4MDdmZjdlMDRlXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
        },
        {
          Title: 'Avengers Assemble',
          Year: '2012–2019',
          imdbID: 'tt2455546',
          Type: 'series',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg',
        },
      ];
      // dispatch(addMovie(keka));
      // refetch();
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
