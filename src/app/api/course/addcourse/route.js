
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Cource from '@/model/cource-model'




connect()


export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { title, price , instructor, thambnail, videos} = reqBody

        console.log("checking", reqBody)


        const newCource = new Cource({
            title,
            price,
            instructor,
            thambnail,
            videos
        })

        const cource = await newCource.save()

    

        console.log("videos", cource);
        console.log("newvideos", newCource);


        // await Instructor.findByIdAndUpdate(
        //     instructor,
        //     { $push: { videos: video._id } },
        //     { new: true }
        // )

        return NextResponse.json({
            message: "video creted successfully",
            success: true,
            cource
        })

    } catch (error) {
        console.log("ree",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}