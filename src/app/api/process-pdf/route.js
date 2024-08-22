// pages/api/process-pdf.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {

    try {
        const reqBody = await req.json()
      const { fileUrl, questions } = reqBody;

      console.log('reqbody',{fileUrl,questions})
      // Fetch the PDF file from Firebase Storage
   //   const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    //  const pdfData = Buffer.from(response.data, 'binary');

      const genAI = new GoogleGenerativeAI('AIzaSyBu0POnbbEqqu_6MnhrGDitEcVKKQH2WYw');

    //   const aiResponse = await genAI.generateContent({
    //     model: 'gemini-1.5-flash',
    //     contents: [
    //       {
    //         inlineData: {
    //           data: pdfData.toString('base64'),
    //           mimeType: 'application/pdf',
    //         },
    //         questions: questions,
    //       },
    //     ],
    //   });

    //   const answers = aiResponse.data.answers;
    //   console.log('anwser',answers)

    const response = await genAI.generateText({
        model: 'text-davinci-003',
        prompt: 'Write a poem about the sea.',
      });
      const generatedText = response.data.choices[0].text;
      
      console.log('anwser',generatedText)
      return NextResponse.json({ generatedText });
    } catch (error) {
      console.error('Error processing PDF:', error.message);
      return NextResponse.json({ error: error.message,data: error })
    }
  }

