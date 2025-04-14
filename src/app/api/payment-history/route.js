// // app/api/payment-history/route.js
// import { connect } from "@/lib/mongo";
// import purches from '@/model/purches-model';
// import Cource from '@/model/cource-model';
// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// export async function GET(req) {
//   try {
//     // Connect to MongoDB
//     await connect();
    
//     // Get token from cookies
//     const cookieStore = cookies();
//     const token = cookieStore.get("e-learninigtoken")?.value;
    
//     if (!token) {
//       return NextResponse.json({ 
//         success: false,
//         message: "Unauthorized access" 
//       }, { status: 401 });
//     }
    
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     if (!decoded || !decoded.id) {
//       return NextResponse.json({ 
//         success: false,
//         message: "Invalid token" 
//       }, { status: 401 });
//     }
    
//     // Get user ID from token (using id as stored in your token)
//     const userId = decoded.id;
    
   
    
//     // Find all purchases by this user
//     const purchases = await purches.find({ 
//       userId: userId,
//       isPurchased: true 
//     }).populate({
//       path: 'courseId',
//       select: 'title price thambnail'
//     }).sort({ createdAt: -1 });
    
//     // Transform data to match frontend format
//     const paymentHistory = purchases.map(purchase => {
//       return {
//         id: purchase._id.toString(),
//         courseName: purchase.courseId.title,
//         courseImage: purchase.courseId.thambnail,
//         purchaseDate: purchase.createdAt.toISOString().split('T')[0],
//         amount: purchase.courseId.price,
//         status: "completed",
//         invoice: `#INV-${purchase._id.toString().slice(-5)}`
//       };
//     });
    
//     // Calculate total spent
//     const totalSpent = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
    
//     return NextResponse.json({
//       success: true,
//       data: paymentHistory,
//       totalSpent
//     }, { status: 200 });
    
//   } catch (error) {
//     console.error("Payment History API Error:", error);
//     return NextResponse.json({ 
//       success: false,
//       message: "Failed to fetch payment history" 
//     }, { status: 500 });
//   }
// }

import { connect } from "@/lib/mongo";
import purches from '@/model/purches-model';
import Cource from '@/model/cource-model';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// This API route will be rendered dynamically on the server side
export async function GET(req) {
  try {
    // Connect to MongoDB
    await connect();
    
    // Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("e-learninigtoken")?.value;
    
    if (!token) {
      return NextResponse.json({ 
        success: false,
        message: "Unauthorized access" 
      }, { status: 401 });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded || !decoded.id) {
      return NextResponse.json({ 
        success: false,
        message: "Invalid token" 
      }, { status: 401 });
    }
    
    // Get user ID from token (using id as stored in your token)
    const userId = decoded.id;
    
    // Find all purchases by this user
    const purchases = await purches.find({ 
      userId: userId,
      isPurchased: true 
    }).populate({
      path: 'courseId',
      select: 'title price thambnail'
    }).sort({ createdAt: -1 });
    
    // Transform data to match frontend format
    const paymentHistory = purchases.map(purchase => {
      return {
        id: purchase._id.toString(),
        courseName: purchase.courseId.title,
        courseImage: purchase.courseId.thambnail,
        purchaseDate: purchase.createdAt.toISOString().split('T')[0],
        amount: purchase.courseId.price,
        status: "completed",
        invoice: `#INV-${purchase._id.toString().slice(-5)}`
      };
    });
    
    // Calculate total spent
    const totalSpent = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
    
    return NextResponse.json({
      success: true,
      data: paymentHistory,
      totalSpent
    }, { status: 200 });
    
  } catch (error) {
    console.error("Payment History API Error:", error);
    return NextResponse.json({ 
      success: false,
      message: "Failed to fetch payment history" 
    }, { status: 500 });
  }
}
