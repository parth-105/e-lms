"use client"
import { useState, useEffect } from 'react';
import CourseCard from '@/component/course/Course-card';
import DotSpinner from '@/component/ui/loader/DotSpinner';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(''); // New state for selected subject
  const [search,setSearch] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/course/courses');
        const data = await res.json();
        console.log('mcd', data)
        setCourses(data);
       setLoading(false)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };


  const handleCourseDelete = (deletedCourseId) => {
    setCourses(courses.filter(course => course._id !== deletedCourseId));
  };

  // Filter courses based on selected subject

  var filtervideo = courses.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  const filteredCourses = selectedSubject
    ? courses.filter((course) => course.subject === selectedSubject) : courses.filter((course) => course.title.trim().toLowerCase().includes(search.trim().toLowerCase()))
 

  return (
    <div className="container mx-auto p-4">
       <div >
        <div >
          <input
            type="text"
            placeholder="Search..."
            className="border  rounded-l px-4 py-2  text-black border-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  ">
        {loading ? <div className=' justify-center items-center flex w-full h-screen  ' > <DotSpinner /> </div> :filteredCourses.length > 0 ? (

          filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              title={course.title}
              thumbnail={course.thambnail}
              price={course.price}
              courseId={course._id}
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
