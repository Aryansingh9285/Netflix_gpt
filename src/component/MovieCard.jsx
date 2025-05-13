import React from 'react'
import { image_cdn_url } from '../utils/constant'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-48'>
        <img 
        src={image_cdn_url + posterPath} 
        alt="Movie Poster" 
      />
    </div>
  )
}

export default MovieCard