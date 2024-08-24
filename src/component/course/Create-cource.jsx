// pages/add-course.js
'use client'
import { useState } from "react";
//import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import clientPromise from "../lib/mongodb";
import { uploadFileAndGetUrl } from '@/helpers/firebaseUtils';
import axios from 'axios';
import { useRouter } from "next/navigation";
import useLocalStorage from "@/helpers/useLocalStorage.js";

export default function AddCourse() {
  const router = useRouter();
  const [coursetitle, setcourseTitle] = useState("");
  const [Cprice, setCPrice] = useState("");
  const [Cthumbnail, setCThumbnail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [Loading, setLoading] = useState(false);

  //for video


  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [subject, setSubject] = useState('');
  const [videoTopic, setVideoTopic] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [loading, setloading] = useState(false)
  const [isFree, setIsFree] = useState(false);
   const [data, setData] = useLocalStorage('e-learning-user', '');

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);

  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);

  }
  const videoUpload = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      const thumbnailurl = await uploadFileAndGetUrl(thumbnail);
      const videoFileurl = await uploadFileAndGetUrl(videoFile);
      const response = await axios.post("/api/videos/uploadvideo", { title: videoTopic, description: videoDescription, instructor: data._id, thambnail: thumbnailurl, videourl: videoFileurl, isFree: isFree });
      console.log("video success", response.data);
      console.log("video url >>>", response.data.video._id);

      setVideos((e) => [...e, response.data.video._id])
      if (response) {
        setLoading(false)
        // setThumbnail(null)
        // setSubject('')
        // setVideoFile(null)
        // setVideoTopic('')
        // setVideoDescription('')
       // router.push("/instructor/course")
      }

    } catch (error) {
      console.log("Login failed", error.message)
    }
  }

  // Save course data to MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const thumbnailurl = await uploadFileAndGetUrl(Cthumbnail);
      // const videoFileurl = await uploadFileAndGetUrl(videoFile);
      const response = await axios.post("/api/course/addcourse", { title: coursetitle, price: Cprice, instructor:data._id, thambnail: thumbnailurl, videos: videos ,subject });
      console.log("course success", response.data);
      if (response) {
        setloading(false)
         console.log('responce',response.cource)
     //   router.push("/course")
      }

    } catch (error) {
      console.log("Login failed", error.message);
    }




    // Reset form fields if needed
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-700">Add New Course</h2>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-gray-600">Course Title</label>
          <input
            type="text"
            placeholder="Title"
            value={coursetitle}
            onChange={(e) => setcourseTitle(e.target.value)}
            required
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-gray-600">Price</label>
          <input
            type="number"
            placeholder="Price"
            value={Cprice}
            onChange={(e) => setCPrice(e.target.value)}
            required
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              {/* Add more subject options as needed */}
            </select>
          </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-gray-600">Thumbnail</label>
          <input
            type="file"
            onChange={(e) => setCThumbnail(e.target.files[0])}
            required
            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          Add Course
        </button>
      </form>

      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Upload Teaching Video</h2>
        <form onSubmit={videoUpload}>

          {/* Thumbnail */}
          <div className="mb-4">
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
              Video Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              onChange={handleThumbnailChange}
            />
          </div>

          {/* Video File */}
          <div className="mb-4">
            <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">
              Video File
            </label>
            <input
              type="file"
              id="videoFile"
              name="videoFile"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              onChange={handleVideoFileChange}
            />
          </div>

          {/* Subject Dropdown */}
          {/* <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              {/* Add more subject options as needed */}
            {/* </select>
          </div> */} 

          {/* Video Topic */}
          <div className="mb-4">
            <label htmlFor="videoTopic" className="block text-sm font-medium text-gray-700">
              Video Topic
            </label>
            <input
              type="text"
              id="videoTopic"
              name="videoTopic"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={videoTopic}
              onChange={(e) => setVideoTopic(e.target.value)}
            />
          </div>

          {/* Video Description */}
          <div className="mb-4">
            <label htmlFor="videoDescription" className="block text-sm font-medium text-gray-700">
              Video Description
            </label>
            <textarea
              id="videoDescription"
              name="videoDescription"
              rows="3"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Loading..." : "Upload Video"}
          </button>
        </form>
      </div>


    </div>

  );
};





