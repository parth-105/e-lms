
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";
import Question from "@/model/quiz/question-model";




connect()

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(req) {
    try {
       
        const reqBody = await req.json()
        //const { name, correctOption, options, exam } = reqBody

   
  
            // edit question in Questions collection
            const eq = await Question.findByIdAndUpdate(reqBody.questionId, reqBody);
                   
  
        return NextResponse.json({
            message: "question edit successfully",
            success: true,
            eq,

        },{
            headers: {
              // This header instructs clients/CDNs to not cache this response.
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          })
      }
       catch (error) {
        
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}