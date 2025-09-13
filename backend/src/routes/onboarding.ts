import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import OnboardingProfile from '../models/OnboardingProfile';
import mongoose from 'mongoose';

const router = express.Router();

// POST /api/onboarding
router.post('/',
  [
    body('theme').notEmpty().withMessage('Theme is required').trim(),
    body('personalDetails.name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters')
      .trim(),
    body('personalDetails.age')
      .isInt({ min: 13, max: 120 })
      .withMessage('Age must be between 13 and 120'),
    body('personalDetails.email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('referralSource').notEmpty().withMessage('Referral source is required').trim(),
    body('persona').notEmpty().withMessage('Persona is required').trim(),
    body('pricingPlan').notEmpty().withMessage('Pricing plan is required').trim()
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          errors: errors.array()
        });
        return;
      }

      const { theme, personalDetails, referralSource, persona, pricingPlan } = req.body;

      const profileDoc = new OnboardingProfile({
        theme,
        personalDetails: {
          name: personalDetails.name,
          age: personalDetails.age,
          email: personalDetails.email
        },
        referralSource,
        persona,
        pricingPlan
      });

      const savedProfile = await profileDoc.save();

      res.status(201).json({
        success: true,
        data: {
          message: 'Onboarding profile created successfully',
          userId: (savedProfile._id as mongoose.Types.ObjectId).toString(),
          status: 'success'
        }
      });
    } catch (error) {
      console.error('Error creating onboarding profile:', error);
      
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: Object.values(error.errors).map(err => err.message)
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

// GET /api/onboarding/:user_id
router.get('/:user_id',
  [
    param('user_id')
      .isMongoId()
      .withMessage('Invalid user ID format')
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          errors: errors.array()
        });
        return;
      }

      const { user_id } = req.params;

      const profile = await OnboardingProfile.findById(user_id);

      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
        return;
      }

      res.json({
        success: true,
        data: {
          _id: (profile._id as mongoose.Types.ObjectId).toString(),
          theme: profile.theme,
          personalDetails: profile.personalDetails,
          referralSource: profile.referralSource,
          persona: profile.persona,
          pricingPlan: profile.pricingPlan,
          createdAt: profile.createdAt.toISOString(),
          updatedAt: profile.updatedAt.toISOString()
        }
      });
    } catch (error) {
      console.error('Error fetching onboarding profile:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

export default router;
