
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import purches from "@/model/purches-model";
import Cource from "@/model/cource-model";
import Assignment from "@/model/Assignment";


connect()

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request){
    try {

        const reqBody = await request.json();
        const { userId } = reqBody;

       

          const insassignment = await Assignment.find({ instructor : userId }).populate('awnserfile.studentid');


            return NextResponse.json({
                message: "instructor couserse get successfully",
                success: true,
                insassignment
            },{
                headers: {
                  // This header instructs clients/CDNs to not cache this response.
                  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                },
              })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}