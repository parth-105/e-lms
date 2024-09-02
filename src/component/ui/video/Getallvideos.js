"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { Videocard } from './Videocard';
import DotSpinner from '@/component/ui/loader/DotSpinner';


const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = React.useState(false);



  var filtervideo = videos.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())

  );

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const filteredCourses = selectedSubject
    ? videos.filter((course) => course.subject === selectedSubject) : videos.filter((course) => course.title.trim().toLowerCase().includes(search.trim().toLowerCase()))

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/api/videos/getvideos'); // Make a GET request
        console.log("video responce", response.data.videos)
        setVideos(response.data.videos);
          setLoading(false)// Update state with fetched videos
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
    <div className='container mx-auto p-4' >
      <div >
        <div >
          <input
            type="text"
            placeholder="Search..."
            className="border  rounded-l px-4 py-2  text-black border-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <div className="mb-8 text-center">
          <label htmlFor="subject" className="mr-2">Filter by Subject:</label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="">All Subjects</option>
            <option value="DSA">DSA</option>
            <option value="OS">Oprating system</option>
            <option value="Language">Languages</option>
            <option value="Ai">AI/ML</option>
            <option value="Data">Data Science</option>
            {/* Add more subjects as needed */}
          </select>
        </div>
      </div>


      {loading ? <div className=' justify-center flex p-20 w-full h-screen ' > <DotSpinner /> </div> : filteredCourses.length > 0 ? (
        <div className='flex flex-wrap justify-center'>
          {filteredCourses.map((video) => (
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