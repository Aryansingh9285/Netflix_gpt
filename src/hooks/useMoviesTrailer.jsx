import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTralierVideo } from "../utils/moviesslice";
import { useEffect } from "react";

const useMoviesTrailer = (movieId) => {
 const dispatch = useDispatch();
    const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    const trailer = json.results.filter((video) => video.type == "Trailer");
    // console.log(trailer);
    dispatch(addTralierVideo(trailer));
  };

  useEffect(() => {
    getMovieVideo();
  }, []);

}

export default useMoviesTrailer;