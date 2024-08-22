
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Suggestion from '@/model/suggestion-model'



connect()


export async function POST(request){
    try {
        const reqBody = await request.json()
        const {topic, subject, student,Instructor} = reqBody

        console.log("checking", reqBody)
    
    
            const newsuggestion = new Suggestion({
                
                topic, 
                subject, 
                student,
                Instructor
            })
    
            const suggestions = await newsuggestion.save()
            console.log("suggestions",suggestions);



            return NextResponse.json({
                message: "suggestions created successfully",
                success: true,
                suggestions
            })

    } catch (error) {
        console.log('error:',error.message)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}