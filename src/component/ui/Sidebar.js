// @/components/Layout/Sidebar.js
"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useLocalStorage from '@/helpers/useLocalStorage.js';



export default function Sidebar({ show, setter }) {
    const router = useRouter();
    const [data, setData] = useLocalStorage('e-learning-user', '');
    const [userData, setUserData] = useState(null);
   // const [ld,setld] =useState({})

    useEffect(() => {
        // This code will only run on the client side
        const storedData = localStorage.getItem('e-learning-user');
       
      //  setld(storedData);
      if(storedData){
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

    const className = "bg-black w-[250px] h-full transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";

    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";


    const MenuItem = ({ icon, name, route }) => {
        // Highlight menu item based on currently displayed route
        const colorClass = router.pathname === route ? "text-white" : "text-white/50 hover:text-white";

        return (
            <Link
                href={route}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
                className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
            >
                <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                    {icon}
                </div>
                <div>{name}</div>
            </Link>
        )
    }

    // Overlay to prevent clicks in background, also serves as our close button
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30 `}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass}`}>





                <div className="flex flex-col">
                    {userData?.isInstructor ?
                        <MenuItem
                            name="Home"
                            route="/instructor"

                        /> : null
                    }


                    {!userData?.isInstructor ?
                        <MenuItem
                            name="Home"
                            route="/student"

                        /> : null
                    }


                    <MenuItem
                        name="All-Coureses"
                        route="/course"
                    />

                    {userData?.isInstructor ?
                        <MenuItem
                            name="My-Coureses"
                            route="/instructor/my-Coureses"

                        /> : null
                    }


                    {!userData?.isInstructor ?
                        <MenuItem
                            name="My-Coureses"
                            route="/student/my-courses"

                        /> : null
                    }

                    {userData?.isInstructor ?
                        <MenuItem
                            name="Add-quiz"
                            route="/instructor/exams/add"

                        /> : null
                    }

                    {userData?.isInstructor ?
                        <MenuItem
                            name="All-quiz"
                            route="/instructor/exams"

                        /> : null
                    }

                    {!userData?.isInstructor ?
                        <MenuItem
                            name="Quiz-Report"
                            route="/student/reports"

                        /> : null
                    }


                    {userData?.isInstructor ?
                        <MenuItem
                            name="All-Report"
                            route="/instructor/reports"

                        /> : null
                    }


                    {!userData?.isInstructor ?
                        <MenuItem
                            name="All-Exams"
                            route="/student/all-exam"

                        /> : null
                    }

                    {userData?.isInstructor ?
                        <MenuItem
                            name="Create-cource"
                            route="/instructor/addcourse"

                        /> : null
                    }


                    {userData?.isInstructor ?
                        <MenuItem
                            name="Create-video"
                            route="/instructor/Create-video"

                        /> : null
                    }



                    <MenuItem
                        name="Add-suggestion"
                        route="/suggestion/create-suggestion"

                    />

                    <MenuItem
                        name="All-suggestion"
                        route="/suggestion/all-suggestion"

                    />

                    <MenuItem
                        name="Live-session"
                        route="/live-session"

                    />

                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
}