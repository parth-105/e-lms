import Cource from '@/model/cource-model';
import {connect} from '../../../../lib/mongo';
import { NextRequest, NextResponse } from "next/server";


connect()
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request) {
  try {

    
    const reqBody = await request.json()
    const {courseId} = reqBody;
   
    
    const courses = await Cource.findById(courseId).populate('videos',{strictPopulate:false}).exec();

    return NextResponse.json(courses,{
      headers: {
        // This header instructs clients/CDNs to not cache this response.
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    
    return NextResponse.json({ error: error.message }, { status: 500 })

  }
}
