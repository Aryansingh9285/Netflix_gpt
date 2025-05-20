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

  // Mock GPT results using keywords
  const getMockGptResults = (query) => {
    return new Promise((resolve) => {
      const lowerQuery = query.toLowerCase();
      let results = BOLLYWOOD_MOVIES.default || [];

      if (lowerQuery.includes("action")) {
        results = BOLLYWOOD_MOVIES.action;
      } else if (lowerQuery.includes("romance")) {
        results = BOLLYWOOD_MOVIES.romance;
      } else if (lowerQuery.includes("sifi") || lowerQuery.includes("sci-fi")) {
        results = BOLLYWOOD_MOVIES.sifi;
      } else if (lowerQuery.includes("comedy")) {
        results = BOLLYWOOD_MOVIES.comedy;
      } else if (lowerQuery.includes("thriller")) {
        results = BOLLYWOOD_MOVIES.thriller;
      }

      resolve(results || []);
    });
  };

  // TMDB API search
  const SearchMovies = async (movieName) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      return json.results?.[0] || null;
    } catch (error) {
      console.error("Error searching movie:", error);
      return null;
    }
  };

  // Handle GPT Search
  const handleGptSearchClick = async (e) => {
    e.preventDefault();
    const query = searchText.current?.value;
    if (!query) return;

    setIsLoading(true);
    try {
      const mockResults = await getMockGptResults(query);
      console.log("Mock GPT Results:", mockResults);

      if (!Array.isArray(mockResults)) {
        console.error("Mock results not an array:", mockResults);
        setSearchResults([]);
        return;
      }

      const movieDetailsPromises = mockResults.map((movie) => SearchMovies(movie));
      const movieDetails = await Promise.all(movieDetailsPromises);
      const validMovies = movieDetails.filter((movie) => movie !== null);
      setSearchResults(validMovies);

    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-2 md:px-6 flex flex-col items-center"><br />
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={handleGptSearchClick}>
        <input
          ref={searchText}
          type="text"
          className="p-2 m-2 md:p-4 md:m-4 bg-amber-50 col-span-9 rounded-lg text-sm md:text-base"
          placeholder={lang[langKey]?.gptSearchPlaceholder || "What kind of movies do you want to watch?"}
          disabled={isLoading}
        />
        <button
          className={`col-span-3 m-2 md:m-4 py-1 md:py-2 px-2 md:px-4 bg-red-700 text-white rounded-lg text-sm md:text-base
            ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-800"}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : lang[langKey]?.search || "Search"}
        </button>
      </form><br />
      
      {/* Genre Hint Message */}
      <div className="w-full md:w-1/2 text-white text-center p-2 text-sm bg-black/90">
        <p className="text-gray-300 mb-1">Available genres:</p>
        <p className="text-yellow-500">
          Try searching for: <span className="font-semibold">Action, Romance, Sci-Fi, Comedy, Thriller</span>
        </p>
      </div>

      <GptMoviesSuggestion movies={searchResults} />
    </div>
  );
};

export default GptSearchBar;
