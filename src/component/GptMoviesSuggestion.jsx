import React from 'react';
import MovieCard from './MovieCard';

const GptMoviesSuggestion = ({ movies }) => {
  if (!movies?.length) return null;

  return (
    <div className="p-2 md:p-4 m-2 md:m-4 bg-black/90">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {/* Genre Card */}
        <div className="w-[200px] h-[200px] bg-gray-800 rounded-lg flex items-center justify-center p-4 text-center">
          <div>
            <h2 className="text-white text-xl font-bold mb-2">Search Movie Genre</h2>
           
            <p className="text-gray-400 mt-4 text-sm">
              Showing {movies.length} movie{movies.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Existing Movie Cards */}
        {movies.map((movie) => {
          if (!movie) return null;
          console.log("Movie Data:", movie);
          
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