import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { config } from 'dotenv';
config();

export const sotreDataVector = async () => {
  try {
    // chat gpt api key
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    //   Loading data form pdf
    const loader = new PDFLoader('./pdf/ManchesterUnited.pdf');
    const rawDocs = await loader.load();
    //   splitting data to chunks

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await textSplitter.splitDocuments(rawDocs);
    const client = new PineconeClient();
    await client.init({
      //  PINECONE_API_KEY from pinecone
      apiKey: process.env.PINECONE_API_KEY,
      //  PINECONE_ENVIRONMENT from pinecone ('northamerica-northeast1-gcp')
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    //  PINECONE_INDEX data base index name
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
    //  storing data in pinecone (beware 1536)
    await PineconeStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({
        openAIApiKey: OPENAI_API_KEY,
      }),
      {
        pineconeIndex,
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
