// "use client"
// import { Col, message, Row } from "antd";
// import React, { useEffect } from "react";

// import { useRouter } from 'next/navigation';
// import axios from "axios";
// import ExamCard from "@/component/ui/exam/ExamCard";

// function Home() {
//   const router = useRouter();
//   const [exams, setExams] = React.useState([]);

//   const getExams = async () => {
//     try {

//       const response = await axios.post("/api/exam/get-all-exam");

//       if (response.data.success) {
//         setExams(response.data.data);
//       } else {

//         message.error(response.message);
//       }

//     } catch (error) {

//       message.error(error.data.message);
//     }
//   };

//   useEffect(() => {
//     getExams();
//   }, []);

//   return (
//     (
//       <div className="flex h-screen" >

//         <div className='flex flex-wrap justify-center'>
//           {exams.map((exam, index) =>
//           (
//             <div key={index} className='m-4' >
//               <ExamCard exam={exam} />
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   );
// }

// export default Home;


"use client";
import { Col, message, Row, Select, Input } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import ExamCard from "@/component/ui/exam/ExamCard";
import DotSpinner from "@/component/ui/loader/DotSpinner";

const { Option } = Select;

function Home() {
  const router = useRouter();
  const [exams, setExams] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9); // Load 9 items initially
  const [loadingMore, setLoadingMore] = useState(false); // To track if more exams are being loaded
  const [search, setSearch] = useState(""); // For search functionality
  const [selectedCategory, setSelectedCategory] = useState(""); // For category filter
  const loadMoreRef = useRef(null); // To attach IntersectionObserver to

  const getExams = async () => {
    try {
      const response = await axios.post("/api/exam/get-all-exam");
      if (response.data.success) {
        setExams(response.data.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.data.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  // Filter exams based on search and category (applied to all exams)
  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? exam.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Paginate the filtered exams (showing visibleCount number of exams)
  const visibleExams = filteredExams.slice(0, visibleCount);

  // Scroll logic to load more exams when reaching the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loadingMore && visibleCount < filteredExams.length) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 9); // Load 9 more exams at a time
            setLoadingMore(false);
          }, 800); // Simulate delay for loading more
        }
      },
      { threshold: 0.1 } // Reduced threshold - trigger when just 10% is visible
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [visibleCount, filteredExams.length, loadingMore]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Search and filter bar */}
      <div className="flex flex-wrap justify-between items-center p-4">
        {/* Search Input */}
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <Input
            placeholder="Search exams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-input bg-background focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-1/4">
          <Select
            placeholder="Select category"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            className="w-full border-input bg-background"
          >
            {/* <Option value="">All Subjects</Option>
            <Option value="Javascript">Javascript</Option>
            <Option value="React">React</Option>
            <Option value="Node">Node</Option>
            <Option value="MongoDB">MongoDB</Option>
            <Option value="GK">GK</Option>
            <Option value="ML">Machine Learning</Option>
            <Option value="ebusiness">E-business</Option> */}
            <Select.Option value="">All Subjects</Select.Option>
            <Select.Option value="Javascript">Javascript</Select.Option>
            <Select.Option value="React">React</Select.Option>
            <Select.Option value="Node">Node</Select.Option>
            <Select.Option value="MongoDB">MongoDB</Select.Option>
            <Select.Option value="GK">GK</Select.Option>
            <Select.Option value="ML">Machine Learning</Select.Option>
            <Select.Option value="ebusiness">E-business</Select.Option>
          </Select>

        </div>
      </div>

      {/* Main content with flex-wrap for the cards */}
      <div className="flex-1 w-full">
        <div className="flex flex-wrap justify-center">
          {visibleExams.map((exam, index) => (
            <div key={index} className="m-4">
              <ExamCard exam={exam} />
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {loadingMore && (
          <div className="flex justify-center py-3">
            <DotSpinner />
          </div>
        )}

        {/* Intersection observer target - positioned at bottom */}
        {visibleCount < filteredExams.length && (
          <div
            ref={loadMoreRef}
            className="w-full h-20 flex items-center justify-center"
          ></div>
        )}
      </div>
    </div>
  );
}

export default Home;
