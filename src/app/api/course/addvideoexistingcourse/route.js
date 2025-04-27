
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Video from '@/model/video-model'
import Instructor from "@/model/instructor-model";
import Cource from "@/model/cource-model";



connect()

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { courseid ,  title, description, instructor, thambnail, videourl ,comment ,isFree,subject} = reqBody

       


        const newVideo = new Video({
            title,
            description,
            instructor,
            thambnail,
            videourl,
            comment,
            isFree,
            subject
        })

        const video = await newVideo.save()

    


        await Instructor.findByIdAndUpdate(
            instructor,
            { $push: { videos: video._id } },
            { new: true }
        )

        await Cource.findByIdAndUpdate(
            courseid,
            { $push: { videos: video._id } },
            { new: true }
        )

        return NextResponse.json({
            message: "video creted successfully",
            success: true,
            video
        },{
            headers: {
              // This header instructs clients/CDNs to not cache this response.
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          })

    } catch (error) {
       
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}