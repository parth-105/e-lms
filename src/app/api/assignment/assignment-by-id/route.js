
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";

import Assignment from "@/model/Assignment";

// connect()

export async function POST(request) {
    try {
      await connect();
      const reqBody = await request.json()
      console.log("reqbody",reqBody)
      const {id} = reqBody
      const assignment = await Assignment.findById(id);
      console.log('hh',assignment)
        return NextResponse.json({
            message: "assignment featch successfully",
            success: true,
            assignment
        })
      } catch (error) {
        console.log("error",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}