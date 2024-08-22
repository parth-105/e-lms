'use client'
import React, { useState } from 'react';

const VideoCard = ({ title, description, thumbnail, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  console.log(thumbnail,videoUrl);
  
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div>
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          {!isPlaying ? (
            <img
              className="h-48 w-full object-cover md:w-48 cursor-pointer"
              src={thumbnail}
              alt={title}
              onClick={handlePlayClick}
            />
          ) : (
            <video
              className="h-48 w-full object-cover md:w-48"
              controls
              autoPlay
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="p-8">
          <h3 className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
            {title}
          </h3>
          <p className="mt-2 text-gray-500">{description}</p>
          {!isPlaying && (
            <button
              onClick={handlePlayClick}
              className="text-indigo-500 hover:underline mt-4"
            >
              Play Video
            </button>
          )}
        </div>
      </div>
    
    </div>
   
    </div>
  );
};

export default VideoCard;
