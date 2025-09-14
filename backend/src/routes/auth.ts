import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User';
import { generateAccessToken } from '../middleware/auth';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters')
      .trim()
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

      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
        return;
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = new User({
        email,
        name,
        password: hashedPassword
      });

      const savedUser = await user.save();

      // Generate JWT token for immediate login after signup
      const accessToken = generateAccessToken((savedUser._id as mongoose.Types.ObjectId).toString());

      res.status(201).json({
        success: true,
        data: {
          message: 'User created successfully',
          access_token: accessToken,
          token_type: 'bearer',
          user_id: (savedUser._id as mongoose.Types.ObjectId).toString(),
          name: savedUser.name,
          email: savedUser.email
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

// POST /api/auth/login
router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
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

      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
        return;
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
        return;
      }

      // Generate JWT token
      const accessToken = generateAccessToken((user._id as mongoose.Types.ObjectId).toString());

      res.json({
        success: true,
        data: {
          access_token: accessToken,
          token_type: 'bearer',
          user_id: (user._id as mongoose.Types.ObjectId).toString(),
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

export default router;
