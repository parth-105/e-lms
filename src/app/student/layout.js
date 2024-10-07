// @/components/Layout/index.js
"use client"

import React, { useEffect, useState } from 'react'



import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, FileVideo2 } from 'lucide-react'
import { BookOpen, Home, LayoutDashboard, User, FileQuestion, BarChart, Video, ClipboardList, Send, PlusCircle, FolderPlus, MessageSquarePlus, VideoPlus, ListTodo } from 'lucide-react'
import Link from 'next/link'
import useLocalStorage from '@/helpers/useLocalStorage.js';
import LMSsidebar from '@/component/ui/sidebar/LMSsidebar'



export default function Layout({ children }) {
  
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)


    const [data, setData] = useLocalStorage('e-learning-user', '');
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        // This code will only run on the client side
        const storedData = localStorage.getItem('e-learning-user');

        //  setld(storedData);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData);
            // console.log('ld',userData)
        }

    }, []);

    useEffect(() => {
        // This will run whenever userData changes
        if (userData) {
            console.log('ld', userData);
        }
    }, [userData]);

    return (
        <>
            <LMSsidebar children={children} />
        </>
    )
}