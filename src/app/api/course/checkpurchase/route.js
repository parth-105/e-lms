// pages/api/checkPurchase.js

import { connect } from '@/lib/mongo';
import Purches from '@/model/purches-model';
import { NextResponse } from 'next/server';

connect();
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export  async function POST(request) {


  const reqBody = await request.json();
  const { courseId, userId } = reqBody;

  

  const purchase = await Purches.findOne({ courseId, userId })

  if (purchase) {
  
    return NextResponse.json({
        purchased: true,
     
    },{
      headers: {
        // This header instructs clients/CDNs to not cache this response.
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    })
  } else {
    
    return NextResponse.json({
        purchased: false,
     
    },{
      headers: {
        // This header instructs clients/CDNs to not cache this response.
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    })
  }
}
