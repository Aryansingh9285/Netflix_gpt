import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-36 px-24 absolute text-white bg-gradient-to-r from-black/70 to-transparent">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="flex gap-4">
        <button className="bg-gray-300 text-black py-3 px-8 text-xl rounded-lg hover:bg-white/80 transition-all duration-200 flex items-center font-semibold shadow-lg">
          
          ▷ Play
        </button>
        <button className="bg-gray-500/50 text-white py-3 px-8 text-xl rounded-lg hover:bg-gray-500/70 transition-all duration-200 flex items-center font-semibold backdrop-blur-sm">
         ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
