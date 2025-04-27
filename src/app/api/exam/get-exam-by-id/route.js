
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";
import mongoose from "mongoose";

// connect()
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
      await connect();
      const reqBody = await request.json()
      
        const exam = await Exam.findById(reqBody.examId).populate('questions', { strictPopulate: false }).exec();
        return NextResponse.json({
            message: "exam featch successfully",
            success: true,
            data:exam
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