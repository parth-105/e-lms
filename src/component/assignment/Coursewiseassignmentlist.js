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
import { ScrollArea } from "@/components/ui/scroll-area"


const Coursewiseassignmentlist = ({Course}) => {
  return (
    <div className="container mx-auto p-4 cursor-pointer">
    <h1 className="text-2xl font-bold mb-6">{`${Course.title} Assignment`}</h1>
    <div className="grid  gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Course?.assignment.map((assignment) => (
       
        <Card key={assignment._id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{assignment?.title}</CardTitle>
            <CardDescription>{assignment?.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
           
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Badge
              variant={
                assignment.status === 'submitted' ? 'secondary' :
                assignment.status === 'pending' ? 'success' : 'default'
              }
            >
              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
            </Badge>
            <Link href={`/student/assignments/submit-assignment/${assignment._id}`} passHref>
              <Button variant="outline">
                <FileTextIcon className="mr-2 h-4 w-4" />
                {assignment.status === 'pending' ? 'View & Submit' : 'View Details'}
              </Button>
            </Link>
          </CardFooter>
        </Card>
       
      ))}
    </div>
  </div>
  )
}

export default Coursewiseassignmentlist
