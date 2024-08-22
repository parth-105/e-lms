'use client'
import { useEffect, useState } from 'react';
import CourseCard from '../../component/course/Course-card';





const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/course/courses');
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Our Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard

              key={course._id}
              title={course.title}
              thumbnail={course.thambnail}
              price={course.price}
              courseId={course._id}
              
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
