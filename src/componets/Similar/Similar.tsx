import styles from "./Similar.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import "../../Main.css";
import { Divider } from "antd";
import { oneMovieProps } from "../../types";

const Similar = ({ dataMain }: oneMovieProps) => {
  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    );
  const settings = {
    centerMode: true,
    slidesToShow: mobile ? 1 : dataMain.similarMovies?.length > 2 ? 3 : 1,
    speed: 500,
  };
  const onErr = (error) => {
    error.target.src =
      "https://www.zidart.rs/build/images/background/no-results-bg.2d2c6ee3.png";
  };

  return (
    <>
      {dataMain.similarMovies.length > 0 && (
        <div className={styles.container}>
          <Divider className={styles.divid} />
          <h2 className={styles.head}>Похожие фильмы:</h2>
          <Slider {...settings}>
            {dataMain &&
              dataMain.similarMovies?.map((item) => {
                return (
                  <Link
                    key={item.id}
                    className={styles.lin}
                    target="_blank"
                    to={`/${item.id}`}
                  >
                    <div>
                      <img
                        onError={onErr}
                        className={styles.img}
                        src={item.poster.url}
                        alt="no"
                      />
                      <div className={styles.text}>{item.name}</div>
                    </div>
                  </Link>
                );
              })}
          </Slider>
        </div>
      )}
    </>
  );
};

export default Similar;
