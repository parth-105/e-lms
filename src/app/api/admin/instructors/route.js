// // app/api/admin/instructors/route.js
// import { NextResponse } from "next/server";
// import { connect } from "@/lib/mongo";
// import Instructor from "@/model/instructor-model";
// import Cource from "@/model/cource-model";
// import purches from "@/model/purches-model";

// export async function GET(request) {
//   try {
//     await connect();
    
//     // Get all instructors with their courses
//     const instructors = await Instructor.find().select('-password');
    
//     // Prepare detailed instructor data
//     const instructorData = await Promise.all(instructors.map(async (instructor) => {
//       // Get courses by this instructor
//       const courses = await Cource.find({ instructor: instructor._id });
//       const courseIds = courses.map(course => course._id);
      
//       // Count students enrolled in their courses
//       const enrollments = await purches.find({ 
//         courseId: { $in: courseIds },
//         isPurchased: true
//       });
      
//       // Count unique students
//       const uniqueStudentIds = new Set();
//       enrollments.forEach(enrollment => {
//         uniqueStudentIds.add(enrollment.userId.toString());
//       });
      
//       // Calculate total revenue
//       let revenue = 0;
//       courses.forEach(course => {
//         const courseEnrollments = enrollments.filter(
//           e => e.courseId.toString() === course._id.toString()
//         );
//         revenue += course.price * courseEnrollments.length;
//       });
      
//       return {
//         id: instructor._id,
//         name: instructor.name,
//         email: instructor.email,
//         courses: courses.length,
//         students: uniqueStudentIds.size,
//         revenue: revenue,
//         isInstructor: instructor.isInstructor || false,
//         avatar: instructor.avtar || instructor.photoURL || '/default.png',
//         status: instructor.status || 'approved'
//       };
//     }));
    
//     return NextResponse.json({
//       success: true,
//       instructors: instructorData
//     });
//   } catch (error) {
//     console.error("Admin instructors error:", error);
//     return NextResponse.json({ 
//       success: false, 
//       message: error.message 
//     }, { status: 500 });
//   }
// }

// // Update instructor status or permissions
// export async function PUT(request) {
//   try {
//     await connect();
//     const { instructorId, updates } = await request.json();

//     if (!instructorId) {
//       return NextResponse.json({
//         success: false,
//         message: "Instructor ID is required"
//       }, { status: 400 });
//     }

//     // Only allow specific fields to be updated
//     const allowedUpdates = {
//       isInstructor: updates.isInstructor,
//       status: updates.status
//     };

//     // Filter out undefined values
//     Object.keys(allowedUpdates).forEach(key => 
//       allowedUpdates[key] === undefined && delete allowedUpdates[key]
//     );

//     const updatedInstructor = await Instructor.findByIdAndUpdate(
//       instructorId,
//       { $set: allowedUpdates },
//       { new: true }
//     ).select('-password');

//     if (!updatedInstructor) {
//       return NextResponse.json({
//         success: false,
//         message: "Instructor not found"
//       }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       instructor: updatedInstructor
//     });
//   } catch (error) {
//     console.error("Update instructor error:", error);
//     return NextResponse.json({ 
//       success: false, 
//       message: error.message 
//     }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Instructor from "@/model/instructor-model";
import Cource from "@/model/cource-model";
import purches from "@/model/purches-model";




export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    await connect();
    
    // Get all instructors
    const instructors = await Instructor.find();
    
    const instructorData = await Promise.all(instructors.map(async (instructor) => {
      // Count courses by this instructor
      const courses = await Cource.find({ instructor: instructor._id });
      const courseCount = courses.length;
      
      // Calculate total students and revenue
      let totalStudents = 0;
      let totalRevenue = 0;
      
      for (const course of courses) {
        // Count enrollments for this course
        const enrollments = await purches.countDocuments({
          courseId: course._id,
          isPurchased: true
        });
        
        totalStudents += enrollments;
        totalRevenue += course.price * enrollments;
      }
      
      return {
        id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        courses: courseCount,
        students: totalStudents,
        revenue: totalRevenue,
        isInstructor: instructor.isInstructor,
        avatar: instructor.avtar || instructor.photoURL || '/default.png'
      };
    }));
    
    return NextResponse.json({
      success: true,
      instructors: instructorData
    });
    
  } catch (error) {
    console.error("Admin instructors error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// Update instructor status
export async function PATCH(request) {
  try {
    await connect();
    
    const data = await request.json();
    const { instructorId, isInstructor } = data;
    
    if (!instructorId) {
      return NextResponse.json({ 
        success: false, 
        error: "Instructor ID is required" 
      }, { status: 400 });
    }
    
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      instructorId,
      { isInstructor: !!isInstructor }, // Convert to boolean
      { new: true }
    );
    
    if (!updatedInstructor) {
      return NextResponse.json({ 
        success: false, 
        error: "Instructor not found" 
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      instructor: {
        id: updatedInstructor._id,
        name: updatedInstructor.name,
        isInstructor: updatedInstructor.isInstructor
      }
    },
    {
      headers: {
        // This header instructs clients/CDNs to not cache this response.
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
    
  } catch (error) {
    console.error("Admin instructor update error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}