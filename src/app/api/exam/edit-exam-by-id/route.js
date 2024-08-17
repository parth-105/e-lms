
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";




connect()


export async function POST(req) {
    try {
      
        await Exam.findByIdAndUpdate(req.body.examId, req.body);
        return NextResponse.json({
            message: "exam edit successfully",
            success: true,
        })
      } catch (error) {
        console.log("ree",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}