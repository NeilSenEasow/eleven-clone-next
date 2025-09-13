import mongoose, { Document, Schema } from 'mongoose';

export interface IAudioUrl extends Document {
  language: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

const AudioUrlSchema: Schema = new Schema({
  language: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Create index on language for faster queries
AudioUrlSchema.index({ language: 1 });

export default mongoose.model<IAudioUrl>('AudioUrl', AudioUrlSchema);
