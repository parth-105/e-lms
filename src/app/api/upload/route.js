import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { loadQAChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { NextRequest, NextResponse } from "next/server";
//import { PromptTemplate } from 'langchain/dist/prompts';

export async function POST(req) {
    try {
        // const { pdfFiles } = req.body;

        // Extract text from PDFs (mocked for now)
        let text = 'surat is smart city';

        // Split text into chunks manually
        const textSplitter = new RecursiveCharacterTextSplitter();
        let textChunks = textSplitter.splitText(text);

        // Check if textChunks is an array
        if (!Array.isArray(textChunks)) {
            textChunks = [textChunks];
        }

        // Format text chunks if necessary
        textChunks = textChunks.map(chunk => ({ content: chunk }));

        // Create vector store
        const vectorStore = new MemoryVectorStore();
        await vectorStore.addDocuments(textChunks);

        // Set up Google Generative AI
        const apiKey = 'AIzaSyBu0POnbbEqqu_6MnhrGDitEcVKKQH2WYw';
        const embeddings = new GoogleGenerativeAIEmbeddings(apiKey);

        // Debugging: Check if embeddings object is created
        console.log('Embeddings:', embeddings);

        // Ensure the embeddings and vectorStore are correctly passed
        const qaChain = await loadQAChain({
            embeddings,
            vectorStore,
           //  promptTemplate
        });

        return NextResponse.json({ message: 'PDF processed successfully', qaChain });
    } catch (error) {
        console.log('errr:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
