// pages/course/[courseId].js
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const CourseVideos = () => {
 // const router = useRouter();
 // const { courseId } = router.query;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // if (courseId) {
    //   const fetchVideos = async () => {
    //     const response = await axios.get(`/api/videos?courseId=${courseId}`);
    //     setVideos(response.data);
    //   };

    //   fetchVideos();
    // }
  }, [videos]);

  return (
    <div>
      <h1>Course Videos</h1>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            <img src={video.thumbnail} alt={video.title} />
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            <button onClick={() => window.location.href = video.videoUrl}>Play Video</button>
          </div>
        ))}
      </div>
      <style jsx>{`
        .video-list {
          display: flex;
          flex-wrap: wrap;
        }
        .video-card {
          border: 1px solid #ccc;
          padding: 16px;
          margin: 16px;
          width: 300px;
        }
        .video-card img {
          width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default CourseVideos;
