
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Instructor from "@/model/instructor-model";


connect()

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {

    try {
        const pendingInstructors = await Instructor.find({ status: 'pending' });
        return NextResponse.json({
                message: "approval request ",
                success: true,
                pendingInstructors
            },{
              headers: {
                // This header instructs clients/CDNs to not cache this response.
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              },
            })
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
}
