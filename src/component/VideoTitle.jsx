import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] md:pt-[15%] lg:pt-[12%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black/70 to-transparent">
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{title}</h1>
      <p className="hidden sm:inline-block py-3 md:py-6 text-sm sm:text-base md:text-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3">{overview}</p>
      <div className="flex gap-2 md:gap-4 my-2">
        <button className="bg-gray-300 text-black py-2 md:py-4 px-4 md:px-9 text-base md:text-xl rounded-lg hover:bg-white/80 transition-all duration-200 flex items-center font-semibold shadow-lg">
          ▷ Play
        </button>
        <button className="hidden sm:flex bg-gray-500/50 text-white py-2 md:py-3 px-4 md:px-8 text-base md:text-xl rounded-lg hover:bg-gray-500/70 transition-all duration-200 items-center font-semibold backdrop-blur-sm">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
