// import { NextApiRequest, NextApiResponse } from 'next';
// import { MongoClient, Db } from 'mongodb';

// // MongoDB connection
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eleven-clone';
// const AUDIO_URLS_COLLECTION = process.env.AUDIO_URLS_COLLECTION || 'audio_urls';

// let cachedClient: MongoClient | null = null;
// let cachedDb: Db | null = null;

// async function connectToDatabase() {
//   if (cachedClient && cachedDb) {
//     return { client: cachedClient, db: cachedDb };
//   }

//   try {
//     const client = new MongoClient(MONGODB_URI);
//     await client.connect();
//     const db = client.db();
    
//     cachedClient = client;
//     cachedDb = db;
    
//     return { client, db };
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//     throw new Error('Database connection failed');
//   }
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Only allow GET requests
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const { language } = req.query;

//     // Validate language parameter
//     if (!language || typeof language !== 'string') {
//       return res.status(400).json({ 
//         error: 'Language parameter is required' 
//       });
//     }

//     // Connect to database
//     const { db } = await connectToDatabase();

//     // Query the audio_urls collection
//     const audioUrl = await db.collection(AUDIO_URLS_COLLECTION).findOne({
//       language: language.toLowerCase()
//     });

//     if (!audioUrl) {
//       return res.status(404).json({ 
//         error: 'Audio URL not found for the specified language' 
//       });
//     }

//     // Return the audio URL
//     return res.status(200).json({
//       language: audioUrl.language,
//       audioUrl: audioUrl.url,
//       createdAt: audioUrl.createdAt,
//       updatedAt: audioUrl.updatedAt
//     });

//   } catch (error) {
//     console.error('Error fetching audio URL:', error);
//     return res.status(500).json({ 
//       error: 'Internal server error' 
//     });
//   }
// }
