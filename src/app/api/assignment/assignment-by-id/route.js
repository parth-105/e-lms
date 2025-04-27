
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";

import Assignment from "@/model/Assignment";



export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
      await connect();
      const reqBody = await request.json()
     
      const {id} = reqBody
      const assignment = await Assignment.findById(id);
    
        return NextResponse.json({
            message: "assignment featch successfully",
            success: true,
            assignment
        },{
          headers: {
            // This header instructs clients/CDNs to not cache this response.
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        })
      } catch (error) {
       
        return NextResponse.json({ error: error.message }, { status: 500 },)
      }
}