import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';




export async function initializeVectorstoreWithDocuments(documents) {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    modelName: 'embedding-001',
    apiKey:'AIzaSyBu0POnbbEqqu_6MnhrGDitEcVKKQH2WYw',
  });
  const vectorstore = new MemoryVectorStore(embeddings);
  await vectorstore.addDocuments(documents);
  return vectorstore;
}
