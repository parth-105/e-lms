"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import VideoCard from '@/component/course/Video-card';
import ReactPlayer from 'react-player';
function videos({ params }) {

  const [Videos, setVideos] = useState([]);
 // const [currentUrl, setCurrentUrl] = useState('');
 const [currentUrl, setCurrentUrl] = useState();
 const [currentvideodata, setCurrentvideodata] = useState();
  const courseId = params.courseId;
  useEffect(() => {
    if (courseId) {
      const fetchVideos = async () => {

        console.log('cid', courseId)

        const response = await axios.post("/api/course/coursevideo", { courseId: courseId });

        console.log('videodata', response.data.videos);
        console.log('url', response.data.videos[0].videourl);
       

        // console.log("HHHHHHHHHHHHHHHHHHHHHHHH", response.data.videos);

        setVideos(response.data.videos);
        setCurrentUrl(response?.data?.videos?.[0]?.videourl);
        setCurrentvideodata(response?.data?.videos?.[0])
        //  console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLL",Videos);

      };

      fetchVideos();
    }



  }, [])

  const currentvideo =(videoData)=>{
    setCurrentUrl(videoData.videourl)
    setCurrentvideodata(videoData)
  }


  return (
    <div>
      {/* <div>videos in courses{params.courseId}</div> */}
      <div className="flex">
        <div className="w-1/4 p-4 bg-gray-100 overflow-y-scroll h-screen" >
          {Videos.length > 0 ? (
            Videos.map((videoData) => (
              <div key={videoData._id}>
              <VideoCard
                key={videoData._id}
                title={videoData.title}
                description={videoData.description}
                thumbnail={videoData.thambnail}
                url={videoData.videourl}
              />
              <button
              onClick={() => {currentvideo(videoData)}}
              className="text-blue-500 hover:underline"
            >
              play
            </button>
            </div>
            ))
          ) : (
            <p>No video available.</p>
          )}
        </div>
        {Videos.length > 0 ? (
        <div className="w-3/4 p-4">
          <ReactPlayer url={currentUrl} controls width="100%" height="100%" />
          <h2 className="text-xl font-bold mb-2">{currentvideodata?.title}</h2>
        <p className="mb-4">{currentvideodata?.description}</p>
        </div>
        ):null}
      </div>
    </div>

  )
}

export default videos