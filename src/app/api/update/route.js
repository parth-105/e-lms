import Purches from "@/model/purches-model";
import { connect } from "@/lib/mongo";
import { NextResponse } from "next/server";
connect();


export async function POST(request){
    const reqBody = await request.json()
    const {user ,course ,purches} = reqBody

    const newPurches = new Purches({
        user,
        course,
        purches
    })

    const savePurchase = await newPurches.save();

    
    return NextResponse.json({
        message: "purcgase update successduly",
        success: true,
        savePurchase
    })
} 