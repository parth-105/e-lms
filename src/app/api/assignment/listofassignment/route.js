
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import purches from "@/model/purches-model";


connect()



export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request){
    try {

        const reqBody = await request.json();
        const { userId } = reqBody;

       

        const purchases = await purches.find({ userId })
  .populate({
    path: 'courseId',
    populate: {
      path: 'assignment',
      model: 'Assignment' // Replace 'Assignment' with the actual model name if different
    }
  })
  .exec();




            return NextResponse.json({
                message: "purchase couserse get successfully",
                success: true,
                purchases
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