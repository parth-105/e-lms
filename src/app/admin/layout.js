// @/components/Layout/index.js
"use client"
import MenuBarMobile from '@/component/ui/MenuBarMobile';
import Sidebar from '@/component/ui/Sidebar';
import React, { useState } from 'react'


export default function Layout({  children }) {
    // Concatenate page title (if exists) to site title


    // Mobile sidebar visibility state
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
          
            <div className="min-h-screen">
                <div className="flex">
                    <div className='gap-4'>
                    <MenuBarMobile setter={setShowSidebar} />
                    <Sidebar show={showSidebar} setter={setShowSidebar} />
                    </div>
                    <div className="flex flex-col flex-grow w-screen md:w-full overflow-y-auto  h-screen mt-14">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}