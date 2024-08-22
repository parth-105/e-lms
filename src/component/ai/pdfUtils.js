import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export async function loadAndSplitChunks(filePath) {
  const loader = new PDFLoader(filePath);
  const rawDocs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1536, chunkOverlap: 128 });
  const splitDocs = await splitter.splitDocuments(rawDocs);
  return splitDocs;
}
