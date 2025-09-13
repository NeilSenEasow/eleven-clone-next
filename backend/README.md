# Eleven Clone Backend API

A FastAPI backend service for the ElevenLabs clone application.

## Features

- **Audio API**: Get audio URLs for different languages
- **Onboarding API**: Store user onboarding data
- **MongoDB Integration**: Async MongoDB operations
- **CORS Support**: Configured for frontend integration
- **Health Checks**: API health monitoring

## Setup

### Prerequisites

- Python 3.8+
- MongoDB (local or cloud)
- pip or pipenv

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp env.example .env
   # Edit .env with your MongoDB connection details
   ```

5. Set up the database:
   ```bash
   python setup_database.py
   ```

### Running the Server

```bash
python main.py
```

The API will be available at `http://localhost:8000`

### API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Audio API

- `GET /api/audio?lang={language}` - Get audio URL for a specific language
  - Query parameters:
    - `lang` (required): Language code (e.g., "english", "arabic")
  - Returns: Audio URL and metadata

### Onboarding API

- `POST /api/onboarding` - Create a new onboarding profile
  - Body: OnboardingData JSON
  - Returns: Success message and user ID

- `GET /api/onboarding/{user_id}` - Get onboarding profile by ID
  - Returns: Complete profile data

### Health Check

- `GET /health` - API health status

## Database Schema

### audio_urls Collection

```json
{
  "_id": "ObjectId",
  "language": "string",
  "url": "string",
  "description": "string",
  "createdAt": "ISO string",
  "updatedAt": "ISO string"
}
```

### onboarding_profiles Collection

```json
{
  "_id": "ObjectId",
  "theme": "string",
  "personalDetails": {
    "name": "string",
    "age": "number",
    "email": "string"
  },
  "referralSource": "string",
  "persona": "string",
  "pricingPlan": "string",
  "createdAt": "ISO string",
  "updatedAt": "ISO string"
}
```

## Environment Variables

- `MONGODB_URL`: MongoDB connection string
- `DATABASE_NAME`: Database name
- `API_HOST`: API host (default: 0.0.0.0)
- `API_PORT`: API port (default: 8000)
- `CORS_ORIGINS`: Comma-separated list of allowed origins

## Development

### Running in Development Mode

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Testing

```bash
# Test audio endpoint
curl "http://localhost:8000/api/audio?lang=english"

# Test onboarding endpoint
curl -X POST "http://localhost:8000/api/onboarding" \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "dark",
    "personalDetails": {
      "name": "John Doe",
      "age": 25,
      "email": "john@example.com"
    },
    "referralSource": "google",
    "persona": "content-creator",
    "pricingPlan": "creator"
  }'
```

## Deployment

For production deployment, consider:

1. Using a production ASGI server like Gunicorn
2. Setting up proper environment variables
3. Configuring MongoDB with authentication
4. Setting up proper logging and monitoring
5. Using HTTPS with proper SSL certificates
