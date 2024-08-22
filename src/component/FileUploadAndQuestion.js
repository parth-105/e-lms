"use client"
import React, { useState } from 'react';

const FileUploadAndQuestion = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {

        console.log('cliked')
      // Upload file to Firebase or any other storage service and get URL
      // This is a placeholder: Replace with your file upload logic
    //   const formData = new FormData();
    //   formData.append('file', file);
    //   const uploadResponse = await fetch('/api/upload', { // Replace with your actual upload API route
    //     method: 'POST',
    //     body: formData,
    //   });
    //   const uploadData = await uploadResponse.json();
    //  const pdfUrl = uploadData.url; // URL of the uploaded file

    const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/e-learniing-5e7ee.appspot.com/o/pdfs%2Fe-learning.pdf?alt=media&token=68fae3cd-c54f-4598-b1eb-64bd68d6a6a1'
console.log('pdf',pdfUrl)
      // Extract text from PDF
      const extractResponse = await fetch('/api/extractText', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfUrl }),
      });
      const extractData = await extractResponse.json();
      setPdfUrl(pdfUrl);
      const { text } = extractData;

      console.log('t',text)

      if (text) {
        console.log('text')
        // Ask question
        const answerResponse = await fetch('/api/answerQuestion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, question }),
        });
        const answerData = await answerResponse.json();
        console.log('anweser',answerData)
        setAnswer(answerData.answer);
      }
    
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Extract</button>
      <input 
        type="text" 
        placeholder="Ask a question" 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)} 
      />
      <button onClick={handleUpload}>Submit Question</button>
      <div>Answer: {answer}</div>
    </div>
  );
};

export default FileUploadAndQuestion;
