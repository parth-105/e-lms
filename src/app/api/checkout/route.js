// pages/api/create-checkout-session.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import Cource from '@/model/cource-model';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {

  const reqBody = await req.json()
  const { price,courseId } = reqBody;

  if (req.method === 'POST') {

    console.log("amount :::::::", courseId);

    console.log("Checkout 11111");

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: 'Custom Payment',
              },
              unit_amount: price*100, // Use the dynamic amount
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/success/${courseId}`,
        cancel_url: `http://localhost:3000/course`,
      });
      //console.log(session);

      return NextResponse.json({ sessionId: session.id });
    } catch (err) {
      return NextResponse.json({ message: err.message });
    }
  } else {

    return NextResponse.status(405).json({ message: 'Method Not Allowed' });
  }
}