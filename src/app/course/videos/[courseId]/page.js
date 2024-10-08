"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import VideoCard from '@/component/course/Video-card';
import ReactPlayer from 'react-player';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

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
        //  console.log('url', response.data.videos[0].videourl);


        // console.log("HHHHHHHHHHHHHHHHHHHHHHHH", response.data.videos);

        setVideos(response.data.videos);
        setCurrentUrl(response?.data?.videos?.[0]?.videourl);
        setCurrentvideodata(response?.data?.videos?.[0])
        //  console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLL",Videos);

      };

      fetchVideos();
    }
  }, [])

  const currentvideo = (videoData) => {
    setCurrentUrl(videoData.videourl)
    setCurrentvideodata(videoData)
  }


  return (


    <div className="container mx-auto px-4 py-8">
      <Card className="w-full">
        <div className="space-y-4">
          {Videos.length > 0 ? (
            <div className="relative aspect-video ">
              <ReactPlayer url={currentUrl} controls width="100%" height="100%" />
              <h2 className="text-xl font-bold mb-2">{currentvideodata?.title}</h2>
              <p className="mb-4">{currentvideodata?.description}</p>
            </div>
          ) : null}



          <ScrollArea className="h-[300px] border rounded-md p-4">
            {Videos.length > 0 ? (

              Videos.map((videoData) => (
                <div className="space-y-4">
                  <div
                    key={videoData._id}
                    className={`flex bottom-8 items-center space-x-4 p-2 rounded-md cursor-pointer transition-colors ${videoData?.videourl === currentUrl ? 'bg-[#f1f5f9]' : 'hover:bg-[#f3f4f6]'
                      }`}
                    onClick={() => { currentvideo(videoData) }}
                  >
                    <img
                      src={videoData?.thambnail}
                      alt={videoData?.title}
                      className="w-32 h-18 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium">{videoData?.title}</h4>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No video available.</p>
            )}
          </ScrollArea>
        </div>
      </Card>
    </div>


  )
}

export default videos