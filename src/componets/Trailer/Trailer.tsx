import React, { useEffect, useState } from 'react';
import { useFetcTrailerQuery } from '../../store/MovieApi';
import styles from './Trailer.module.scss';
import Skeleton from './Skeleton';
import { argType } from '../../types';

const Trailer = ({ id, title, year }: argType) => {
  const { data, isLoading } = useFetcTrailerQuery(id);
  const [alt, SetAlt] = useState('');
  const [urlValue, setUrlValue] = useState('');

  useEffect(() => {
    const fetchYoutube = async () => {
      let response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title} ${year}&type=video&key=AIzaSyC0eVRG5nSA0E-bPOjsBjq98YPeicDViSE`,
      );
      let result = await response.json();
      const altYoutubeData = result?.items?.[0].id.videoId;
      const urlYoutube = `https://www.youtube.com/embed/${altYoutubeData}`;
      SetAlt(urlYoutube);
    };
    fetchYoutube();

    const urlTrailer = data
      ? data.error
        ? alt
        : `https://www.youtube.com/embed/${data?.videos[0]?.youtube_video_id}`
      : alt;

    setUrlValue(urlTrailer);
  }, [alt, data, title, year]);

  return (
    <>
      {isLoading ? (
        <div>
          <Skeleton />
        </div>
      ) : (
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
