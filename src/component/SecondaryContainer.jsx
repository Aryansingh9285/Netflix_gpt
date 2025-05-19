import React from 'react'
import MovieCard from './MovieCard'
import Movielist from './Movielist'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store)=>store.movies)
  return (
    <div className='bg-black'>
      <div className='mt-0 md:-mt-52 pl-12 relative z-20'>
<Movielist title={"Now Playing"} movies = {movies.NowPlayingMovies}/>
    <Movielist title={"Top Rated Movies"} movies = {movies.topratedmovies}/>
    <Movielist title={"Popular"} movies = {movies.popularMovies}/>
    <Movielist title={"Upcoming Movies"} movies = {movies.upcommingmovies}/>
    <Movielist title={"Horror Movies"} movies = {movies.NowPlayingMovies}/>
      </div>

    </div>
  ) 
}

export default SecondaryContainer