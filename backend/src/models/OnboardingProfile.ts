import mongoose, { Document, Schema } from 'mongoose';

export interface IPersonalDetails {
  name: string;
  age: number;
  email: string;
}

export interface IOnboardingProfile extends Document {
  theme: string;
  personalDetails: IPersonalDetails;
  referralSource: string;
  persona: string;
  pricingPlan: string;
  createdAt: Date;
  updatedAt: Date;
}

const PersonalDetailsSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  age: {
    type: Number,
    required: true,
    min: 13,
    max: 120
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  }
}, { _id: false });

const OnboardingProfileSchema: Schema = new Schema({
  theme: {
    type: String,
    required: true,
    trim: true
  },
  personalDetails: {
    type: PersonalDetailsSchema,
    required: true
  },
  referralSource: {
    type: String,
    required: true,
    trim: true
  },
  persona: {
    type: String,
    required: true,
    trim: true
  },
  pricingPlan: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Create index on email for faster queries
OnboardingProfileSchema.index({ 'personalDetails.email': 1 });

export default mongoose.model<IOnboardingProfile>('OnboardingProfile', OnboardingProfileSchema);
