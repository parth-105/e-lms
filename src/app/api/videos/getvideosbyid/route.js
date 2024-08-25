
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";
import mongoose from "mongoose";
import Video from "@/model/video-model";

// connect()

export async function POST(request) {
    try {
      await connect();
      const reqBody = await request.json()
      console.log("reqbody",reqBody)
        const videos = await Video.findById(reqBody.id)
        return NextResponse.json({
            message: "exam featch successfully",
            success: true,
            videos
        })
      } catch (error) {
        console.log("error",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}