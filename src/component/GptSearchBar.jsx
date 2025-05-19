import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { BOLLYWOOD_MOVIES } from "../utils/mockMovieData";
import GptMoviesSuggestion from "./GptMoviesSuggestion";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const langKey = useSelector((store) => store.config.lang);

  const getMockGptResults = (query) => {
    return new Promise((resolve) => {
      let results;
      if (query.toLowerCase().includes('action')) {
        results = BOLLYWOOD_MOVIES.action;
      } else if (query.toLowerCase().includes('romance')) {
        results = BOLLYWOOD_MOVIES.romance;
      } else {
        results = BOLLYWOOD_MOVIES.default;
      }
      resolve(results);
    }, 1000);
  };

  const SearchMovies = async (movieName) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      return json.results[0]; // Return only the first match
    } catch (error) {
      console.error("Error searching movie:", error);
      return null;
    }
  };

  const handleGptSearchClick = async (e) => {
    e.preventDefault();
    if (!searchText.current?.value) return;

    setIsLoading(true);
    try {
      const mockResults = await getMockGptResults(searchText.current.value);
      console.log("Mock GPT Results:", mockResults);

      // Search TMDB for each movie
      const movieDetailsPromises = mockResults.map(movie => SearchMovies(movie));
      const movieDetails = await Promise.all(movieDetailsPromises);
      
      // Filter out null results
      const validMovies = movieDetails.filter(movie => movie !== null);
      setSearchResults(validMovies);

    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-2 md:px-6 flex flex-col items-center">
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={handleGptSearchClick}>
        <input
          ref={searchText}
          type="text"
          className="p-2 m-2 md:p-4 md:m-4 bg-amber-50 col-span-9 rounded-lg text-sm md:text-base"
          placeholder={lang[langKey]?.gptSearchPlaceholder}
          disabled={isLoading}
        />
        <button
          className={`col-span-3 m-2 md:m-4 py-1 md:py-2 px-2 md:px-4 bg-red-700 text-white rounded-lg text-sm md:text-base
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-800'}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : lang[langKey]?.search}
        </button>
      </form>
      <GptMoviesSuggestion movies={searchResults} />
    </div>
  );
};

export default GptSearchBar;
