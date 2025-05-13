import React from "react";
import {useSelector } from "react-redux";
import useMoviesTrailer from "../hooks/useMoviesTrailer";


const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(store =>store.movies?.trailerVideo)
   
    useMoviesTrailer(movieId);

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailerVideo?.[0  ].key}?.si=rf9ETRs1kdP9KT80`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
