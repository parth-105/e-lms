
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";




connect()

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(req) {
    try {

 
      const reqBody = await req.json()
      const { examId,body } = reqBody

      
      
       const eexam = await Exam.findByIdAndUpdate(examId, reqBody);
        return NextResponse.json({
            message: "exam edit successfully",
            success: true,
            eexam
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