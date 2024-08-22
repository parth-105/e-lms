import { LangChain } from 'langchain/core';
import { NextResponse } from 'next/server';

const langChain = new LangChain({
  apiKey:'AIzaSyBu0POnbbEqqu_6MnhrGDitEcVKKQH2WYw',
});

export async function POST(req) {

     const reqBody = await req.json()
    const { prompt } = reqBody;
    console.log('body',reqBody)
    try {
      const response = await langChain.generate({
        model: 'gpt-4',
        prompt: prompt,
      });
      return NextResponse.json({ response });
    } catch (error) {
        console.log("error:",error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
 
}
