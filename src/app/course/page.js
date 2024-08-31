"use client"
import { useState, useEffect } from 'react';
import CourseCard from '@/component/course/Course-card';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(''); // New state for selected subject

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

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  // Filter courses based on selected subject



  const filteredCourses = selectedSubject
    ? courses.filter((course) => course.subject === selectedSubject)
    : courses;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Our Courses</h1>

      {/* Subject Filter Dropdown */}
      <div className="mb-8 text-center">
        <label htmlFor="subject" className="mr-2">Filter by Subject:</label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Subjects</option>
          <option value="DSA">DSA</option>
          <option value="OS">Oprating system</option>
          <option value="Language">Languages</option>
          <option value="Ai">AI/ML</option>
          <option value="Data">Data Science</option>
          {/* Add more subjects as needed */}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
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
