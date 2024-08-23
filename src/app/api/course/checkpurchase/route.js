// pages/api/checkPurchase.js

import { connect } from '@/lib/mongo';
import Purches from '@/model/purches-model';
import { NextResponse } from 'next/server';

connect();
export  async function POST(req) {



  const { user, course } = req.body;

  

  const purchase = await Purches.findOne({user,course})

  if (purchase) {
  
    return NextResponse.json({
        purchased: true,
     
    })
  } else {
    
    return NextResponse.json({
        purchased: false,
     
    })
  }
}
