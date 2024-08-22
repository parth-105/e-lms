import { PDFDocument } from 'pdf-lib';
//import fetch from 'node-fetch';
import { NextResponse } from 'next/server';

export async function POST(req) {

    const reqBody = await req.json()
    const { pdfUrl } = reqBody;
  
    console.log('www',reqBody)
  

    try {
      // Fetch PDF from URL
      const response = await fetch(pdfUrl);
      const arrayBuffer = await response.arrayBuffer();

      // Extract text from PDF
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      let text = '';

      for (const page of pages) {
        const { textContent } = await page.getTextContent();
        text += textContent.items.map(item => item.str).join(' ');
      }

      return NextResponse.json({ text });
    } catch (error) {
        console.error('Error processing PDF:', error.message);
        return NextResponse.json({ error: error.message,data: error })
    }
  
}
