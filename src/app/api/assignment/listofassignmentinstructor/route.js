
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import purches from "@/model/purches-model";
import Cource from "@/model/cource-model";
import Assignment from "@/model/Assignment";


connect()

export async function POST(request){
    try {

        const reqBody = await request.json();
        const { userId } = reqBody;

        console.log("id",userId);

     //  const userId = "66c06e33eb809d5d7beea044"

        //  const purchases = await Assignment.find({ instructor : userId }).populate({
        //     path: 'awnserfile',
        //     select: 'studentid'
        //   })
        //   .select('title description questionfile awnserfile')
        //   .exec();

          const insassignment = await Assignment.find({ instructor : userId }).populate('awnserfile.studentid');


            return NextResponse.json({
                message: "instructor couserse get successfully",
                success: true,
                insassignment
            })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}