import React from 'react'
import { image_cdn_url } from '../utils/constant'

const MovieCard = ({ posterPath, title, year }) => {
  if (!posterPath) return null;
  
  return (
    <div className='w-36 md:w-48 bg-black bg-opacity-50 rounded-lg transition-transform hover:scale-105'>
      <div className='relative'>
        <img 
          src={image_cdn_url + posterPath} 
          alt={title}
          className='w-full rounded-t-lg'
        />
        <div className='absolute bottom-0 w-full p-1 md:p-2 bg-black bg-opacity-75'>
          <h3 className='text-white text-center text-xs md:text-sm font-bold truncate'>
            {title}
          </h3>
          {year && (
            <div className='text-gray-400 text-xs text-center hidden md:block'>
              {year}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieCard