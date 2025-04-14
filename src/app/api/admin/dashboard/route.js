// // app/api/admin/dashboard/route.js
// import { NextResponse } from "next/server";
// import { connect } from "@/lib/mongo";
// import Cource from "@/model/cource-model";
// import User from "@/model/user-model";
// import Instructor from "@/model/instructor-model";
// import purches from "@/model/purches-model";

// export async function GET(request) {
//   try {
//     await connect();
    
//     // Get basic statistics
//     const totalCourses = await Cource.countDocuments();
//     const totalStudents = await User.countDocuments({ isInstructor: false });
//     const totalInstructors = await Instructor.countDocuments({ isInstructor: true });
    
//     // Get total sales and monthly data
//     const allPurchases = await purches.find({ isPurchased: true }).populate('courseId');
    
//     // Calculate total sales
//     let totalSales = 0;
//     allPurchases.forEach(purchase => {
//       if (purchase.courseId && purchase.courseId.price) {
//         totalSales += purchase.courseId.price;
//       }
//     });
    
//     // Get courses created in the last month
//     const lastMonthDate = new Date();
//     lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
//     const newCoursesThisMonth = await Cource.countDocuments({ 
//       createdAt: { $gte: lastMonthDate } 
//     });
    
//     // Calculate revenue growth (comparing current month with previous month)
//     const currentMonthStartDate = new Date();
//     currentMonthStartDate.setDate(1);
//     currentMonthStartDate.setHours(0, 0, 0, 0);
    
//     const previousMonthStartDate = new Date(currentMonthStartDate);
//     previousMonthStartDate.setMonth(previousMonthStartDate.getMonth() - 1);
    
//     const previousMonthEndDate = new Date(currentMonthStartDate);
//     previousMonthEndDate.setDate(0);
    
//     const currentMonthPurchases = await purches.find({
//       isPurchased: true,
//       createdAt: { $gte: currentMonthStartDate }
//     }).populate('courseId');
    
//     const previousMonthPurchases = await purches.find({
//       isPurchased: true,
//       createdAt: { $gte: previousMonthStartDate, $lt: currentMonthStartDate }
//     }).populate('courseId');
    
//     let currentMonthRevenue = 0;
//     let previousMonthRevenue = 0;
    
//     currentMonthPurchases.forEach(purchase => {
//       if (purchase.courseId && purchase.courseId.price) {
//         currentMonthRevenue += purchase.courseId.price;
//       }
//     });
    
//     previousMonthPurchases.forEach(purchase => {
//       if (purchase.courseId && purchase.courseId.price) {
//         previousMonthRevenue += purchase.courseId.price;
//       }
//     });
    
//     const revenueGrowth = previousMonthRevenue === 0 ? 
//       100 : 
//       ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1);
    
//     // Generate monthly revenue data
//     const monthlyRevenueData = [];
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     const currentYear = new Date().getFullYear();
    
//     for (let i = 0; i < 12; i++) {
//       const startOfMonth = new Date(currentYear, i, 1);
//       const endOfMonth = new Date(currentYear, i + 1, 0);
      
//       // For future months, add placeholder data
//       if (startOfMonth > new Date()) {
//         monthlyRevenueData.push({
//           month: months[i],
//           revenue: 0,
//           students: 0
//         });
//         continue;
//       }
      
//       const monthlyPurchases = await purches.find({
//         isPurchased: true,
//         createdAt: { $gte: startOfMonth, $lte: endOfMonth }
//       }).populate('courseId');
      
//       // Count unique students this month
//       const uniqueStudentIds = new Set();
//       let monthRevenue = 0;
      
//       monthlyPurchases.forEach(purchase => {
//         uniqueStudentIds.add(purchase.userId.toString());
//         if (purchase.courseId && purchase.courseId.price) {
//           monthRevenue += purchase.courseId.price;
//         }
//       });
      
//       monthlyRevenueData.push({
//         month: months[i],
//         revenue: monthRevenue,
//         students: uniqueStudentIds.size
//       });
//     }
    
//     // Get course categories
//     const courses = await Cource.find();
//     const categoryCount = {};
    
//     courses.forEach(course => {
//       const subject = course.subject || 'Other';
//       if (!categoryCount[subject]) {
//         categoryCount[subject] = 0;
//       }
//       categoryCount[subject]++;
//     });
    
//     const categoryData = Object.keys(categoryCount).map(key => ({
//       name: key,
//       value: categoryCount[key]
//     }));
    
//     // Get top 5 courses by enrollment
//     const coursesWithCount = await Cource.aggregate([
//       {
//         $lookup: {
//           from: 'purches',
//           localField: '_id',
//           foreignField: 'courseId',
//           as: 'enrollments'
//         }
//       },
//       {
//         $project: {
//           title: 1,
//           students: { $size: '$enrollments' }
//         }
//       },
//       { $sort: { students: -1 } },
//       { $limit: 5 }
//     ]);
    
//     const enrollmentData = coursesWithCount.map(course => ({
//       name: course.title,
//       students: course.students
//     }));
    
//     return NextResponse.json({
//       success: true,
//       data: {
//         stats: {
//           totalCourses,
//           totalSales,
//           totalStudents,
//           totalInstructors,
//           revenueGrowth,
//           newCoursesThisMonth
//         },
//         revenueData: monthlyRevenueData,
//         categoryData,
//         enrollmentData
//       }
//     });
//   } catch (error) {
//     console.error("Admin dashboard error:", error);
//     return NextResponse.json({ 
//       success: false, 
//       message: error.message 
//     }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import { connect } from "@/lib/mongo";
// import Cource from "@/model/cource-model";
// import User from "@/model/user-model";
// import Instructor from "@/model/instructor-model";
// import purches from "@/model/purches-model";

// export async function GET(request) {
//   try {
//     await connect();
    
//     // Get total courses
//     const totalCourses = await Cource.countDocuments();
    
//     // Get total students
//     const totalStudents = await User.countDocuments({ isInstructor: false });
    
//     // Get total instructors
//     const totalInstructors = await Instructor.countDocuments({ isInstructor: true });
    
//     // Get monthly data (sales and student count)
//     const currentYear = new Date().getFullYear();
//     const monthlyData = [];
    
//     for (let month = 0; month < 12; month++) {
//       const startDate = new Date(currentYear, month, 1);
//       const endDate = new Date(currentYear, month + 1, 0);
      
//       // Count purchases in this month
//       const purchases = await purches.find({
//         isPurchased: true,
//         createdAt: { $gte: startDate, $lte: endDate }
//       }).populate('courseId');
      
//       // Calculate revenue
//       const revenue = purchases.reduce((total, p) => {
//         return total + (p.courseId?.price || 0);
//       }, 0);
      
//       // Count new students in this month
//       const newStudents = await User.countDocuments({
//         isInstructor: false,
//         createdAt: { $gte: startDate, $lte: endDate }
//       });
      
//       // Format month name
//       const monthName = startDate.toLocaleString('default', { month: 'short' });
      
//       monthlyData.push({
//         month: monthName,
//         revenue,
//         students: newStudents
//       });
//     }
    
//     // Calculate total sales
//     const totalSales = monthlyData.reduce((total, data) => total + data.revenue, 0);
    
//     // Get revenue growth
//     const currentMonthIndex = new Date().getMonth();
//     const previousMonthIndex = currentMonthIndex > 0 ? currentMonthIndex - 1 : 11;
    
//     const currentMonthRevenue = monthlyData[currentMonthIndex]?.revenue || 0;
//     const previousMonthRevenue = monthlyData[previousMonthIndex]?.revenue || 1; // Avoid division by zero
    
//     const revenueGrowth = previousMonthRevenue > 0 
//       ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1)
//       : 0;
    
//     // Get new courses this month
//     const startOfMonth = new Date();
//     startOfMonth.setDate(1);
//     startOfMonth.setHours(0, 0, 0, 0);
    
//     const newCoursesThisMonth = await Cource.countDocuments({
//       createdAt: { $gte: startOfMonth }
//     });
    
//     return NextResponse.json({
//       success: true,
//       stats: {
//         totalCourses,
//         totalSales,
//         totalStudents,
//         totalInstructors,
//         revenueGrowth,
//         newCoursesThisMonth
//       },
//       revenueData: monthlyData
//     });
    
//   } catch (error) {
//     console.error("Admin dashboard error:", error);
//     return NextResponse.json({ 
//       success: false, 
//       error: error.message 
//     }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Cource from "@/model/cource-model";
import User from "@/model/user-model";
import Instructor from "@/model/instructor-model";
import purches from "@/model/purches-model";



export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    await connect();

    // Total stats
    const totalCourses = await Cource.countDocuments();
    const totalStudents = await User.countDocuments({ isInstructor: false });
    const totalInstructors = await Instructor.countDocuments({ isInstructor: true });

    const currentYear = new Date().getFullYear();
    const monthlyData = [];

    for (let month = 0; month < 12; month++) {
      const startDate = new Date(currentYear, month, 1);
      const endDate = new Date(currentYear, month + 1, 0);

      // Purchases
      const purchases = await purches.find({
        isPurchased: true,
        createdAt: { $gte: startDate, $lte: endDate }
      }).populate('courseId');

      const revenue = purchases.reduce((total, p) => {
        return total + (p.courseId?.price || 0);
      }, 0);

      // Student join count (fallback to _id timestamp)
      const students = await User.find({ isInstructor: false });
      let newStudents = 0;

      students.forEach(student => {
        const joinDate = student.createdAt || student._id.getTimestamp();
        if (joinDate >= startDate && joinDate <= endDate) {
          newStudents++;
        }
      });

      const monthName = startDate.toLocaleString('default', { month: 'short' });

      monthlyData.push({
        month: monthName,
        revenue,
        students: newStudents
      });
    }

    // Total sales
    const totalSales = monthlyData.reduce((total, data) => total + data.revenue, 0);

    // Revenue growth
    const currentMonthIndex = new Date().getMonth();
    const previousMonthIndex = currentMonthIndex > 0 ? currentMonthIndex - 1 : 11;

    const currentMonthRevenue = monthlyData[currentMonthIndex]?.revenue || 0;
    const previousMonthRevenue = monthlyData[previousMonthIndex]?.revenue || 1;

    const revenueGrowth = previousMonthRevenue > 0
      ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1)
      : 0;

    // New courses this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const newCoursesThisMonth = await Cource.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalCourses,
        totalSales,
        totalStudents,
        totalInstructors,
        revenueGrowth,
        newCoursesThisMonth
      },
      revenueData: monthlyData
    },
    {
      headers: {
        // This header instructs clients/CDNs to not cache this response.
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });

  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
