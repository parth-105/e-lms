// // "use client"
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios'; // Import Axios
// // import CourseSkeleton from '../CourseSkeleton/CourseSkeleton';
// // import VideoCardlms from '@/component/ui/video-card/VideoCardlms'
// // import { useToast } from "@/hooks/use-toast"


// // const VideoList = () => {
// //   const { toast } = useToast()
// //   const [videos, setVideos] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [selectedSubject, setSelectedSubject] = useState('');
// //   const [loading, setLoading] = React.useState(false);



// //   var filtervideo = videos.filter((item) =>
// //     item.title.trim().toLowerCase().includes(search.trim().toLowerCase())

// //   );

// //   const handleSubjectChange = (e) => {
// //     setSelectedSubject(e.target.value);
// //   };

// //   const filteredCourses = selectedSubject
// //     ? videos.filter((course) => course.subject === selectedSubject) : videos.filter((course) => course.title.trim().toLowerCase().includes(search.trim().toLowerCase()))

// //   useEffect(() => {
// //     const fetchVideos = async () => {
// //       setLoading(true)
// //       try {
// //         const response = await axios.get('/api/videos/getvideos'); // Make a GET request

// //         setVideos(response.data.videos);
// //           setLoading(false)// Update state with fetched videos
// //       } catch (error) {
// //         toast({
// //           variant: "destructive",
// //           title: "Uh oh! Something went wrong.",
// //           description: "There was a problem with your request.",

// //         })
// //         setLoading(false)
// //       }finally{
// //         setLoading(false)
// //       }
// //     };

// //     fetchVideos();

// //     // Cleanup function (optional)
// //     return () => {
// //       // Perform any cleanup (e.g., close connections, unsubscribe, etc.)
// //     };
// //   }, []); // Empty dependency array means this effect runs once on component mount

// //   return (
// //     <div className='container mx-auto p-4' >
// //       <div >
// //         <div >
// //           <input
// //             type="text"
// //             placeholder="Search..."
// //             className="border  rounded-l px-4 py-2  text-black border-black"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>


// //         <div className="mb-8 text-center">
// //           <label htmlFor="subject" className="mr-2">Filter by Subject:</label>
// //           <select
// //             id="subject"
// //             value={selectedSubject}
// //             onChange={handleSubjectChange}
// //             className="border border-gray-300 p-2 rounded"
// //           >
// //            <option value="">All subject</option>
// //                       <option value="Javascript">Javascript</option>
// //                       <option value="React">React</option>
// //                       <option value="Node">Node</option>
// //                       <option value="MongoDB">MongoDB</option>
// //                       <option value="GK">GK</option>
// //                       <option value="ML">Machine Learning</option>
// //                       <option value="ebusiness">E-business</option>
// //             {/* Add more subjects as needed */}
// //           </select>
// //         </div>
// //       </div>


// //       {loading ? <div className='w-full h-full cursor-pointer' > <CourseSkeleton/> </div> : filteredCourses.length > 0 ? (
// //         <div className='flex flex-wrap justify-center'>
// //           {filteredCourses.map((video) => (
// //             <div key={video._id} className=' m-4  ' >
// //               {/* <Videocard video={video} /> */}
// //               <VideoCardlms video={video}/>
// //             </div>
// //           ))
// //           }
// //         </div>) : (
// //         <p>{search ? "Video Not Found" : "No Video On The Platform"}</p>
// //       )
// //       }
// //     </div>
// //   );
// // };

// // export default VideoList;



// "use client";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CourseSkeleton from '../CourseSkeleton/CourseSkeleton';
// import VideoCardlms from '@/component/ui/video-card/VideoCardlms';
// import { useToast } from "@/hooks/use-toast";

// const VideoList = () => {
//   const { toast } = useToast();
//   const [videos, setVideos] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Function to fetch videos (with a timestamp to bypass caching)
//   const fetchVideos = async () => {
//     setLoading(true);
//     try {

//       const response = await axios.get(`/api/videos/getvideos?_=${Date.now()}`);

//       setVideos(response.data.videos);
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Uh oh! Something went wrong.",
//         description: "There was a problem with your request.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch when component mounts
//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   // Filtering logic for videos based on search and subject
//   const filteredCourses = selectedSubject
//     ? videos.filter(course => course.subject === selectedSubject)
//     : videos.filter(course =>
//         course.title.trim().toLowerCase().includes(search.trim().toLowerCase())
//       );

//   return (
//     <div className='container mx-auto p-4'>
//       <div>
//         <div>
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border rounded-l px-4 py-2 text-black border-black"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <div className="mb-8 text-center">
//           <label htmlFor="subject" className="mr-2">Filter by Subject:</label>
//           <select
//             id="subject"
//             value={selectedSubject}
//             onChange={(e) => setSelectedSubject(e.target.value)}
//             className="border border-gray-300 p-2 rounded"
//           >
//             <option value="">All subject</option>
//             <option value="Javascript">Javascript</option>
//             <option value="React">React</option>
//             <option value="Node">Node</option>
//             <option value="MongoDB">MongoDB</option>
//             <option value="GK">GK</option>
//             <option value="ML">Machine Learning</option>
//             <option value="ebusiness">E-business</option>
//           </select>
//         </div>
//       </div>

//       {loading ? (
//         <div className='w-full h-full cursor-pointer'>
//           <CourseSkeleton />
//         </div>
//       ) : filteredCourses.length > 0 ? (
//         <div className='flex flex-wrap justify-center'>
//           {filteredCourses.map((video) => (
//             <div key={video._id} className='m-4'>
//               <VideoCardlms video={video} />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>{search ? "Video Not Found" : "No Video On The Platform"}</p>
//       )}

//       {/* Optional: Add a button to manually refresh the list */}
//       {/* <button
//         onClick={fetchVideos}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Refresh Videos
//       </button> */}
//     </div>
//   );
// };

// export default VideoList;

"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CourseSkeleton from '../CourseSkeleton/CourseSkeleton';
import VideoCardlms from '@/component/ui/video-card/VideoCardlms';
import { useToast } from "@/hooks/use-toast";
import { Search, Filter } from "lucide-react"
// import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Col, message, Row, Select, Input } from "antd";
import DotSpinner from '../loader/DotSpinner';

const VideoList = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMoreRef = useRef(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/videos/getvideos?_=${Date.now()}`);
      setVideos(response.data.videos);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const filteredCourses = videos.filter((video) => {
    const matchesSubject = selectedSubject ? video.subject === selectedSubject : true;
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loadingMore && visibleCount < filteredCourses.length) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 6); // ⬅️ Load 6 more
            setLoadingMore(false);
          }, 800);
        }
      },
      { threshold: 1 }
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [filteredCourses, visibleCount, loadingMore]);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setVisibleCount(6); // Reset on filter change
  };

  return (
    <div className='container mx-auto p-4'>
      <Card className="p-4 shadow-md bg-background border-none">
        <div className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          <div className="relative flex items-center w-full">
            <Input
              type="text"
              placeholder="     Search..."
              className="pl-28 pr-4 py-2 w-full border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(6); // Reset on search
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center text-muted-foreground">
              <Filter size={18} />
            </div>
            <div className="relative">
              <Select
                id="subject"
                value={selectedSubject}
                onChange={handleSubjectChange}
                className="w-[180px] h-10 rounded-md border border-input bg-background "
              >
                <Option value="">All Subjects</Option>
                <Option value="Javascript">Javascript</Option>
                <Option value="React">React</Option>
                <Option value="Node">Node</Option>
                <Option value="MongoDB">MongoDB</Option>
                <Option value="GK">GK</Option>
                <Option value="ML">Machine Learning</Option>
                <Option value="ebusiness">E-business</Option>
              </Select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <br />
      {loading ? (
        <div className='w-full h-full cursor-pointer'>
          <CourseSkeleton />
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className='flex flex-wrap justify-center'>
          {filteredCourses.slice(0, visibleCount).map((video) => (
            <div key={video._id} className='m-4'>
              <VideoCardlms video={video} />
            </div>
          ))}
        </div>
      ) : (
        <p>{search ? "Video Not Found" : "No Video On The Platform"}</p>
      )}

      {loadingMore && (
        <div className="flex justify-center py-3">
        <DotSpinner />
      </div>
      )}

      <div ref={loadMoreRef} className="mt-8 h-10"></div>
    </div>
  );
};

export default VideoList;
