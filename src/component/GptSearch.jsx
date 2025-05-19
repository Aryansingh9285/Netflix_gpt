import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMoviesSuggestion from './GptMoviesSuggestion'
import { Netflix_Background_img } from '../utils/constant'

const GptSearch = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed -z-10 w-screen h-screen">
        <img
          src={Netflix_Background_img}
          alt="Netflix background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="pt-[35%] md:pt-[10%]"> {/* Adjusted padding for mobile/desktop */}
        <GptSearchBar />
        <GptMoviesSuggestion />
      </div>
    </div>
  )
}

export default GptSearch