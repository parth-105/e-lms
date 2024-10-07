
// import { DefaultSidebar } from '@/component/ui/SidebarWithLogo'
import AIAssistantBot from '@/component/ui/chatbot/AIAssistantBot'
import SidebarWithLogo from '@/component/ui/SidebarWithLogo'
import VideoList from '@/component/ui/video/Getallvideos'
import React from 'react'
 
 const page = () => {
   return (
    <div className="flex h-screen">
    {/* <div className="w-1/4 h-full hidden md:block ">
      <SidebarWithLogo />
   
    </div>
    <div className="w-full md:w-3/4 overflow-y-auto  justify-center h-screen scrollbar-hide ">
      <div className='sticky z-30 mb-4'>
       <h1>filter</h1>
      </div>
      <div className='overflow-y-auto  h-screen '> */}
      <VideoList />
      <AIAssistantBot/>
      {/* </div>
    </div> */}
  </div>
   )
 }
 
 export default page
 