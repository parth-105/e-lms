"use client"
import { useState } from 'react';

export default function PdfUploader() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleFileChange = (e) => {
    setPdfFiles(e.target.files);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const file of pdfFiles) {
      formData.append('pdfFiles', file);
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setAnswer(data.qaChain.answer(question));
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload and Process</button>
      <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question" />
      <p>Answer: {answer}</p>
    </div>
  );
}
