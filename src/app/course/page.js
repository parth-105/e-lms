// "use client"
// import { useState, useEffect } from 'react';

// import CourseSkeleton from '@/component/ui/CourseSkeleton/CourseSkeleton';
// import CourseComponent from '@/component/ui/course-card/CourseComponent';

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState(''); // New state for selected subject
//   const [search,setSearch] = useState('')
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true)
//     const fetchCourses = async () => {
//       try {
//         const res = await fetch('/api/course/courses');
//         const data = await res.json();
       
//         setCourses(data);
//        setLoading(false)
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleSubjectChange = (e) => {
//     setSelectedSubject(e.target.value);
//   };


//   const handleCourseDelete = (deletedCourseId) => {
//     setCourses(courses.filter(course => course._id !== deletedCourseId));
//   };

//   // Filter courses based on selected subject

//   var filtervideo = courses.filter((item) =>
//     item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
//   );

//   const filteredCourses = selectedSubject
//     ? courses.filter((course) => course.subject === selectedSubject) : courses.filter((course) => course.title.trim().toLowerCase().includes(search.trim().toLowerCase()))
 

//   return (
//     <div className="container mx-auto p-4">
//        <div >
//         <div >
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border  rounded-l px-4 py-2  text-black border-black"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>


//         <div className="mb-8 text-center">
//           <label htmlFor="subject" className="mr-2">Filter by Subject:</label>
//           <select
//             id="subject"
//             value={selectedSubject}
//             onChange={handleSubjectChange}
//             className="border border-gray-300 p-2 rounded"
//           >
//             <option value="">All Subjects</option>
           
//                       <option value="Javascript">Javascript</option>
//                       <option value="React">React</option>
//                       <option value="Node">Node</option>
//                       <option value="MongoDB">MongoDB</option>
//                       <option value="GK">GK</option>
//                       <option value="ML">Machine Learning</option>
//                       <option value="ebusiness">E-business</option>
//             {/* Add more subjects as needed */}
//           </select>
//         </div>
//       </div>

//       {loading ? <div className='w-full h-full cursor-pointer' > <CourseSkeleton/> </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  ">
    
//     {  filteredCourses.length > 0 ? (
//           filteredCourses.map((course) => (
//             <CourseComponent
//               key={course._id}
//               title={course.title}
//               thumbnail={course.thambnail}
//               price={course.price}
//               courseId={course._id}
//             //  instructor={course.instructor._id}
//               insdetail={course.instructor}
//               course={course}
//               onDelete={handleCourseDelete}   
//             />
//           ))
//         ) : (
//           <p>No courses available.</p>
//         )}
//       </div>}
//     </div>
//   );
// };

// export default Courses;



"use client"
import { useState, useEffect } from 'react';

import CourseSkeleton from '@/component/ui/CourseSkeleton/CourseSkeleton';
import CourseComponent from '@/component/ui/course-card/CourseComponent';

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(''); // New state for selected subject
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/course/courses');
        const data = await res.json();

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
        <Card className="p-4 shadow-md bg-background border-none">
          <div className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                {/* <Search size={18} /> */}
              </div>
              <Input
                type="text"
                placeholder="      Search..."
                className="pl-10 border-input bg-background hover:bg-accent/10 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center text-muted-foreground">
                <Filter size={18} />
              </div>
              <div className="relative">
                <select
                  id="subject"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  className="w-[180px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none hover:bg-accent/10 transition-colors"
                >
                  <option value="">All Subjects</option>
                  <option value="Javascript">Javascript</option>
                  <option value="React">React</option>
                  <option value="Node">Node</option>
                  <option value="MongoDB">MongoDB</option>
                  <option value="GK">GK</option>
                  <option value="ML">Machine Learning</option>
                  <option value="ebusiness">E-business</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <br />
      <br />

      {loading ? <div className='w-full h-full cursor-pointer' > <CourseSkeleton /> </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  ">

        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseComponent
              key={course._id}
              title={course.title}
              thumbnail={course.thambnail}
              price={course.price}
              courseId={course._id}
              //  instructor={course.instructor._id}
              insdetail={course.instructor}
              course={course}
              onDelete={handleCourseDelete}
            />
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>}
    </div>
  );
};

export default Courses;