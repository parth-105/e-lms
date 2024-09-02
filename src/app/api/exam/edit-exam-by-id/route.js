
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";




connect()


export async function POST(req) {
    try {

   //   console.log(req.body.examId)
      const reqBody = await req.json()
      const { examId,body } = reqBody

      console.log("cg", reqBody)
      
       const eexam = await Exam.findByIdAndUpdate(examId, reqBody);
        return NextResponse.json({
            message: "exam edit successfully",
            success: true,
            eexam
        })
      } catch (error) {
        console.log("ree",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}