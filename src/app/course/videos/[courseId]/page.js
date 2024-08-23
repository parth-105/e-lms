"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import VideoCard from '@/component/course/Video-card';
function videos({ params }) {

  const [Videos, setVideos] = useState([]);
  const courseId = params.courseId;
  useEffect(() => {
    if (courseId) {
      const fetchVideos = async () => {
      
 
        const response = await axios.post("http://localhost:3000/api/course/coursevideo", { courseId: courseId });
     
       // console.log(response.data);

        console.log("HHHHHHHHHHHHHHHHHHHHHHHH", response.data.videos);

        setVideos(response.data.videos);
        console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLL",Videos);

      };

      fetchVideos();
    }
   
    

  }, [])


  return (
    <div>
      <div>videos in course {params.courseId}</div>
      {Videos.length > 0 ? (
        Videos.map((videoData) => (
          <VideoCard
            key={videoData._id}
            title={videoData.title}
            description={videoData.description}
            thumbnail={videoData.thumbnail}
            url={videoData.url}
          />
        ))
      ) : (
        <p>No video available.</p>
      )}

    </div>

  )
}

export default videos