'use client'
import React, { useState } from 'react';

const VideoCard = ({ title, description, thumbnail, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  console.log('data', thumbnail, videoUrl);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
   

            <img
              className="h-48 w-full object-cover md:w-48 cursor-pointer"
              src={thumbnail}
              alt={title}
              onClick={handlePlayClick}
            />

          </div>
          <div className="p-8">
            <h3 className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
              {title}
            </h3>
            <p className="mt-2 text-gray-500">{description}</p>
       
          </div>
        </div>

      </div>

    </div>
  );
};

export default VideoCard;
