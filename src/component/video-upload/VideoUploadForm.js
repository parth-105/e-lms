"use client"
// components/VideoUploadForm.js
import React, { useState } from 'react';
import useLocalStorage from '@/helpers/useLocalStorage.js'
import { uploadFileAndGetUrl } from '@/helpers/firebaseUtils';
import axios from 'axios';
import {useRouter} from "next/navigation";

const VideoUploadForm = () => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [videoTopic, setVideoTopic] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [loading ,setloading]=useState(false)
  const [data, setData] = useLocalStorage('e-learning-user', '');

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
    //console.log("data",data)
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setloading(true)
      const thumbnailurl = await uploadFileAndGetUrl(thumbnail);
      const videoFileurl = await uploadFileAndGetUrl(videoFile);
      const response = await axios.post("/api/videos/uploadvideo", {title:videoTopic, description:videoDescription, instructor:data._id,thambnail:thumbnailurl,videourl:videoFileurl});
      console.log("video success", response.data);
      if(response){
        setloading(false)
        setThumbnail(null)
        setSubject('')
        setVideoFile(null)
        setVideoTopic('')
        setVideoDescription('')
        router.push("/Admin")
      }

    }catch(error){
      console.log("Login failed", error.message);
    }
      
    
    
  
    // Reset form fields if needed
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Teaching Video</h2>
      <form onSubmit={handleSubmit}>
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
            {/* Add more subject options */}
          </select>
        </div>

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
           {loading ? "loding" :"upload video"}
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
