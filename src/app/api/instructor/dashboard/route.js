// app/api/instructor/dashboard/route.js
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import mongoose from "mongoose";

import Cource from "@/model/cource-model";
import purches from "@/model/purches-model";
import Instructor from "@/model/instructor-model";

export async function POST(request) {
  try {
    await connect();
    const reqBody = await request.json();
    const instructorId = reqBody.instructorId;
    const timePeriod = reqBody.timePeriod || "30days"; // Default to 30 days if not specified

    if (!instructorId) {
      return NextResponse.json({ error: "Instructor ID is required" }, { status: 400 });
    }

    // Find instructor
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return NextResponse.json({ error: "Instructor not found" }, { status: 404 });
    }

    // Find all courses by this instructor
    const courses = await Cource.find({ instructor: instructorId });
    const courseIds = courses.map(course => course._id);

    // Calculate time period dates
    const currentDate = new Date();
    let startDate = new Date();
    
    if (timePeriod === "7days") {
      startDate.setDate(currentDate.getDate() - 7);
    } else if (timePeriod === "30days") {
      startDate.setDate(currentDate.getDate() - 30);
    } else if (timePeriod === "90days") {
      startDate.setDate(currentDate.getDate() - 90);
    } else if (timePeriod === "year") {
      startDate.setFullYear(currentDate.getFullYear() - 1);
    } else if (timePeriod === "all") {
      startDate = new Date(0); // Beginning of time
    }

    // Find purchases for these courses within the time period
    const purchases = await purches.find({
      courseId: { $in: courseIds },
      isPurchased: true,
      createdAt: { $gte: startDate, $lte: currentDate }
    }).populate({
      path: 'courseId',
      select: 'title price'
    }).populate({
      path: 'userId',
      select: 'name email'
    });

    // Organize purchases by date for revenue chart
    const revenueData = generateRevenueData(purchases, timePeriod);
    
    // Calculate total revenue
    const totalRevenue = purchases.reduce((total, purchase) => {
      return total + (purchase.courseId ? purchase.courseId.price : 0);
    }, 0);

    // Get course performance data
    const coursePerformanceData = await getCoursePerformance(courseIds);

    // Get recent sales data
    const recentSalesData = formatRecentSales(purchases);

    // Student metrics
    const totalStudents = await getUniqueStudentCount(courseIds);
    const newEnrollments = await getNewEnrollments(courseIds, startDate);
    
    // Course completion metrics (average)
    const avgCompletion = await calculateAverageCompletion(courseIds);

    // Prepare response
    const dashboardData = {
      metrics: {
        totalRevenue,
        totalCourses: courses.length,
        totalStudents,
        avgCompletion,
        newEnrollments,
        newCourses: await getNewCourses(instructorId, startDate)
      },
      revenueData,
      coursePerformanceData,
      recentSalesData
    };

    return NextResponse.json({
      message: "Dashboard data fetched successfully",
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Helper function to generate revenue data based on time period
function generateRevenueData(purchases, timePeriod) {
  // Group purchases by day/month based on time period
  const revenueByPeriod = {};
  
  if (timePeriod === "7days") {
    // Daily data for the last 7 days
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = daysOfWeek[date.getDay()];
      revenueByPeriod[dayName] = 0;
    }
    
    // Aggregate revenue by day
    purchases.forEach(purchase => {
      const purchaseDate = new Date(purchase.createdAt);
      const dayName = daysOfWeek[purchaseDate.getDay()];
      revenueByPeriod[dayName] += purchase.courseId ? purchase.courseId.price : 0;
    });
  } else {
    // Monthly data
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let numMonths = 6; // Default (30days)
    if (timePeriod === "90days") numMonths = 9;
    else if (timePeriod === "year") numMonths = 12;
    
    // Initialize months
    for (let i = numMonths - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = monthNames[date.getMonth()];
      revenueByPeriod[monthName] = 0;
    }
    
    // Aggregate revenue by month
    purchases.forEach(purchase => {
      const purchaseDate = new Date(purchase.createdAt);
      const monthName = monthNames[purchaseDate.getMonth()];
      
      // Only count if it's in our initialized months
      if (revenueByPeriod[monthName] !== undefined) {
        revenueByPeriod[monthName] += purchase.courseId ? purchase.courseId.price : 0;
      }
    });
  }
  
  // Convert to array format for charts
  return Object.entries(revenueByPeriod).map(([month, revenue]) => ({
    month,
    revenue
  }));
}

// Get course performance data
async function getCoursePerformance(courseIds) {
  try {
    const performances = await Promise.all(courseIds.map(async (courseId) => {
      const course = await Cource.findById(courseId);
      
      if (!course) return null;
      
      // Get purchases for this course
      const coursePurchases = await purches.find({
        courseId: courseId,
        isPurchased: true
      });
      
      // Calculate students and revenue
      const students = coursePurchases.length;
      const revenue = students * course.price;
      
      // For completion rate, we would need student progress data
      // This is just a placeholder - in a real app you'd get actual completion data
      const completion = Math.floor(Math.random() * 30) + 50; // Random 50-80% for example
      
      return {
        name: course.title,
        students,
        revenue,
        completion
      };
    }));
    
    return performances.filter(Boolean);
  } catch (error) {
    console.error("Error getting course performance:", error);
    return [];
  }
}

// Format recent sales data
function formatRecentSales(purchases) {
  return purchases
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .map((purchase, index) => ({
      id: `ORD-${7352 + index}`, // Generate order IDs (in a real app, you'd use actual order IDs)
      course: purchase.courseId ? purchase.courseId.title : "Unknown Course",
      date: purchase.createdAt.toISOString().split('T')[0],
      amount: purchase.courseId ? purchase.courseId.price : 0,
      student: purchase.userId ? purchase.userId.name : "Unknown Student"
    }));
}

// Calculate unique student count
async function getUniqueStudentCount(courseIds) {
  try {
    const uniqueStudents = await purches.distinct('userId', {
      courseId: { $in: courseIds },
      isPurchased: true
    });
    
    return uniqueStudents.length;
  } catch (error) {
    console.error("Error getting student count:", error);
    return 0;
  }
}

// Calculate new enrollments in period
async function getNewEnrollments(courseIds, startDate) {
  try {
    const newPurchases = await purches.find({
      courseId: { $in: courseIds },
      isPurchased: true,
      createdAt: { $gte: startDate }
    });
    
    return newPurchases.length;
  } catch (error) {
    console.error("Error getting new enrollments:", error);
    return 0;
  }
}

// Calculate new courses in period
async function getNewCourses(instructorId, startDate) {
  try {
    const newCourses = await Cource.countDocuments({
      instructor: instructorId,
      createdAt: { $gte: startDate }
    });
    
    return newCourses;
  } catch (error) {
    console.error("Error getting new courses:", error);
    return 0;
  }
}

// Calculate average completion rate
async function calculateAverageCompletion(courseIds) {
  // Note: This is a placeholder. In a real application, you would track student progress
  // through the course and calculate actual completion rates.
  return 73.5; // Placeholder value matching the frontend
}