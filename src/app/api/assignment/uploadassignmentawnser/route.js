
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Cource from '@/model/cource-model';
import Assignment from "@/model/Assignment";




connect()

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
 

        const reqBody = await request.json()
        const { student, answer ,id} = reqBody;

        

        const assignment = await Assignment.findById(id);
        if (!assignment) {
            return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
        }

        if(answer){
        assignment.awnserfile.push(answer);
        await assignment.save();
        }

    
  
      

        return NextResponse.json({
            message: "awnser submited creted successfully",
            success: true,
            assignment
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