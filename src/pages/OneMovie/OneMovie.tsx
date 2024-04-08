import { CharacherRight } from "../../componets/characterRight/CharacherRight";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAuthApiQuery,
  useFetchMoviesOneQuery
} from "../../store/MovieApi";
import styles from "./OneMovie.module.scss";
import Trailer from "../../componets/Trailer/Trailer";
import Comment from "../../componets/Comment/Comment";
import {
  Divider,
  Popover,
  Spin,
  Breadcrumb,
  ConfigProvider,
} from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Rating from "../../componets/Rating/Rating";
import Similar from "../../componets/Similar/Similar";
import { addFavorites } from "../../store/sliceMovie";
import ImageComp from "../../componets/ImagesComp/ImagesComp";
import Breadcrumbs from "../../componets/Breadcrumb/Breadcrumb";

const MovieCharacteristics = () => {
  //data
  const [isAsyncComplete, setIsAsyncComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [haveFav, setHaveFav] = useState(false);
  const favoriteMovie = useAppSelector(
    (state) => state.sliceMovie.favoritesNew
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: dataApi, error, isLoading: isLoadApi } = useAuthApiQuery("");
  const { data, isLoading } = useFetchMoviesOneQuery(id);
  const dispatch = useAppDispatch();
  const {darkMode} = useAppSelector((state) => state.sliceMovie);
  const darkModeTheme = cn({
    [styles.Main]: !darkMode,
  });
  const content = (
    <div>
      <p>Добавить в избранное</p>
    </div>
  );

  //useeffect -------------
  //логика с избранными
  useEffect(() => {
    if (favoriteMovie) {
      const proverka = () => {
        const favoriteMovieImdb = favoriteMovie.map((item) => {
          return item.imdbID;
        });
        setHaveFav(favoriteMovieImdb.includes(id));
      };
      proverka();
    }
  }, [id, favoriteMovie]);

  // Выкидываем если не авторизован
  useEffect(() => {
    if (error) {
      if ("data" in error && typeof error.data === "object") {
        if ("message" in error.data) {
          if (error.data.message === "Пользователь не авторизован") {
            navigate("/login");
          }
        }
      }
    }
  }, [navigate, error]);

  //скролл вверх, ждем когда выполнится асинронная задача
  useEffect(() => {
    if (isLoading === false) {
      setIsAsyncComplete(true);
    }
    if (isLoading === true) {
      setIsAsyncComplete(false);
    }
  }, [isLoading]);

  //скролл вверх
  useEffect(() => {
    if (!isMounted && isAsyncComplete) {
      window.scrollTo(0, 0);
      setIsMounted(true);
    }
    return () => {
      setIsMounted(false);
    };
  }, [isAsyncComplete]);

  //functions --------------
  const addFavoritesNew = (data) => {
    const mainData = {
      favorites: data,
      oldUsername: dataApi.username,
    };
    dispatch(addFavorites(mainData));
  };

  const onErr = (error) => {
    error.target.src =
      "https://www.zidart.rs/build/images/background/no-results-bg.2d2c6ee3.png";
  };

  return (
    <>
      <div className={styles.mt}>
        <div className={darkModeTheme}>
          {isLoading ? (
            <div className={styles.zagr}>
              <Spin tip="Загрузка..." size="large">
                <div className="content" />
              </Spin>
            </div>
          ) : (
            <>
              <div>
                <div className={styles.container2}>
                  <div className={styles.container2ss}>
                    <Breadcrumbs data={data}/>
                  </div>
                </div>
                <div className={styles.container}>
                  <div className={styles.containerTop}>
                    <div className={styles.container__left}>
                      <div>
                        <img
                          className={styles.imag}
                          onError={onErr}
                          src={
                            data.poster.url
                              ? data.poster.url
                              : "https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg"
                          }
                          alt="no"
                        />
                      </div>

                      <div className={styles.plus}>
                        <Popover content={content} title="">
                          {!haveFav ? (
                            <PlusOutlined
                              className={styles.plusE}
                              onClick={() => {
                                setHaveFav(true);
                                addFavoritesNew(data);
                              }}
                            />
                          ) : (
                            <CheckOutlined
                              className={styles.plusE}
                              onClick={() => addFavoritesNew(data)}
                            />
                          )}
                        </Popover>
                      </div>
                    </div>
                    <CharacherRight dataMain={data} />
                  </div>

                  {data.description && (
                    <>
                      <Divider className={styles.divid} />

                      <div className={styles.containerBottom}>
                        <div className={styles.Bottom}>
                          <div className={styles.itemRight}>
                            {data.description}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Divider className={styles.divid} />

                  <div className={styles.twoItemParent}>
                    <div className={styles.twoItem}>
                      <div className={styles.containerTrailer}>
                        <div>
                          <Trailer dataMain={data} />
                        </div>
                      </div>
                      <div className={styles.containerRating}>
                        <div className={styles.Bottom}>
                          <div className={styles.itemRight2}>
                            <div style={{ width: "100%" }}>
                              Рейтинг КП:
                              <div className={styles.rat}>
                                {data ? " " + data.rating.kp : ""}
                              </div>
                            </div>
                            {data.rating.imdb ? (
                              <div>
                                Рейтинг Imdb:{" "}
                                <div className={styles.rat}>
                                  {data ? " " + data.rating.imdb : ""}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>Рейтинг PrivetMovie:</p>
                  <Rating id={id} />

                  <div className="row wh">
                    <ImageComp dataMain={data} />
                  </div>

                  <div className="row wh">
                    <Similar dataMain={data} />
                  </div>

                  <Divider className={styles.divid} />

                  <div className={styles.containerComment}>
                    <Comment id={id} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieCharacteristics;
