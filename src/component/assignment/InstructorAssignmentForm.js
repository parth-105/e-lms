"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import useLocalStorage from '@/helpers/useLocalStorage.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import axios from "axios"
import { uploadpdfFileAndGetUrl } from "@/helpers/FirebasepdfUpload"

export default function InstructorAssignmentForm() {
  const [data, setData] = useLocalStorage('e-learning-user', '');
  const [courses, setCourses] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setloading] = useState(false)
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    questionFile: ""
  })

  const handleChange = (event) => {
    console.log('aaaaaaaaaaaaa',event)
    setSelectedValue(event);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.post('/api/course/get-course-by-id', { id: data._id });
        console.log('cd', res.data.courses);

        // const cdata = await res.json();
        setCourses(res.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (assignment.questionFile) {
      setloading(true);
      const questionurl = await uploadpdfFileAndGetUrl(assignment.questionFile);
  
      console.log('answerUrl', assignment);
      console.log('answer', questionurl);
  
      const res = await axios.post('/api/assignment/uploadassignment', { title:assignment.title, description:assignment.description,questionfile:questionurl,couses:selectedValue,instructor:data._id});
  
      console.log("Assignment submitted:", res);
  
      if(res.data.success)
      {
     // setAnswerFile(null);
      setloading(false);
     // router.push("/student/assignments/AssignmentList")
      }
    } else {
      alert("Please upload an answer file before submitting.");
      setAnswerFile(null);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Assignment</CardTitle>
        <CardDescription>Upload a new assignment for your students.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Course">Assignment Subject/course</Label>
              <Select onValueChange={handleChange} >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Courese title" />
                  </SelectTrigger>
                <SelectContent>
                  
                  {courses.map((option) => (
                    <SelectItem key={option.value} value={option._id}>
                      {option.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              
              </Select>
              <p>Selected Value: {selectedValue}</p>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Assignment Title</Label>
              <Input
                id="title"
                placeholder="Enter assignment title"
                value={assignment.title}
                onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter assignment description"
                value={assignment.description}
                onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="questionFile">Upload Question PDF</Label>
              <Input
                id="questionFile"
                type="file"
                accept=".pdf"
                onChange={(e) => setAssignment({ ...assignment, questionFile: e.target.files?.[0] || null })}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit}>{ loading ? "loding" : "Create Assignment"}</Button>
      </CardFooter>
    </Card>
  )
}