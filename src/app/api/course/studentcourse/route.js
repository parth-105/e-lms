
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";

import Cource from "@/model/cource-model";
import purches from "@/model/purches-model";

// connect()
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
      await connect();
      const reqBody = await request.json()
      

      const courses = await purches.find({ userId: reqBody.id })
      .populate({
        path: 'courseId',
        populate: {
          path: 'instructor',
          model: 'Instructor' 
        }
      })
      .exec();


         return NextResponse.json({
            message: "courses featch successfully",
            success: true,
            courses,
            
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