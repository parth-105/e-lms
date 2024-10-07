
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import purches from "@/model/purches-model";


connect()

export async function POST(request){
    try {

        const reqBody = await request.json();
        const { userId } = reqBody;

        console.log("id",userId);

     //  const userId = "66c06e33eb809d5d7beea044"

        // const purchases = await purches.find({ userId }).populate('courseId',{strictPopulate:false}).exec();

        const purchases = await purches.find({ userId })
  .populate({
    path: 'courseId',
    populate: {
      path: 'assignment',
      model: 'Assignment' // Replace 'Assignment' with the actual model name if different
    }
  })
  .exec();


        // for (let purchase of purchases) {    
        //     await purchase.populate('assignment',{strictPopulate:false}).exec();
        //   }
          
           console.log('asss',purchases[0].assignment);

        // for (let purchase of purchases) {
        //     await purchase.populate('assignment').execPopulate();
        // }
        
        // console.log('asss', purchases);

      let  purchasecourseassignment = purchases.assignment;


            return NextResponse.json({
                message: "purchase couserse get successfully",
                success: true,
                purchases
            })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}