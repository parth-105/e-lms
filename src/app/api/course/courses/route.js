// import Cource from '@/model/cource-model';
// import {connect} from '../../../../lib/mongo';
// import { NextRequest, NextResponse } from "next/server";


// connect()
// export async function GET(res) {
//   try {

//     const courses = await Cource.find().populate('instructor',{strictPopulate:false}).exec();

//     return NextResponse.json(courses);
//   } catch (error) {
    
//     return NextResponse.json({ error: error.message }, { status: 500 })

//   }
// }


//new  cod 



import Cource from '@/model/cource-model';
import { connect } from '../../../../lib/mongo';
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

// Force Node.js runtime and dynamic behavior to avoid caching
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    const courses = await Cource.find()
      .populate('instructor', { strictPopulate: false })
      .exec();

    return NextResponse.json(courses, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    },{
      headers: {
        // This header instructs clients/CDNs to not cache this response.
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
