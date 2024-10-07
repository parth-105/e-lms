
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Video from "@/model/video-model";




export async function POST(request) {

    await connect();

    try {
        const reqBody = await request.json()

        const { id } = reqBody
        console.log('id', id)
        const result = await Video.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ message: 'video not found' });
        }
        return NextResponse.json({ message: 'Video deleted successfully', Success: true });
    } catch (error) {
        console.error('Error deleting video:', error.message);
        return NextResponse.json({ message: 'Internal server error' });
    }

}
