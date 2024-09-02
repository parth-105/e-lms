'use client'
import { useEffect, useState } from 'react';

import axios from 'axios';
import CourseCard from '@/component/course/Course-card';
import useLocalStorage from '@/helpers/useLocalStorage.js';





const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [data, setData] = useLocalStorage('e-learning-user', '');

  const handleCourseDelete = (deletedCourseId) => {
    setCourses(courses.filter(course => course._id !== deletedCourseId));
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.post('/api/course/get-course-by-id',{id:data._id});
        console.log('cd',res.data.courses);
        
       // const cdata = await res.json();
        setCourses(res.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">my Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard

              key={course._id}
              title={course.title}
              thumbnail={course.thambnail}
              price={course.price}
              courseId={course._id}
              instructor={course.instructor._id}
              insdetail={course.instructor}
              onDelete={handleCourseDelete}
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
