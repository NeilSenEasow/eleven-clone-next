import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = "mongodb+srv://neilseneasow:neilseneasow123@elevenlabs-clone.jqibrxm.mongodb.net/?retryWrites=true&w=majority&appName=elevenlabs-clone";
    
    if (!mongoURI) {
      throw new Error('MONGODB_URL environment variable is not defined');
    }

    const conn = await mongoose.connect(mongoURI, {
      dbName: "eleven_clone",
    });

    console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('❌ Disconnected from MongoDB');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('❌ MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
