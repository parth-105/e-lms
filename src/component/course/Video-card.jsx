'use client'
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

const VideoCard = ({ title, description, thumbnail, videoUrl }) => {
  // const [isPlaying, setIsPlaying] = useState(false);

  console.log('data', thumbnail, videoUrl);

  // const handlePlayClick = () => {
  //   setIsPlaying(true);
  // };

  return (
    // <div>
    //   <div className="w-full max-w-[26rem] shadow-lg cursor-pointer opacity-70 hover:opacity-100">
    //     <div className="md:flex">
    //       <div className="md:flex-shrink-0">
   

    //         <img
    //           className="h-48 w-full object-cover md:w-48 cursor-pointer"
    //           src={thumbnail}
    //           alt={title}
    //           // onClick={handlePlayClick}
    //         />

    //       </div>
    //       <div className="p-8">
    //         <h3 className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
    //           {title}
    //         </h3>
    //         <p className="mt-2 text-gray-500">{description}</p>
       
    //       </div>
    //     </div>

    //   </div>

    // </div>
  
    <Card className="video-card p-2 mb-4 border rounded-lg shadow-md cursor-pointer">
      <CardHeader floated={false} className="h-[100%]">
        <img className="h-full" src={thumbnail} alt={title}/>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          {title}
        </Typography>
      </CardBody>
    </Card>
    
  );
};

export default VideoCard;
