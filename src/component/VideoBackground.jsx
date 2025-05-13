import React from "react";
import {useSelector } from "react-redux";
import useMoviesTrailer from "../hooks/useMoviesTrailer";


const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(store =>store.movies?.trailerVideo)
   
    useMoviesTrailer(movieId);

  return (
    <div >
      <iframe
      className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo?.[0  ].key}?.si=rf9ETRs1kdP9KT80`+" &autoplay=1&mute=1"}
        title="YouTube video player"
      
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
