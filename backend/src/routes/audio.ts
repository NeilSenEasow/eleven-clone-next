import express, { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import AudioUrl from '../models/AudioUrl';

const router = express.Router();

// GET /api/audio?lang=english
router.get('/', 
  [
    query('lang')
      .notEmpty()
      .withMessage('Language parameter is required')
      .isString()
      .withMessage('Language must be a string')
      .trim()
      .toLowerCase()
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

      const { lang } = req.query;
      
      const audioDoc = await AudioUrl.findOne({ language: lang as string });
      
      if (!audioDoc) {
        res.status(404).json({
          success: false,
          message: `Audio URL not found for language: ${lang}`
        });
        return;
      }

      res.json({
        success: true,
        data: {
          language: audioDoc.language,
          audioUrl: audioDoc.url,
          createdAt: audioDoc.createdAt.toISOString(),
          updatedAt: audioDoc.updatedAt.toISOString()
        }
      });
    } catch (error) {
      console.error('Error fetching audio URL:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

export default router;
