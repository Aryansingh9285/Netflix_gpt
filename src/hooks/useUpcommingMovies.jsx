import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addUpcommingMovies } from "../utils/moviesslice";



const useUpcommingMovies = () => {
    
  const dispatch = useDispatch();
  const getUpcommingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    dispatch(addUpcommingMovies(json.results))
  };
  useEffect(()=>{
    getUpcommingMovies();
  },[])
}

export default useUpcommingMovies;