
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";
import User from "@/model/user-model";
import Report from "@/model/quiz/report-model";




connect()


export async function POST(request) {
    try {
        const reqBody = await request.json()
        console.log("reqbody",reqBody.user)
       //console.log("req.body",request.body)
        //const { examName, userName } = reqBody;

        const reports = await Report.find({ user: reqBody.user })
        .populate("exam",  { strictPopulate: false })
        .populate("user",  { strictPopulate: false })
        .sort({ createdAt: -1 }).exec();
          return NextResponse.json({
            message: "attempt fetched successfully",
            success: true,
            data:reports
        })

      }  catch (error) {
        console.log("error:",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}