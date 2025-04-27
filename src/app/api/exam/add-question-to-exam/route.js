
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
        const { name, correctOption, options, exam } = reqBody

        
  
        // Validate the request body
        if (!name || !correctOption || !options || !exam) {
           
            return NextResponse.json({ error:"all field require"})
        }
  
        // Add question to Questions collection
        const newQuestion = new Question({ name, correctOption, options, exam });
        const question = await newQuestion.save();
  
        // Add question to exam
        const examDoc = await Exam.findById(exam);
        examDoc.questions.push(question._id);
        await examDoc.save();
  
        return NextResponse.json({
            message: "question created successfully",
            success: true,
        },{
          headers: {
            // This header instructs clients/CDNs to not cache this response.
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        })
      } catch (error) {
       
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}