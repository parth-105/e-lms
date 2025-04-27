
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";




connect()
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        const reqBody = await request.json()
         const { instructor} = reqBody

        const exams = await Exam.find({ instructor:instructor });
        return NextResponse.json({
            message: "exam get successfully",
            success: true,
            data:exams
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

