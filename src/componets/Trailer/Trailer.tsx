import React, { useEffect, useState } from 'react';
import styles from './Trailer.module.scss';
import Skeleton from './Skeleton';
import { oneMovieProps } from '../../types';


const Trailer = ({ dataMain }: oneMovieProps) => {
  const [alt, SetAlt] = useState('');
  const [urlValue, setUrlValue] = useState('');

  useEffect(() => {
    const fetchYoutube = async () => {
      let response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${dataMain.name} ${dataMain.year}&type=video&key=AIzaSyC0eVRG5nSA0E-bPOjsBjq98YPeicDViSE`,
      );
      let result = await response.json();
      const altYoutubeData = result?.items?.[0].id.videoId;
      const urlYoutube = `https://www.youtube.com/embed/${altYoutubeData}`;
      SetAlt(urlYoutube);
    };
    fetchYoutube();

    const urlTrailer = alt


    setUrlValue(urlTrailer);
  }, [alt,  dataMain.name, dataMain.name]);

  return (
    <>
      { (
        <>
          <div>
            <div className="video-responsive">
              <iframe
                width="600"
                height="480"
                src={urlValue}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Trailer;
