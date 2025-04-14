// // app/api/admin/students/route.js
// import { NextResponse } from "next/server";
// import { connect } from "@/lib/mongo";
// import User from "@/model/user-model";
// import purches from "@/model/purches-model";

// export async function GET(request) {
//   try {
//     await connect();
    
//     // Get all students (non-instructors)
//     const students = await User.find({ isInstructor: false }).select('-password');
    
//     // Get enrollment data for each student
//     const studentsWithStats = await Promise.all(students.map(async (student) => {
//       const enrollments = await purches.find({ 
//         userId: student._id,
//         isPurchased: true
//       }).populate('courseId');
      
//       // Calculate total spent
//       let totalSpent = 0;
//       enrollments.forEach(enrollment => {
//         if (enrollment.courseId && enrollment.courseId.price) {
//           totalSpent += enrollment.courseId.price;
//         }
//       });
      
//       // Get most recent enrollment
//       const mostRecentEnrollment = enrollments.length > 0 ? 
//         enrollments.sort((a, b) => b.createdAt - a.createdAt)[0].createdAt : 
//         null;
      
//       return {
//         id: student._id,
//         name: student.name,
//         email: student.email,
//         avatar: student.avtar || student.photoURL || '/default.png',
//         coursesEnrolled: enrollments.length,
//         totalSpent: totalSpent,
//         lastActive: mostRecentEnrollment || student.updatedAt
//       };
//     }));
    
//     return NextResponse.json({
//       success: true,
//       students: studentsWithStats
//     });
//   } catch (error) {
//     console.error("Admin students error:", error);
//     return NextResponse.json({ 
//       success: false, 
//       message: error.message 
//     }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import User from "@/model/user-model";
import purches from "@/model/purches-model";




export const runtime = "nodejs";
export const dynamic = "force-dynamic";


export async function GET(request) {
  try {
    await connect();
    
    // Get all students
    const students = await User.find({ isInstructor: false });
    
    // Get student purchase data
    const studentData = await Promise.all(students.map(async (student) => {
      // Count purchases by this student
      const purchases = await purches.countDocuments({
        userId: student._id,
        isPurchased: true
      });
      
      return {
        id: student._id,
        name: student.name,
        email: student.email,
        enrolledCourses: purchases,
        avatar: student.avtar || student.photoURL || '/default.png',
        joinDate: student._id.getTimestamp() 
      };
    }));
    
    return NextResponse.json({
      success: true,
      students: studentData
    },
    {
      headers: {
        // This header instructs clients/CDNs to not cache this response.
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
    
  } catch (error) {
    console.error("Admin students error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}