import Cource from '@/model/cource-model';
import {connect} from '../../../../lib/mongo';
import { NextRequest, NextResponse } from "next/server";


connect()
export async function GET(res) {
  try {

    //console.log("this is get req >>>>>><<<<<<<<<<<");
    
    const courses = await Cource.find().populate('instructor',{strictPopulate:false}).exec();

   // console.log("this is courses <<<<<<<<<<>>>>>>>>>>",courses);
    
   // res.status(200).json(courses);
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
   // res.status(500).json({ message: 'Error fetching courses' });

  }
}
