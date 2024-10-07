"use client"
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, FileTextIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useLocalStorage from '@/helpers/useLocalStorage.js'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Coursewiseassignmentlist from './Coursewiseassignmentlist'
import { ScrollArea } from '@/components/ui/scroll-area'





const assignments = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    description: 'Create a simple React application demonstrating the use of useState and useEffect hooks.',
    dueDate: '2023-06-15',
    status: 'pending',
  },
  {
    id: '2',
    title: 'State Management with Redux',
    description: 'Implement a todo list application using Redux for state management.',
    dueDate: '2023-06-22',
    status: 'submitted',
  },
  {
    id: '3',
    title: 'RESTful API Integration',
    description: 'Build a weather application that fetches data from a RESTful API and displays it.',
    dueDate: '2023-06-29',
    status: 'graded',
  },
  {
    id: '4',
    title: 'React Router Navigation',
    description: 'Create a multi-page React application using React Router for navigation.',
    dueDate: '2023-07-06',
    status: 'pending',
  },
  {
    id: '5',
    title: 'Form Handling with Formik',
    description: 'Implement a complex form with validation using Formik and Yup.',
    dueDate: '2023-07-13',
    status: 'pending',
  },
  {
    id: '6',
    title: 'GraphQL API Integration',
    description: 'Build a book library application that uses a GraphQL API for data fetching.',
    dueDate: '2023-07-20',
    status: 'pending',
  },
  {
    id: '7',
    title: 'React Testing with Jest',
    description: 'Write unit and integration tests for a React application using Jest and React Testing Library.',
    dueDate: '2023-07-27',
    status: 'pending',
  },
  {
    id: '8',
    title: 'React Performance Optimization',
    description: 'Optimize a React application for better performance using memoization and lazy loading.',
    dueDate: '2023-08-03',
    status: 'pending',
  },
  {
    id: '9',
    title: 'Server-Side Rendering with Next.js',
    description: 'Create a server-side rendered React application using Next.js.',
    dueDate: '2023-08-10',
    status: 'pending',
  },
  {
    id: '10',
    title: 'React Native Mobile App',
    description: 'Develop a simple mobile application using React Native.',
    dueDate: '2023-08-17',
    status: 'pending',
  },
]

export default function AssignmentList() {


  const [purchasecourseassignment, setpurchasecourseassignment] = useState([]);
  const [data, setData] = useLocalStorage('e-learning-user', '');
  const [loading, setloading] = useState(false)


  useEffect(() => {
    const fetchCourses = async () => {
      setloading(true)
      try {
        const res = await axios.post('/api/assignment/listofassignment', { userId: data._id });
        //  const data = await res.json();
        console.log('mcd', res.data)
        setpurchasecourseassignment(res.data.purchases);
        setloading(false)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Assignments</h1>
      <div className="  grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {purchasecourseassignment.map((assignment) => (
          <Card key={assignment?._id} className="flex flex-col">
            <Drawer>
              <CardHeader>
                <CardTitle>{assignment?.courseId?.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                {/* <Link href={`/assignments/${assignment._id}`} passHref> */}
                <Button variant="outline">
                  <DrawerTrigger> <FileTextIcon className="mr-2 h-4 w-4" /></DrawerTrigger>
                </Button>
                {/* </Link> */}
                <DrawerContent>
                  <DrawerHeader className="h-96 overflow-y-auto" >
                   {/* <ScrollArea className="h-[90%] w-full rounded-md border p-4"> */}
                      <Coursewiseassignmentlist Course={assignment?.courseId} />
                      {/* component */}
                    {/* </ScrollArea> */}
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </CardFooter>
            </Drawer>
          </Card>
        ))}






      </div>
    </div>


  )
}