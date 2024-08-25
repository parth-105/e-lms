'use client'
import { useEffect, useState } from 'react';

import axios from 'axios';
import CourseCard from '@/component/course/Course-card';
import useLocalStorage from '@/helpers/useLocalStorage.js';





const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [coursedata,setCoursedata] = useState()
  const [data, setData] = useLocalStorage('e-learning-user', '');
  const [isClient, setIsClient] = useState(false);




  useEffect(() => {
    setIsClient(true);
    const fetchCourses = async () => {
      try {
        const res = await axios.post('/api/course/studentcourse',{id:data._id});
        console.log('cd',res.data.courses);
        
       // const cdata = await res.json();
        setCourses(res.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  
  if (!isClient) {
    return null;
}


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">my Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard

              key={course._id}
              title={course.courseId.title}
              thumbnail={course.courseId.thambnail}
              price={course.courseId.price}
              courseId={course.courseId._id}
              instructor={course.instructor}
              userId={course.userId}
            />
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
