
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/lib/mongo";
import Instructor from "@/model/instructor-model";
import User from '@/model/user-model';


connect()

export async function POST(request) {

  try {

    const reqBody = await request.json()
    const { email, password, isInstructor } = reqBody;


    if (isInstructor) {
      const instructor = await Instructor.findOne({ email })
      if (!instructor) {
        return NextResponse.json({ error: "instructor does not exist" }, { status: 400 })
      }
      console.log("instructor exists");

      const tokenData = {
        id: instructor._id,
        username: instructor.name,
        email: instructor.email,
        isAdmin: instructor.isAdmin,
        isInstructor: instructor.isInstructor,
      }

      if (instructor.status === 'approved') {
        const isMatch = await bcryptjs.compare(password, instructor.password);
        if (isMatch) {
          // const token = jwt.sign({ id: instructor._id }, process.env.JWT_SECRET);
          // return new Response(JSON.stringify({ token }), { status: 200 });
          const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" })

          const response = NextResponse.json({
            message: " instructor Login successful",
            success: true,
            Login: instructor,
          })
          response.cookies.set("e-learninigtoken", token, {
            httpOnly: true,

          })
          return response;
        } else {
          return new Response('Invalid credentials.', { status: 400 });
        }
      }
      else {
        return NextResponse.json({
          message: "approved is pending",
          pending: true,
        })
      }
    }

    else {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          console.log('User does not exist',)
          return NextResponse.json({ error: "User does not exist" })
        }
        console.log("user exists");


        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
          return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(user);

        //create token data
        const tokenData = {
          id: user._id,
          name: user.name,
          email: user.email,
          isInstructor: false,
          isAdmin: false,
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" })

        const response = NextResponse.json({
          message: "Login successful",
          success: true,
          Login: user,
        })
        response.cookies.set("e-learninigtoken", token, {
          httpOnly: true,

        })
        return response;
      }
      catch (err) {
        console.Console.log("error", err.message)
        return NextResponse.json({ error: err.message })
      }
    }

    // const instructor = await Instructor.findOne({ email });
    // if (instructor && instructor.status === 'approved') {
    //   const isMatch = await bcryptjs.compare(password, instructor.password);
    //   if (isMatch) {
    //     const token = jwt.sign({ id: instructor._id }, process.env.JWT_SECRET);
    //     return new Response(JSON.stringify({ token }), { status: 200 });
    //   } else {
    //     return new Response('Invalid credentials.', { status: 400 });
    //   }
    // } else {
    //   return new Response('Instructor not approved or does not exist.', { status: 400 });
    // }
  }
  catch (error) {
    return NextResponse.json({ error: error.message })

  }
}