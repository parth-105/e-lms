

// import ChatbotIcon from '@/component/ui/chatbot-icon/chatbot-icon'
// import AIAssistantBot from '@/component/ui/chatbot/AIAssistantBot'

// import VideoList from '@/component/ui/video/Getallvideos'
// import React from 'react'
 
//  const page = () => {
//    return (
//     <div className="flex h-screen">
   
//       <VideoList />

//       <ChatbotIcon externalUrl="https://chatpdf-one-ebon.vercel.app/" />
      
//       <AIAssistantBot/>
      
     
//   </div>
//    )
//  }
 
//  export default page
 


"use client";

import React from "react";
import VideoList from "@/component/ui/video/Getallvideos";
import ChatbotIcon from "@/component/ui/chatbot-icon/chatbot-icon";
import AIAssistantBot from "@/component/ui/chatbot/AIAssistantBot";

const Page = () => {
  return (
    <div className="flex h-screen relative">
      <VideoList />

      {/* Fixed container that stacks the icons vertically */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4 z-50">
        <ChatbotIcon externalUrl="https://chatpdf-one-ebon.vercel.app/" />
        <AIAssistantBot />
      </div>
    </div>
  );
};

export default Page;
