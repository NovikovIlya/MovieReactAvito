import { useEffect, useState } from "react";
import styles from "../Similar/Similar.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Main.css";
import { Divider, Modal } from "antd";
import {  oneMovieProps } from "../../types";

const ImageComp = ({ dataMain }: oneMovieProps) => {
  const [modalData, setModaldata] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingActor, setIsLoadingActor] = useState(false);
  const [idKP, setIDKP] = useState("");
  const [data, setData] = useState([]);
  const [dataActor, setDataActor] = useState([]);

  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    );
  const settings = {
    centerMode: true,
    slidesToShow: mobile ? 1 : dataMain?.persons.length > 2 ? 3 : 1,
    speed: 500,
  };
  const settings2 = {
    centerMode: true,
    slidesToShow: mobile ? 1 : data.length > 2 ? 3 : 1,
    speed: 500,
  };

  const fetchImage = async (id) => {
    try {
      setIsLoading(true);
      setIsLoadingActor(true);
      const data = await fetch(
        `https://api.kinopoisk.dev/v1.4/movie?externalId.imdb=${id}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8",
          },
        }
      );
      const res = await data.json();
      setIDKP(res?.docs[0]?.id); // Устанавливает idKP из первого элемента массива
    } catch (error) {
      console.log(error);
    } finally {
      fetchImageFull(idKP); // Использует правильно установленное значение idKP
      fetchActorKP(idKP);
    }
  };
  const fetchImageFull = async (idKP) => {
    if (idKP)
      try {
        const data = await fetch(
          `https://api.kinopoisk.dev/v1.4/image?movieId=${idKP}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": "1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8",
            },
          }
        );
        const res = await data.json();
        const images = res.docs.map((item) => item.url);
        setData(images);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
  };
  const fetchActorKP = async (idKP) => {
    if (idKP)
      try {
        const data = await fetch(
          `https://api.kinopoisk.dev/v1.4/movie/${idKP}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": "1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8",
            },
          }
        );
        const res = await data.json();
        const actors = res.persons;
        setDataActor(actors);
      } catch (error) {
      } finally {
        setIsLoadingActor(false);
      }
  };
  const showModal = (item) => {
    setModaldata(item);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // fetchImage(id);
    if (dataMain) {
      fetchImageFull(dataMain.id);
      setDataActor(dataMain.persons);
    }
  }, [dataMain]);

  return (
    <>
      {
        <>
          {dataMain.persons.length > 0 && (
            <>
              <Divider style={{ backgroundColor: "rgb(255, 255, 255" }} />
              <div className={styles.container}>
                <h2 className={styles.head}>Актеры:</h2>
                <Slider {...settings}>
                  {dataActor?.map((item) => {
                    return (
                      <div key={item.id} className={styles.lin}>
                        <div>
                          <img
                            className={styles.img3}
                            src={item.photo}
                            alt="no"
                          />
                          <div className={styles.text3}>{item.name}</div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </>
          )}

          {data?.length > 0 && (
            <>
              <Divider style={{ backgroundColor: "rgb(255, 255, 255" }} />
              <div className={styles.container}>
                <h2 className={styles.head}>Скриншоты:</h2>
                <Slider {...settings2}>
                  {isLoading ? (
                    <div></div>
                  ) : (
                    data?.map((item, index) => {
                      return (
                        <div key={index} className={styles.lin}>
                          <div>
                            <img
                              style={{ cursor: "pointer" }}
                              onClick={() => showModal(item)}
                              className={styles.img3}
                              src={item}
                              alt="no"
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </Slider>
              </div>
            </>
          )}
          <Modal
            cancelButtonProps={{ style: { display: "none" } }}
            title=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <img className={styles.img2} src={modalData} alt="no" />
          </Modal>
        </>
      }
    </>
  );
};

export default ImageComp;
