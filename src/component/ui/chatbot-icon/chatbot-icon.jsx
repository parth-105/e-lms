// "use client";

// import React, { useState } from "react";
// import { MessageCircle, X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// function ChatbotIcon({ externalUrl }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       {/* Floating Chat Icon */}
//       <Button
//         onClick={toggleChat}
//         className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 p-0 z-50"
//         aria-label="Open AI Chatbot"
//       >
//         <MessageCircle className="h-6 w-6" />
//       </Button>

//       {/* Modal with External Website */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4 md:p-8">
//           <div className="bg-background rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col relative">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h2 className="font-semibold">AI Chatbot</h2>
//               <Button variant="ghost"  onClick={toggleChat} aria-label="Close chatbot">
//                 <X className="h-5 w-5" />
//               </Button>
//             </div>

//             <div className="flex-1 overflow-hidden">
//               <iframe
//                 src={externalUrl}
//                 className="w-full h-full border-0"
//                 title="AI Chatbot"
//                 allow="microphone; camera; geolocation"
//                 sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ChatbotIcon;


"use client";

import React, { useState } from "react";
import { FileText, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function ChatbotIcon({ externalUrl }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Icon Button without fixed positioning */}
      {/* <div
        onClick={toggleChat}
        className="h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90 p-0 z-50 justify-center items-center "
        aria-label="Open AI Chatbot"
      >
        
       
        <FileText  color="#002aff" />
      </div> */}


      <div className="h-16 w-16 cursor-pointer ">
        <div className="shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-full flex justify-center items-center h-full w-full">
          <div onClick={toggleChat}>
          <FileText  color="#ffffff" />
            <span className="sr-only">Chat with pdf</span>
          </div>
        </div>
      </div>



      {/* Modal remains fixed */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4 md:p-8">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col relative">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Kyma - the smooth flow of information</h2>
              <Button variant="ghost" onClick={toggleChat} aria-label="Close chatbot">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={externalUrl}
                className="w-full h-full border-0"
                title="AI Chatbot"
                allow="microphone; camera; geolocation"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatbotIcon;
