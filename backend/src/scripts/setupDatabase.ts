import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AudioUrl from '../models/AudioUrl';
import User from '../models/User';

// Load environment variables
dotenv.config();

const setupDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URL;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URL environment variable is not defined');
    }

    await mongoose.connect(mongoURI, {
      dbName: process.env.DATABASE_NAME || 'eleven_clone',
    });

    console.log('✅ Connected to MongoDB');

    // Create indexes
    await User.createIndexes();
    await AudioUrl.createIndexes();

    // Insert sample audio URLs if they don't exist
    const existingAudio = await AudioUrl.countDocuments();
    if (existingAudio === 0) {
      const sampleAudioUrls = [
        {
          language: 'english',
          url: '/audio/english-sample.mp3'
        },
        {
          language: 'arabic',
          url: '/audio/arabic-sample.mp3'
        }
      ];

      await AudioUrl.insertMany(sampleAudioUrls);
      console.log('✅ Sample audio URLs inserted');
    }

    console.log('✅ Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
};

setupDatabase();
