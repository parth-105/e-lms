'use client'
import { useEffect, useState } from 'react';
import CourseCard from '../../component/course/Course-card';





const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/course/courses');
        const data = await res.json();
        console.log('mcd', data)
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  var filtercourse = courses.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase()))


  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search..."
        className="border  rounded-l px-4 py-2 w-1/2 text-black border-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h1 className="text-2xl font-bold text-center mb-8">Our Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtercourse.length > 0 ? (
          filtercourse.map((course) => (
            <CourseCard

              key={course._id}
              title={course.title}
              thumbnail={course.thambnail}
              price={course.price}
              courseId={course._id}
              instructor={course.instructor}
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
