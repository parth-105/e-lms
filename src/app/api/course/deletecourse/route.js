
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";

import Cource from "@/model/cource-model";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request) {

    await connect();

    try {
        const reqBody = await request.json()

        const { id } = reqBody
    
        const result = await Cource.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ message: 'course not found' });
        }
        return NextResponse.json({ message: 'Video deleted successfully', Success: true },{
            headers: {
              // This header instructs clients/CDNs to not cache this response.
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          });
    } catch (error) {
       
        return NextResponse.json({ message: 'Internal server error' });
    }

}
