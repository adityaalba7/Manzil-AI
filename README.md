# Manzil AI - Student Life OS

> Study smarter. Spend wiser. Interview better.

Manzil AI is a comprehensive student productivity platform that connects your study performance, financial habits, and interview readiness into one unified AI-powered system. Built specifically for Indian college students preparing for placements.

## 🌟 Features

### 📚 Study Module
- **AI-Powered Quiz System** - Generate quizzes from PDFs, YouTube videos, or text
- **Spaced Repetition Engine** - AI re-asks your wrong answers in disguise 3 days later
- **Lecture Recorder** - Record 10 minutes → get notes + quiz instantly
- **Smart Notes Summarizer** - Upload PDF → flashcards + 1-page summary
- **Concept Mind Map** - Generate node-edge concept maps for any topic
- **Predict My Score** - AI predicts your exam score based on quiz history
- **Debate Mode** - Practice arguments with AI counterpoints
- **Teach It Back** - Explain concepts and get AI feedback
- **Night Owl Insight** - Find your peak study performance window
- **Panic Mode** - Rapid-fire questions for last-minute revision

### 💰 Finance Module
- **Expense Tracking** - Log expenses manually or via voice
- **UPI SMS Auto-Import** - Paste UPI SMS and AI extracts expense details
- **Savings Goals** - Set targets and track progress
- **Month-end Prediction** - AI predicts your remaining balance
- **AI Budget Roast** - Get savage but actionable spending feedback
- **Chai Latte Effect** - See how small daily expenses compound over time
- **Impulse Buy Detector** - Flag purchases above your daily average
- **Peer Benchmark** - Compare spending with students at similar colleges
- **Canteen Mode** - Quick-log daily meals with one tap

### 🎤 Interview Module
- **Live AI Mock Interviews** - Real-time interview simulator with voice input
- **Filler Word Tracker** - Detect and reduce "um", "like", "you know"
- **Answer Quality Meter** - Real-time scoring on clarity, depth, confidence, structure
- **Salary Negotiation Coach** - Practice salary conversations with AI
- **JD Analyzer** - Extract skills and generate prep plans from job descriptions
- **Mirror Mode** - Watch your body language while practicing
- **Company-Specific Prep** - Tailored sessions for Google, Flipkart, startups

### 🤖 AI Tools
- **Roast My Resume** - Get savage but actionable AI feedback on your CV
- **Resume Gap Detector** - Compare resume against target company requirements
- **CGPA to Package Estimator** - Estimate likely salary based on CGPA and college tier
- **Scholarship Radar** - Find scholarships you qualify for based on your profile
- **Code Mentor** - Paste broken code → AI explains the problem and the fix
- **Monthly Wrap** - Spotify-style monthly recap with shareable story card
- **Student Twin Match** - Find study partners with complementary skills
- **Sleep & Study Correlation** - Analyze sleep patterns and study performance

### 🏆 Gamification
- **Manzil Life Score** - Unified score combining academic, financial, and interview metrics
- **Daily 60-Second Blitz** - Quick challenges to maintain streak
- **College Leaderboard** - See how you rank among peers
- **Learning Quest Map** - Visual progress through topics
- **Achievement Shelf** - Unlock badges for milestones
- **Friend Challenges** - Send quiz challenges to friends

### 👤 Profile & Integrations
- **GitHub Integration** - Display repositories, activity heatmap, and stats
- **LeetCode Integration** - Show contest rating, problems solved, and recent submissions
- **Activity Log** - 364-day activity heatmap
- **Downloadable Profile Card** - Share your stats as an image
- **WhatsApp Share** - Share weekly reports directly to WhatsApp

## 🏗️ Architecture

Manzil AI consists of three independent services:

### Frontend (`frontend/`)
- **Tech Stack**: React 18, TypeScript, Vite, React Router v7, Radix UI, Tailwind CSS
- **Key Libraries**: Recharts (charts), Motion (animations), html2canvas (image generation)
- **Port**: 5173

### Backend (`backend/`)
- **Tech Stack**: Node.js, Express, PostgreSQL, Redis
- **Responsibilities**: Authentication, user data, gamification, API orchestration
- **Port**: 5000

### Python API (`files/`)
- **Tech Stack**: FastAPI, SQLAlchemy, SQLite
- **AI Provider**: Google Gemini API (with Groq fallback)
- **Port**: 8000

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+
- Redis 7+

### Environment Setup

Create `.env` files in each service directory:

**Backend (`backend/.env`)**:
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/manzil
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
```

**Frontend (`frontend/.env`)**:
```env
VITE_API_URL=http://localhost:5000
```

**Python (`files/.env`)**:
```env
GEMINI_API_KEY=your-gemini-api-key
```

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/your-org/manzil-ai.git
cd manzil-ai

# Backend
cd backend
npm install
npm run migrate  # Run database migrations
npm run dev      # Start on http://localhost:5000

# Python API (new terminal)
cd files
pip install -r requirements.txt
uvicorn app.main:app --reload  # Start on http://localhost:8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev     # Start on http://localhost:5173
```

### Running Tests

```bash
# Python tests
cd files
pytest                    # Run all tests
pytest test_predict_score.py  # Run specific test
```

## 📊 Database Schema

### PostgreSQL (Backend)
- `users` - User profiles, scores, streaks
- `expenses` - Expense tracking with categories
- `savings_goals` - Financial goals and progress
- `study_uploads` - Uploaded study materials
- `quiz_sessions` - Quiz attempts and scores
- `quiz_answers` - Individual quiz responses with spaced repetition
- `interview_sessions` - Mock interview sessions
- `interview_answers` - Interview responses with AI feedback
- `trimind_score_history` - Score history over time

### SQLite (Python API)
- `quiz_sessions` - Local quiz session storage

## 🔌 API Endpoints

### Backend (Port 5000)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/dashboard` - Unified dashboard data
- `GET /api/study/performance` - Study performance metrics
- `POST /api/study/quiz/start` - Start a quiz session
- `GET /api/finance/summary` - Financial summary
- `POST /api/finance/expenses` - Log an expense
- `GET /api/interview/sessions` - List interview sessions
- `POST /api/interview/sessions` - Start mock interview
- `GET /api/rewards/summary` - Gamification data
- `GET /api/profile` - User profile with integrations

### Python API (Port 8000)
- `POST /api/predict-score/` - Predict exam score
- `POST /api/debate/` - Generate debate counterarguments
- `POST /api/teach-back/` - Evaluate explanations
- `GET /api/night-owl/` - Get peak study window
- `POST /api/mind-map/` - Generate concept mind map
- `POST /api/whatsapp/parse` - Parse WhatsApp chat exports
- `POST /api/notes/summarize-text` - Summarize text notes
- `POST /api/notes/summarize-pdf` - Summarize PDF notes
- `POST /api/resume-gap/analyze` - Analyze resume gaps
- `POST /api/roast/roast` - Roast a resume
- `POST /api/mood/plan` - Create mood-based study plan
- `POST /api/spaced-rep/generate` - Generate spaced repetition cards
- `POST /api/cgpa/estimate` - Estimate salary package
- `POST /api/scholarship/find` - Find scholarships
- `POST /api/sleep/analyze` - Analyze sleep-study correlation
- `POST /api/monthly-wrap/generate` - Generate monthly wrap
- `POST /api/student-twin/find-match` - Find study partner
- `POST /api/code/mentor` - Get code mentoring
- `POST /api/chatbot/chat` - Unified AI chatbot

## 🧠 Cron Jobs

The backend runs scheduled jobs:

- **computeScores** (8 PM UTC) - Calculates Manzil Life Score for active users
- **dailyNudge** (2 AM UTC) - Generates personalized daily nudges stored in Redis

## 🎨 Design System

### Colors
- **Emerald** (`#0EA882`) - Study/Academic
- **Saffron** (`#E8620A`) - Finance
- **Violet** (`#5B47E0`) - Interview/Career
- **Rose** (`#D93B3B`) - Alerts/Errors

### Typography
- **Display**: Custom font for headings and scores
- **Sans**: DM Sans for body text
- **Mono**: For numbers and code

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Team

- **Aditya Jain** (Team Lead & Backend Development)
- **Samay Parashar** (Ai Integration)
- **Hardik Agarwal** (Frontend Development)

## 📞 Contact

- Email: adityaalba27@gmail.com
- LinkedIn: [Aditya Jain](https://www.linkedin.com/in/adityajain-dev/)
- LinkedIn: [Samay Parashar](https://www.linkedin.com/in/samay-parashar-95833b382/)
- LinkedIn: [Hardik Agarwal](https://www.linkedin.com/in/hardik-agarwal-85a90a382/)


## 🙏 Acknowledgments

Built for the 15 million Indian students preparing for placements. Made in India, for India.
