// // app/api/admin/courses/route.js
// import { NextResponse } from "next/server";
// import { connect } from "@/lib/mongo";
// import Cource from "@/model/cource-model";
// import purches from "@/model/purches-model";

// export async function GET(request) {
//   try {
//     await connect();

//     // Get all courses with instructor details
//     const courses = await Cource.find().populate('instructor', 'name email avtar photoURL');

//     // Get enrollment and revenue data for each course
//     const coursesWithStats = await Promise.all(courses.map(async (course) => {
//       const enrollments = await purches.countDocuments({ 
//         courseId: course._id,
//         isPurchased: true
//       });

//       return {
//         id: course._id,
//         title: course.title,
//         subject: course.subject || 'Uncategorized',
//         price: course.price,
//         thumbnail: course.thambnail || '/default.png',
//         videosCount: course.videos?.length || 0,
//         assignmentsCount: course.assignment?.length || 0,
//         instructor: {
//           id: course.instructor?._id,
//           name: course.instructor?.name || 'Unknown',
//           email: course.instructor?.email,
//           avatar: course.instructor?.avtar || course.instructor?.photoURL || '/default.png'
//         },
//         enrollments: enrollments,
//         revenue: course.price * enrollments,
//         createdAt: course.createdAt
//       };
//     }));

//     return NextResponse.json({
//       success: true,
//       courses: coursesWithStats
//     });
//   } catch (error) {
//     console.error("Admin courses error:", error);
//     return NextResponse.json({ 
//       success: false, 
//       message: error.message 
//     }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Cource from "@/model/cource-model";
import purches from "@/model/purches-model";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";


export async function GET(request) {
  try {

   
    
    await connect();

    // Get all courses with enrollment counts
    const courses = await Cource.find().populate('instructor');

    const courseData = await Promise.all(courses.map(async (course) => {
      // Count enrollments for this course
      const enrollments = await purches.countDocuments({
        courseId: course._id,
        isPurchased: true
      });

      // Calculate revenue for this course
      const revenue = course.price * enrollments;

      return {
        id: course._id,
        name: course.title,
        subject: course.subject,
        instructor: course.instructor?.name || 'Unknown',
        price: course.price,
        students: enrollments,
        revenue: revenue
      };
    }));

    // Get course categories
    const subjects = {};
    courses.forEach(course => {
      if (course.subject) {
        subjects[course.subject] = (subjects[course.subject] || 0) + 1;
      }
    });

    const categoryData = Object.entries(subjects).map(([name, value], index) => {
      // Create an array of fill colors
      const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#ffc658'];
      return {
        name,
        value,
        fill: colors[index % colors.length]
      };
    });

    // Sort courses by enrollment for top courses
    const topCourses = [...courseData].sort((a, b) => b.students - a.students).slice(0, 5);

    return NextResponse.json({
      success: true,
      courses: courseData,
      categoryData,
      topCourses
    },
      {
        headers: {
          // This header instructs clients/CDNs to not cache this response.
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });

  } catch (error) {
    console.error("Admin courses error:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
