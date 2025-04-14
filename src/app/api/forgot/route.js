

// import { connect } from "@/lib/mongo";
// import User from '@/model/user-model';
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";

// export async function POST(req) {
 
  
//     try {
//         const { email } = await req.json();
       
//         if (!email) {
//             return Response.json({ message: "Email is required." }, { status: 400 });
//         }

//         await connect();

//         const user = await User.findOne({ email })
//         console.log("email uis", user);
//         if (!user) {
        
//           // return NextResponse.json({ error: "User does not exist" })
//           return Response.json({ message: "No account with that email found." }, { status: 404 });
//         }
        
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "15m",
//         });

//         const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         await transporter.sendMail({
//             from: `"E-Learning App" <${process.env.EMAIL_USER}>`,
//             to: email,
//             subject: "Reset Your Password",
//             html: `
//               <h2>Password Reset</h2>
//               <p>You requested to reset your password. Click the link below:</p>
//               <a href="${resetLink}">${resetLink}</a>
//               <p>This link is valid for 15 minutes.</p>
//             `,
//           });
          

//         return Response.json({ message: "Reset link sent." }, { status: 200 });

//     } catch (err) {
//         console.error("Forgot Password API Error:", err);
//         return Response.json({ message: "Something went wrong." }, { status: 500 });
//     }
// }


import { connect } from "@/lib/mongo";
import User from '@/model/user-model';
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Validate email input
    if (!email) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }

    // Connect to MongoDB
    await connect();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "No account with that email found." }, { status: 404 });
    }

    // Create a reset token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Generate reset password link
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    // Configure the nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the reset password email
    await transporter.sendMail({
      from: `"E-Learning App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>You requested to reset your password. Click the link below:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link is valid for 15 minutes.</p>
      `,
    });

    return NextResponse.json({ message: "Reset link sent." }, { status: 200 });

  } catch (err) {
    console.error("Forgot Password API Error:", err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
