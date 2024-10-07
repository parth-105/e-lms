
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Cource from '@/model/cource-model';
import Assignment from "@/model/Assignment";




connect()


export async function POST(request) {
    try {
 

        const reqBody = await request.json()
        const { student, answer ,id} = reqBody;

        console.log("ccc", reqBody)

        const assignment = await Assignment.findById(id);
        if (!assignment) {
            return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
        }

        if(answer){
        assignment.awnserfile.push(answer);
        await assignment.save();
        }

    
     //   console.log("assignment", assignment);
      

        return NextResponse.json({
            message: "awnser submited creted successfully",
            success: true,
            assignment
        })

    } catch (error) {
        console.log("ree",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}