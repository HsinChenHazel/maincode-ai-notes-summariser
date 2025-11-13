# AI Notes Summarizer

A demo-quality web application that allows users to capture free-form notes and generate concise AI-powered summaries using Ollama.

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- At least 4GB of available RAM (for Ollama model)
- Modern web browser

### Setup and Usage

1. **Clone or navigate to the project directory:**
   ```bash
   cd maincode
   ```

2. **Start all services with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Pull and start the Ollama service
   - Download the `llama3.2:3b` model (first time only, ~2GB)
   - Build and start the backend API
   - Build and start the frontend application

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

4. **Stop the services:**
   ```bash
   docker-compose down
   ```

   To remove volumes (deleting stored notes and Ollama models):
   ```bash
   docker-compose down -v
   ```

## Architecture Overview

### System Components

```
┌─────────────┐      HTTP REST      ┌─────────────┐
│   Frontend  │ ◄──────────────────► │   Backend   │
│  (React)    │                     │  (Express)  │
│  Port 3000  │                     │  Port 5000  │
└─────────────┘                     └──────┬──────┘
                                           │
                                           │ HTTP REST
                                           │
                                    ┌──────▼──────┐
                                    │   Ollama    │
                                    │  Port 11434 │
                                    └─────────────┘
```

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Modern hooks for state management

**Backend:**
- Node.js with Express
- TypeScript for type safety
- JSON file-based storage (simple persistence)

**AI Backend:**
- Ollama with llama3.2:3b model
- REST API integration

**Infrastructure:**
- Docker Compose for orchestration
- Multi-container setup (frontend, backend, ollama)
- Nginx for serving frontend in production

### API Endpoints

#### POST `/api/notes`
Create a new note and generate AI summary.

**Request:**
```json
{
  "content": "Your note content here..."
}
```

**Response:**
```json
{
  "note": {
    "id": "uuid",
    "content": "Your note content here...",
    "summary": "AI-generated summary...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET `/api/notes`
Retrieve all stored notes.

**Response:**
```json
{
  "notes": [
    {
      "id": "uuid",
      "content": "...",
      "summary": "...",
      "createdAt": "..."
    }
  ]
}
```

#### GET `/api/notes/:id`
Retrieve a specific note by ID.

**Response:**
```json
{
  "note": {
    "id": "uuid",
    "content": "...",
    "summary": "...",
    "createdAt": "..."
  }
}
```

#### GET `/health`
Health check endpoint that also reports Ollama connection status.

## Design and Technical Trade-offs

### 1. JSON Storage vs Database

**Choice:** JSON file-based storage

**Rationale:**
- Simplicity for demo purposes
- No additional database setup required
- Easy to inspect and reset data
- Sufficient for low-volume demo scenarios

**Trade-off:**
- Would need PostgreSQL/SQLite for production
- No concurrent write safety
- Limited query capabilities

### 2. Single vs Multi-Container Setup

**Choice:** Multi-container Docker Compose setup

**Rationale:**
- Service isolation and independent scaling
- Clear separation of concerns
- Easy to replace individual services
- Better for production-like environment

**Trade-off:**
- Slightly more complex than single container
- Requires Docker Compose
- More network overhead

### 3. Model Selection: llama3.2:3b

**Choice:** llama3.2:3b

**Rationale:**
- Good balance between quality and speed
- Runs efficiently on consumer hardware (4GB+ RAM)
- Fast inference for real-time interaction
- Good summarization capabilities
- 3B parameters provide sufficient context understanding

**Trade-off:**
- Larger models (7B, 13B) would provide better quality but require more resources
- Very small models (1B) would be faster but lower quality

### 4. Streaming vs Non-streaming Responses

**Choice:** Non-streaming (complete response)

**Rationale:**
- Simpler implementation
- Better for demo scenarios
- Easier error handling
- Sufficient for summary generation

**Trade-off:**
- Streaming would provide better UX for long responses
- Can be added later as enhancement

### 5. Frontend Framework: React

**Choice:** React with TypeScript

**Rationale:**
- Mature ecosystem and tooling
- Excellent developer experience
- Strong TypeScript support
- Large community and resources

**Trade-off:**
- Vue or Svelte would work equally well
- React has larger bundle size than alternatives
- React's learning curve for new developers

### 6. UI Styling: Tailwind CSS

**Choice:** Tailwind CSS utility-first framework

**Rationale:**
- Rapid development without custom CSS
- Consistent design system
- Small production bundle (with purging)
- Excellent responsive design utilities

**Trade-off:**
- Can be verbose in JSX
- Requires learning Tailwind classes
- Less semantic than component-based CSS

## Assumptions Made

1. **Ollama in Docker:** Ollama is run in a Docker container, not as a local installation
2. **Docker Availability:** Users have Docker and Docker Compose installed
3. **Browser Support:** Modern browsers with ES6+ support (Chrome, Firefox, Safari, Edge)
4. **No Authentication:** No user authentication required for demo purposes
5. **Plain Text Notes:** Notes are plain text only (no markdown formatting in input)
6. **Single User:** Designed for single-user demo scenarios
7. **Network Access:** Backend can communicate with Ollama service via Docker network
8. **Model Availability:** llama3.2:3b model is available via Ollama (auto-downloaded)

## Improvements with More Time

### Short-term Enhancements

1. **Streaming Responses:** Implement streaming for AI summaries to show progress
2. **Note Editing:** Allow users to edit existing notes
3. **Note Deletion:** Add ability to delete notes
4. **Markdown Support:** Support markdown formatting in notes
5. **Export Functionality:** Export notes as PDF, Markdown, or JSON
6. **Search:** Add search functionality for past notes
7. **Better Error Messages:** More specific error messages for different failure scenarios

### Medium-term Enhancements

1. **Database Migration:** Replace JSON storage with PostgreSQL or SQLite
2. **User Authentication:** Add user accounts and authentication
3. **Tags/Categories:** Organize notes with tags or categories
4. **Multiple Models:** Allow users to choose different Ollama models
5. **Custom Prompts:** Allow users to customize the summarization prompt
6. **Rate Limiting:** Add rate limiting to prevent abuse
7. **Caching:** Cache summaries for identical or similar notes
8. **Batch Processing:** Process multiple notes at once

### Long-term Enhancements

1. **WebSocket Support:** Real-time updates using WebSockets
2. **Offline Support:** Service worker for offline functionality
3. **Mobile App:** Native mobile applications
4. **Cloud Deployment:** Production-ready cloud deployment (AWS, GCP, Azure)
5. **Analytics:** Usage analytics and insights
6. **Multi-language Support:** Internationalization (i18n)
7. **Advanced AI Features:** 
   - Multiple summary lengths (short, medium, long)
   - Extract key points / action items
   - Sentiment analysis
   - Topic extraction
8. **Collaboration:** Share notes with other users
9. **Integration:** Integrate with note-taking apps (Notion, Obsidian, etc.)
10. **API Keys:** Support for external Ollama instances with API keys

### Performance Optimizations

1. **Frontend Code Splitting:** Lazy load components
2. **Backend Caching:** Cache Ollama responses
3. **Database Indexing:** Proper indexing for queries
4. **CDN:** Use CDN for static assets
5. **Compression:** Enable gzip/brotli compression
6. **Image Optimization:** If adding images later

### Security Enhancements

1. **Input Sanitization:** Enhanced input validation and sanitization
2. **Rate Limiting:** Prevent abuse and DoS attacks
3. **CORS Configuration:** Proper CORS settings for production
4. **HTTPS:** SSL/TLS encryption
5. **Security Headers:** Add security headers (HSTS, CSP, etc.)
6. **Audit Logging:** Log security events

## Troubleshooting

### Ollama Model Not Loading

If the model fails to load, you can manually pull it:
```bash
docker exec -it ai-notes-ollama ollama pull llama3.2:3b
```

### Backend Can't Connect to Ollama

Check that:
- Ollama service is healthy: `docker-compose ps`
- Network connectivity: `docker network inspect maincode_ai-notes-network`
- Ollama is accessible: `curl http://localhost:11434/api/tags`

### Frontend Can't Connect to Backend

Check that:
- Backend is running: `curl http://localhost:5000/health`
- CORS is properly configured (should be enabled)
- Environment variable `VITE_API_URL` is set correctly

### Port Conflicts

If ports 3000, 5000, or 11434 are already in use, modify `docker-compose.yml` to use different ports.

## License

This is a demo project for educational purposes.

