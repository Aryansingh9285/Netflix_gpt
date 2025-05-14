import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMoviesSuggestion from './GptMoviesSuggestion'
import { Netflix_Background_img } from '../utils/constant'

const GptSearch = () => {
  return (
    <div>
         <div className="absolute -z-10">
                <img
                  src={Netflix_Background_img}
                  alt="Netflix background"
                  className="w-full h-full object-cover"
                />
              </div>
        <GptSearchBar/>
        <GptMoviesSuggestion/>
    </div>
  )
}

export default GptSearch