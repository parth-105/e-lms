import Cource from '@/model/cource-model';
import {connect} from '../../../../lib/mongo';
import { NextRequest, NextResponse } from "next/server";


connect()
export async function POST(request) {
  try {

    //console.log("this is get req >>>>>><<<<<<<<<<<");
    const reqBody = await request.json()
    const {courseId} = reqBody;
   // console.log("courseId:KKKKKKKKKKKKKKKKKKK " , courseId);
    
    const courses = await Cource.findById(courseId).populate('videos',{strictPopulate:false}).exec();
   // console.log("courseqqqqqqqqqqqqqqqqqqqqqqqqqq", courses);
    

   // console.log("this is courses <<<<<<<<<<>>>>>>>>>>",courses);
    
   // res.status(200).json(courses);
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses videos:', error.message);
   // res.status(500).json({ message: 'Error fetching courses' });

  }
}
