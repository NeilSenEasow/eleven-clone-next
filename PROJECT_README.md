# Eleven Clone - Full Stack Application

A complete ElevenLabs clone built with React (Vite) frontend and Python (FastAPI) backend.

## 🚀 Features

### Frontend (React + Vite)
- **Text to Speech Interface**: Multi-language support with English and Arabic
- **Multi-step Onboarding**: Complete user onboarding flow with theme selection, personal details, referral source, user persona, and pricing plans
- **Authentication UI**: Beautiful login and signup pages with form validation
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Mobile-first approach with beautiful gradients and animations

### Backend (Python + FastAPI)
- **Audio API**: Dynamic language-based audio URL fetching
- **Onboarding API**: Complete user profile management
- **MongoDB Integration**: Async database operations
- **CORS Support**: Configured for seamless frontend integration
- **API Documentation**: Auto-generated Swagger/OpenAPI docs

## 📁 Project Structure

```
eleven-clone-next/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── onboarding/          # Onboarding flow components
│   │   ├── ui/                  # Reusable UI components
│   │   └── TextToSpeechTab.tsx  # Main TTS component
│   ├── pages/                   # Page components
│   │   ├── LoginPage.tsx        # Login page
│   │   ├── SignupPage.tsx       # Signup page
│   │   └── Onboarding.tsx       # Onboarding page
│   └── App.tsx                  # Main app component
├── backend/                     # Backend source code
│   ├── main.py                  # FastAPI application
│   ├── requirements.txt         # Python dependencies
│   ├── setup_database.py       # Database setup script
│   └── README.md               # Backend documentation
└── api/                        # Next.js API routes (legacy)
    └── audio/[language].ts     # Audio API route
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Lucide React** - Icons

### Backend
- **FastAPI** - Web framework
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
- **Python 3.8+** - Runtime

### Database
- **MongoDB** - NoSQL database

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Python 3.8+
- MongoDB (local or cloud)

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:8080](http://localhost:8080)

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up database:
   ```bash
   python setup_database.py
   ```

5. Start the server:
   ```bash
   python main.py
   ```

6. API will be available at [http://localhost:8000](http://localhost:8000)

## 📱 Pages and Components

### Text to Speech Tab
- Language selection dropdown (English/Arabic)
- Text input area with character counter
- Generate, Play, and Download buttons
- Real-time audio preview
- Error handling and loading states

### Onboarding Flow
1. **Theme Selection**: Light/Dark mode preference
2. **Personal Details**: Name, age, email with validation
3. **Referral Source**: How user found the platform
4. **User Persona**: Content creator, voice actor, etc.
5. **Pricing Plan**: Free, Creator, Pro plans with features

### Authentication Pages
- **Login Page**: Email/password with social login options
- **Signup Page**: Registration with password validation
- **Form Validation**: Real-time validation and error messages
- **Responsive Design**: Mobile-optimized layouts

## 🔌 API Endpoints

### Audio API
- `GET /api/audio?lang={language}` - Get audio URL for language
- Returns: `{ language, audioUrl, createdAt, updatedAt }`

### Onboarding API
- `POST /api/onboarding` - Create user profile
- `GET /api/onboarding/{user_id}` - Get user profile
- Body: Complete onboarding data object

### Health Check
- `GET /health` - API status

## 🎨 UI/UX Features

- **Gradient Backgrounds**: Beautiful purple-to-slate gradients
- **Glass Morphism**: Backdrop blur effects on cards
- **Smooth Animations**: Hover effects and transitions
- **Form Validation**: Real-time feedback and error states
- **Loading States**: Spinners and disabled states
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Accessibility**: Proper labels, ARIA attributes, and keyboard navigation

## 🗄️ Database Schema

### audio_urls Collection
```json
{
  "language": "english|arabic",
  "url": "https://example.com/audio.mp3",
  "description": "Voice description",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### onboarding_profiles Collection
```json
{
  "theme": "light|dark",
  "personalDetails": {
    "name": "John Doe",
    "age": 25,
    "email": "john@example.com"
  },
  "referralSource": "google|social|friend|website|forum|review",
  "persona": "content-creator|voice-actor|audiobook|music-producer|business|hobbyist",
  "pricingPlan": "free|creator|pro",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## 🔧 Development

### Frontend Development
```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Development
```bash
# Start with auto-reload
uvicorn main:app --reload

# Run database setup
python setup_database.py

# Test API endpoints
curl "http://localhost:8000/api/audio?lang=english"
```

## 🚀 Deployment

### Frontend Deployment
- Build the project: `npm run build`
- Deploy the `dist` folder to any static hosting service
- Configure environment variables for API endpoints

### Backend Deployment
- Use a production ASGI server like Gunicorn
- Set up MongoDB with proper authentication
- Configure environment variables
- Set up proper logging and monitoring

## 📝 Environment Variables

### Frontend
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:8000)

### Backend
- `MONGODB_URL` - MongoDB connection string
- `DATABASE_NAME` - Database name
- `API_HOST` - API host (default: 0.0.0.0)
- `API_PORT` - API port (default: 8000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational purposes. Please respect ElevenLabs' terms of service and intellectual property.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Note**: This is a clone project for educational purposes. It does not include actual AI voice synthesis - it uses placeholder audio URLs for demonstration.
