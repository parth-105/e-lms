
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";

import Assignment from "@/model/Assignment";

// connect()
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
      await connect();
      const reqBody = await request.json()
    
      const { studentId }  = reqBody


      const assignments = await Assignment.find({ 'awnserfile.studentid': studentId })
      .populate('couses')
      .populate('instructor');


   
        return NextResponse.json({
            message: "assignment data successfully",
            success: true,
            assignments
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