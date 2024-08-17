
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";
import Question from "@/model/quiz/question-model";




connect()


export async function POST(req) {
    try {
       
        const reqBody = await req.json()
        //const { name, correctOption, options, exam } = reqBody

        console.log("checking",reqBody)
  
            // edit question in Questions collection
            await Question.findByIdAndUpdate(reqBody.questionId, reqBody);
                   
  
        return NextResponse.json({
            message: "question edit successfully",
            success: true,
        })
      }
       catch (error) {
        console.log("error",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}