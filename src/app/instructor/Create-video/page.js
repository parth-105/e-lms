
import VideoUploadForm from '@/component/video-upload/VideoUploadForm'
import React from 'react'

function page() {
  return (
    <div>
      <h1>create video</h1>
    
      <div className="min-h-screen flex items-center justify-center">
      <VideoUploadForm />
    </div>
    </div>
  )
}

export default page
