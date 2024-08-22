import { InferenceClient } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const client = new InferenceClient({
  apiKey:'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', // Ensure you set this environment variable
});

export async function POST(req) {

    const reqBody = await req.json()
    const { text, question } = reqBody;

    console.log('req',reqBody)
  
  
  //  const { text, question } = req.body;

    try {
      // Call the AI service
      const response = await client.questionAnswering({
        model: 'distilbert-base-cased-distilled-squad', // Example model
        question,
        context: text,
      });

      console.log('answerssss',response)
      return NextResponse.json({ answer: response.answer });
    } catch (error) {
        console.error('Error anwser:', error.message);
        return NextResponse.json({ error: error.message })
    }
 
}
