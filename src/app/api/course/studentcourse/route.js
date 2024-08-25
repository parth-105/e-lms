
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";

import Cource from "@/model/cource-model";
import purches from "@/model/purches-model";

// connect()

export async function POST(request) {
    try {
      await connect();
      const reqBody = await request.json()
      console.log("reqbody",reqBody)
      const courses = await purches.find({ userId: reqBody.id }).populate('courseId',{strictPopulate:false}).exec();
        return NextResponse.json({
            message: "courses featch successfully",
            success: true,
            courses,
            
        })
      } catch (error) {
        console.log("error",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}