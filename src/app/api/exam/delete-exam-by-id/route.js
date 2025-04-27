import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function DELETE(req) {
  try {
    await connect();
    
    const reqBody = await req.json(); // Parse the request body
    const examId = reqBody.examId;

    if (!examId) {
      return NextResponse.json({ error: "Exam ID is required" }, { status: 400 });
    }

    const deletedExam = await Exam.findByIdAndDelete(examId);

    if (!deletedExam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Exam deleted successfully",
      success: true,
    },{
      headers: {
        // This header instructs clients/CDNs to not cache this response.
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
