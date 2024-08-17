
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";




connect()


export async function POST(request) {
    try {
      
        const exam = await Exam.findById(request.body.examId).populate('questions');
        return NextResponse.json({
            message: "exam featch successfully",
            success: true,
            data:exam
        })
      } catch (error) {
        console.log("ree",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}