import React from 'react';
import MovieCard from './MovieCard';

const GptMoviesSuggestion = ({ movies }) => {
  if (!movies?.length) return null;

  return (
    <div className="p-2 md:p-4 m-2 md:m-4 bg-black/90">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {movies.map((movie) => {
          if (!movie) return null;
          
          return (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.original_title}
              year={movie.release_date?.split('-')[0]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GptMoviesSuggestion;