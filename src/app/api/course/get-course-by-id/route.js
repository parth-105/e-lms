
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";

import Cource from "@/model/cource-model";

// connect()

export async function POST(request) {
    try {
      await connect();
      const reqBody = await request.json()
      console.log("reqbody",reqBody)
      const courses = await Cource.find({ instructor: reqBody.id })
        return NextResponse.json({
            message: "courses featch successfully",
            success: true,
            courses
        })
      } catch (error) {
        console.log("error",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}