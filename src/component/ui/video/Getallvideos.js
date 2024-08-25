"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { Videocard } from './Videocard';


const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");


  var filtervideo = videos.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos/getvideos'); // Make a GET request
        console.log("video responce", response.data.videos)
        setVideos(response.data.videos); // Update state with fetched videos
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();

    // Cleanup function (optional)
    return () => {
      // Perform any cleanup (e.g., close connections, unsubscribe, etc.)
    };
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div>
      <div>
      <input
                type="text"
                placeholder="Search..."
                className="border  rounded-l px-4 py-2 w-1/2 text-black border-black"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
      </div>
      {filtervideo.length > 0 ? (
        <div className='flex flex-wrap justify-center'>
          {filtervideo.map((video) => (
            <div key={video._id} className=' m-4  ' >
              <Videocard video={video} />
              {/* Display other video details */}
            </div>
          ))
          }
        </div>) : (
        <p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
      )
      }
    </div>
  );
};

export default VideoList;