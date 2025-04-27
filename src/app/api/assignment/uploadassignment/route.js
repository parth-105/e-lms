
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
        const { title,description,questionfile,awnserfile,couses,instructor} = reqBody

      

        


        const newAssignment = new Assignment({
            title,description,questionfile,awnserfile,couses,instructor
        })

        const assignment = await newAssignment.save()

        const Course = await Cource.findById(couses);
        if (!Course) {
            return NextResponse.json({ error: "cousrse not found" }, { status: 404 })
        }
    
        Course.assignment.push(assignment._id);
        await Course.save();

      
      



        return NextResponse.json({
            message: "newAssignment creted successfully",
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