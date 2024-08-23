// pages/api/create-checkout-session.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
  if (req.method === 'POST') {
    const reqBody = await req.json()
     const { amount } = reqBody;
    console.log("amount :::::::", amount);
   // let newam = amount*100;
    console.log("Checkout 11111");

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Custom Payment',
              },
              unit_amount: amount  , // Use the dynamic amount
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/course`,
        cancel_url: `http://localhost:3000/course`,
      });
      console.log(session);

      return NextResponse.json({ sessionId: session });
    } catch (err) {
      return NextResponse.json({ message: err.message });
    }
  } else {

    return NextResponse.status(405).json({ message: 'Method Not Allowed' });
  }
}