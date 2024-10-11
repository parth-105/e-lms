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
import DotSpinner from "../ui/loader/DotSpinner";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"


import { Plus, Upload, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
//import { toast } from "@/components/ui/use-toast"

export default function AddCourse() {
  const { toast } = useToast()
  const router = useRouter();
  const [coursetitle, setcourseTitle] = useState("");
  const [Cprice, setCPrice] = useState("");
  const [Cthumbnail, setCThumbnail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [serch, setSerch] = useState('')

  //for video


  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [subject, setSubject] = useState('');
  const [videoTopic, setVideoTopic] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [vloading, setvloading] = useState(false)
  const [loading, setloading] = useState(false)
  const [isFree, setIsFree] = useState(false);
  const [data, setData] = useLocalStorage('e-learning-user', '');

  const handleThumbnailChange = (e) => {

    setThumbnail(e.target.files[0]);

  };

  const handleAddVideo = () => {
    setVideos(prev => [...prev, { thumbnail: null, videoFile: null, topic: '', description: '' }])
  }

  const handleVideoFileChange = (e) => {

    setVideoFile(e.target.files[0]);

  }
  const videoUpload = async (e) => {
    e.preventDefault();
    if (!videoTopic || !videoDescription) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      return;
    }
    try {
      setvloading(true)
      if (!thumbnail || !videoFile) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
        });
        setvloading(false)
        return;
      }
      const thumbnailurl = await uploadFileAndGetUrl(thumbnail);
      const videoFileurl = await uploadFileAndGetUrl(videoFile);

      const response = await axios.post("/api/videos/uploadvideo", { title: videoTopic, description: videoDescription, instructor: data._id, thambnail: thumbnailurl, videourl: videoFileurl, isFree: isFree });
      console.log("video success", response.data);
      console.log("video url >>>", response.data.video._id);

      setVideos((e) => [...e, response.data.video._id])
      if (response) {
        setvloading(false)
        setVideoTopic('')
        setVideoDescription('')
        setVideoFile(null)
        setThumbnail(null)
        //router.push("/instructor/course")
      }

    } catch (error) {
      console.log("Login failed", error.message)
    }
    finally {
      setvloading(false)
    }
  }

  // Save course data to MongoDB
  const handleSubmit = async (e) => {
    setloading(true)
    e.preventDefault();
    try {
      if (!Cthumbnail) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
        });
        setLoading(false)
        return;
      }
      setLoading(true)
      const thumbnailurl = await uploadFileAndGetUrl(Cthumbnail);
      // const videoFileurl = await uploadFileAndGetUrl(videoFile);
      const response = await axios.post("/api/course/addcourse", { title: coursetitle, price: Cprice, instructor: data._id, subject: subject, thambnail: thumbnailurl, videos: videos });
      console.log("course success", response.data);
      if (response) {
        setloading(false)
        console.log('responce', response.cource)
        router.push("/course")
      }

    } catch (error) {
      console.log("Login failed", error.message);
    }




    // Reset form fields if needed
  };


  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6">
    //   <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6 order-2 md:order-1">
    //     <h2 className="text-2xl font-bold text-center text-gray-700">Add New Course</h2>

    //     <div className="flex flex-col">
    //       <label className="mb-2 text-sm font-semibold text-gray-600">Course Title</label>
    //       <input
    //         type="text"
    //         placeholder="Title"
    //         value={coursetitle}
    //         onChange={(e) => setcourseTitle(e.target.value)}
    //         required
    //         className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     <div className="flex flex-col">
    //       <label className="mb-2 text-sm font-semibold text-gray-600">Price</label>
    //       <input
    //         type="number"
    //         placeholder="Price"
    //         value={Cprice}
    //         onChange={(e) => setCPrice(e.target.value)}
    //         required
    //         className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     {/* Subject Dropdown */}
    //     <div className="mb-4">
    //       <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
    //         Subject
    //       </label>
    //       <select
    //         id="subject"
    //         name="subject"
    //         className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         value={subject}
    //         onChange={(e) => setSubject(e.target.value)}
    //       >
    //         <option value="">Select Subject</option>
    //         <option value="Javascript">Javascript</option>
    //         <option value="React">React</option>
    //         <option value="Node">Node</option>
    //         <option value="MongoDB">MongoDB</option>
    //         <option value="GK">GK</option>
    //         <option value="ML">Machine Learning</option>
    //         <option value="ebusiness">E-business</option>
    //         {/* Add more subject options as needed */}
    //       </select>
    //     </div>
    //     <div className="flex flex-col">
    //       <label className="mb-2 text-sm font-semibold text-gray-600">Thumbnail</label>
    //       <Input
    //         type="file"
    //         onChange={(e) => setCThumbnail(e.target.files[0])}
    //         required
    //         className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 ease-in-out"
    //     >
    //       {loading ? "LOADING...." : "Add course"}
    //     </button>
    //   </form>

    //   <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md order-1 md:order-2">
    //     <h2 className="text-xl font-semibold mb-4 text-center">Upload Teaching Video</h2>
    //     <form onSubmit={videoUpload}>

    //       {/* Thumbnail */}
    //       <div className="mb-4">
    //         <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
    //           Video Thumbnail
    //         </label>
    //         <Input
    //           type="file"
    //           id="thumbnail"
    //           name="thumbnail"
    //           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    //           onChange={handleThumbnailChange}
    //         />
    //       </div>

    //       {/* Video File */}
    //       <div className="mb-4">
    //         <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">
    //           Video File
    //         </label>
    //         <Input
    //           type="file"
    //           id="videoFile"
    //           name="videoFile"
    //           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    //           onChange={handleVideoFileChange}
    //         />
    //       </div>

    //       {/* Subject Dropdown
    //       <div className="mb-4">
    //         <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
    //           Subject
    //         </label>
    //         <select
    //           id="subject"
    //           name="subject"
    //           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //           value={subject}
    //           onChange={(e) => setSubject(e.target.value)}
    //         >
    //           <option value="">Select Subject</option>
    //           <option value="DSA">DSA</option>
    //           <option value="OS">Oprating system</option>
    //           <option value="Language">Languages</option>
    //           <option value="Ai">AI/ML</option>
    //           <option value="Data">Data Science</option>
    //           {/* Add more subject options as needed 
    //         </select>
    //       </div> */}

    //       {/* Video Topic */}
    //       <div className="mb-4">
    //         <label htmlFor="videoTopic" className="block text-sm font-medium text-gray-700">
    //           Video Topic
    //         </label>
    //         <input
    //           type="text"
    //           id="videoTopic"
    //           name="videoTopic"
    //           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    //           value={videoTopic}
    //           onChange={(e) => setVideoTopic(e.target.value)}
    //         />
    //       </div>

    //       {/* Video Description */}
    //       <div className="mb-4 border-black ">
    //         <label htmlFor="videoDescription" className="block text-sm font-medium text-gray-700">
    //           Video Description
    //         </label>
    //         <textarea
    //           id="videoDescription"
    //           name="videoDescription"
    //           rows="3"
    //           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-300 border-black rounded-md"
    //           value={videoDescription}
    //           onChange={(e) => setVideoDescription(e.target.value)}
    //         />
    //       </div>

    //       {/* Submit Button */}
    //       <button
    //         type="submit"
    //         className="w-full h-screen py-2 px-4 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //       >
    //         {vloading ? "LOADING...." : "Upload Video"}
    //       </button>
    //     </form>
    //   </div>


    // </div>
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" name="title" value={coursetitle} onChange={(e) => setcourseTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" value={Cprice} onChange={(e) => setCPrice(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <select id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required >
              <option value="">Select Subject</option>
    //         <option value="Javascript">Javascript</option>
    //         <option value="React">React</option>
    //         <option value="Node">Node</option>
    //         <option value="MongoDB">MongoDB</option>
    //         <option value="GK">GK</option>
    //         <option value="ML">Machine Learning</option>
    //         <option value="ebusiness">E-business</option>
    //         {/* Add more subject options as needed */}
    //       </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Course Thumbnail</Label>
            <Input id="thumbnail" name="thumbnail" type="file" onChange={(e) => setCThumbnail(e.target.files[0])} accept="image/*" required />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Videos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Video </CardTitle>
              {/* <Button variant="ghost" size="sm" onClick={() => handleRemoveVideo(index)}><X className="h-4 w-4" /></Button> */}
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`video-thumbnail-`}>Video Thumbnail</Label>
                  <Input
                    id={`video-thumbnail-`}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`video-file-`}>Video File</Label>
                  <Input
                    id={`video-file-`}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`video-topic-`}>Video Topic</Label>
                <Input
                  id={`video-topic-`}
                  value={videoTopic}
                  onChange={(e) => setVideoTopic(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`video-description`}>Video Description</Label>
                <Textarea
                  id={`video-description-`}
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Button type="button" variant="outline" onClick={videoUpload} className="w-full">
            {vloading ? "LOADING...." : "Add video"}
          </Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" onClick={handleSubmit}>
        <Upload className="mr-2 h-4 w-4" /> Publish Course
      </Button>
    </form>

  );
};


