
// import { NextRequest, NextResponse } from "next/server";
// import { connect } from "@/lib/mongo";
// import Video from "@/model/video-model";


// connect()


// export async function GET(request){
//     try {
      
//         const videos = await Video.find({ isFree: true }).populate('instructor',{strictPopulate:false}).exec();;

//             return NextResponse.json({
//                 message: "video get successfully",
//                 success: true,
//                 videos
//             })

//     } catch (error) {
       
//         return NextResponse.json({error: error.message}, {status: 500})

//     }
// }



/// new code 

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Video from "@/model/video-model";

// Ensure the connection is established
connect();

// Force the runtime to use Node.js and disable static caching.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    // Fetch videos that are free and populate the instructor field.
    const videos = await Video.find({ isFree: true })
      .populate("instructor", { strictPopulate: false })
      .exec();

    return NextResponse.json(
      {
        message: "video get successfully",
        success: true,
        videos,
      },
      {
        headers: {
          // This header instructs clients/CDNs to not cache this response.
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
