
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";

import Cource from "@/model/cource-model";


export async function POST(request) {

    await connect();

    try {
        const reqBody = await request.json()

        const { id , courseDetails } = reqBody
        const { price,subject, thambnail , title  } = courseDetails
        console.log('cid', id)
       // console.log('update', updates)

        const course = await Cource.findByIdAndUpdate(id, {title, price,subject , thambnail}, {
            new: true,
            runValidators: true,
        });
        if (!course) {
            return NextResponse.json({ message: 'course not found' });
        }
        console.log('course', course)
        return NextResponse.json({ message: 'course edit successfully', Success: true });
    } catch (error) {
        console.error('Error in editing course:', error.message);
        return NextResponse.json({ message: 'Internal server error' });
    }

}
