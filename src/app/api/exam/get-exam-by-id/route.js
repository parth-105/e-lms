
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";
import mongoose from "mongoose";

// connect()

export async function POST(request) {
    try {
      await connect();
      const reqBody = await request.json()
      console.log("reqbody",reqBody)
        const exam = await Exam.findById(reqBody.examId).populate('questions', { strictPopulate: false }).exec();
        return NextResponse.json({
            message: "exam featch successfully",
            success: true,
            data:exam
        })
      } catch (error) {
        console.log("error",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}