"use client"
import useLocalStorage from '@/helpers/useLocalStorage.js';
import Link from 'next/link';
import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
const SidebarWithLogo = () => {
    const [data, setData] = useLocalStorage('e-learning-user', '');



    return (
        <div>
            <Sidebar>
                <Menu>
                    <MenuItem> <Link href='/course'> All-Coureses</Link></MenuItem>
                    <MenuItem> <Link href='/instructor/my-Coureses'> My-Coureses</Link></MenuItem>
                    <SubMenu label="Quiz">
                        {data.isInstructor ?
                            <MenuItem><Link href='/instructor/exams/add'> Add-Quiz</Link> </MenuItem>
                            : null
                        }
                        {data.isInstructor ?
                            <MenuItem> <Link href='/instructor/exams'> All-Quiz</Link></MenuItem>
                            : null
                        }
                        {!data.isInstructor ?
                            <MenuItem> <Link href='/student/reports'> Quiz-Report</Link></MenuItem>
                            : null
                        }

                        {data.isInstructor ?
                            <MenuItem> <Link href='/instructor/reports'> All-Report</Link></MenuItem>
                            : null
                        }

                        {!data.isInstructor ?
                            <MenuItem> <Link href='/student/all-exam'> All-Exam</Link></MenuItem>
                            : null
                        }

                    </SubMenu>
                    {data.isInstructor ?
                        <MenuItem> <Link href='/instructor/addcourse'> Create-courses</Link></MenuItem>
                        : null
                    }
                    {data.isInstructor ?
                        <MenuItem> <Link href='/instructor/Create-video'> Create-video</Link></MenuItem>
                        : null
                    }
                      <SubMenu label="Suggestion">
                
                            <MenuItem><Link href='/suggestion/create-suggestion'>Add-suggestion</Link> </MenuItem>               

                    </SubMenu>
                    <MenuItem><Link href='/live-session'>Live-Session</Link> </MenuItem>               
                </Menu>
            </Sidebar>
        </div>
    )
}

export default SidebarWithLogo
