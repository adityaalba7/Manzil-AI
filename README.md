<p align="center">
  <img src="frontend/src/assets/logo.png" alt="Manzil AI Logo" width="120" />
</p>

<h1 align="center">Manzil AI</h1>

<p align="center">
  <strong>Your AI-powered college companion — study smarter, spend wiser, interview sharper.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/FastAPI-2.0-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?logo=google&logoColor=white" alt="Gemini" />
</p>

---

## 🎯 What is Manzil AI?

Manzil AI is a full-stack platform built **for Indian college students** that combines three critical areas of student life into one intelligent dashboard:

| Pillar | What it does |
|--------|-------------|
| 📚 **Study** | AI-generated quizzes, flashcards, smart notes, spaced repetition, and exam panic mode |
| 💰 **Finance** | Expense tracking in ₹ (paise-level precision), savings goals, budget insights, and monthly wraps |
| 🎤 **Interview** | AI mock interviews with real-time feedback on clarity, depth, confidence, and filler words |

A unified **TriMind Score** gamifies progress across all three areas with streaks, rewards, and shareable achievement cards.

---

## 🏗️ Architecture

```
Matrix/
├── frontend/          → React 18 + Vite + Tailwind CSS 4
├── backend/           → Node.js + Express 5 + PostgreSQL (Neon)
└── files/             → Python FastAPI — AI/ML microservice
```

### System Overview

```mermaid
graph LR
    A[React Frontend<br/>:5173] -->|REST API| B[Express Backend<br/>:5000]
    A -->|AI Endpoints| C[FastAPI Server<br/>:8000]
    B -->|SQL| D[(PostgreSQL<br/>Neon)]
    B -->|Cache| E[(Redis Polyfill<br/>File-based)]
    C -->|Inference| F[Gemini / Groq AI]
    B -->|Inference| F
```

---

## ✨ Features

### Core Modules

- **Study Dashboard** — Topic-based quiz generation, PDF/YouTube study material processing, flashcards with spaced repetition
- **Finance Dashboard** — Manual/voice/UPI expense logging, category breakdown (food, transport, study, fun, bills), savings goals with progress tracking
- **Interview Dashboard** — Domain-specific mock interviews (CS, Marketing, Finance, HR, Product, Data), AI feedback with scoring on 4 axes
- **Profile Dashboard** — TriMind Score visualization, streak tracking, activity history, public profile sharing
- **Gamification Hub** — Rewards, badges, achievements, and leaderboard
- **Shareable Cards** — Export achievement cards as images

### AI Tools (FastAPI)

| Tool | Description |
|------|-------------|
| 🤖 Unified Chatbot | Context-aware AI assistant across all modules |
| 📝 Smart Notes | AI-powered note summarization |
| 🎙️ Lecture Recorder | Record and transcribe lectures |
| 🔁 Spaced Repetition | Optimized review scheduling |
| 📊 CGPA Estimator | CGPA-to-package prediction |
| 📄 Resume Gap Detector | Identify resume weaknesses |
| 🔥 Roast My Resume | Brutally honest resume feedback |
| 🎓 Scholarship Radar | Find relevant scholarships |
| 💤 Sleep & Study Correlation | Analyze sleep vs performance |
| 📅 Monthly Wrap | End-of-month progress summary |
| 🧑‍🤝‍🧑 Student Twin Match | Find study partners |
| 💻 Code Mentor | AI coding assistance |
| 🗺️ Mind Map Builder | Visual topic breakdowns |
| 🌙 Night Owl Mode | Late-night study optimization |
| 🚨 Panic Mode | Last-minute exam prep |
| 🗣️ Debate Mode | Practice argumentation |
| 🔄 Teach It Back | Explain concepts to learn them |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **Python** ≥ 3.10
- **npm** (comes with Node.js)

### 1. Clone & Install

```bash
git clone https://github.com/your-username/matrix.git
cd matrix
```

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL, API keys, etc.
```

**AI Server:**
```bash
cd files
pip install -r requirements.txt
cp .env.example .env
# Add your GEMINI_API_KEY
```

### 2. Configure Environment

Create `backend/.env` using the example:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
REDIS_URL=redis://localhost:6379
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d
CORS_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_key
GROQ_API_KEY=your_key
```

### 3. Run Database Migrations

```bash
cd backend
npm run migrate
```

### 4. Start All Services

Open three terminals:

```bash
# Terminal 1 — Frontend
cd frontend
npm run dev                    # → http://localhost:5173

# Terminal 2 — Backend API
cd backend
npm run dev                    # → http://localhost:5000

# Terminal 3 — AI Server
cd files
uvicorn app.main:app --reload  # → http://localhost:8000
```

---

## 📁 Project Structure

<details>
<summary><b>Frontend</b> (React + Vite + Tailwind)</summary>

```
frontend/src/
├── app/
│   ├── components/      → Reusable UI (Sidebar, TopBar, ThemeToggle, Bot)
│   │   └── ui/          → Shadcn-style primitives (Card, Button, etc.)
│   └── pages/           → Route pages
│       ├── HomeDashboard.tsx
│       ├── StudyDashboard.tsx
│       ├── FinanceDashboard.tsx
│       ├── InterviewDashboard.tsx
│       ├── ProfileDashboard.tsx
│       ├── GamificationHub.tsx
│       ├── ShareableCards.tsx
│       ├── AITools.tsx
│       └── aitools/     → Individual AI tool pages
├── lib/                 → API clients (auth, study, finance, interview)
├── assets/              → Static assets (logo)
└── styles/              → Global CSS
```

</details>

<details>
<summary><b>Backend</b> (Express 5 + PostgreSQL)</summary>

```
backend/
├── app.js               → Express app entry point
├── controllers/         → Route handlers
│   ├── auth.controller.js
│   ├── finance.controller.js
│   ├── study.controller.js
│   ├── interview.controller.js
│   ├── dashboard.controller.js
│   ├── profile.controller.js
│   └── reward.controller.js
├── routes/              → Express route definitions
├── db/
│   ├── index.js         → PostgreSQL pool (Neon serverless)
│   ├── schema.sql       → Full database schema
│   ├── redis.js         → Redis client (file-system polyfill)
│   └── migrations/      → SQL migration files
├── middleware/           → Auth JWT guard, error handler
├── cron/                → Scheduled jobs (score computation, daily nudges)
├── services/            → Business logic layer
├── utils/               → Helpers (response formatter, score computation)
└── prompts/             → AI prompt templates
```

</details>

<details>
<summary><b>AI Server</b> (FastAPI + Gemini/Groq)</summary>

```
files/
├── app/
│   ├── main.py          → FastAPI app with 20+ routers
│   ├── config.py        → Settings (API keys)
│   ├── routers/         → One file per AI tool endpoint
│   └── services/        → AI inference logic
├── db/                  → SQLite for AI-specific data
├── requirements.txt     → Python dependencies
└── test_*.py            → Pytest test files
```

</details>

---

## 🗄️ Database Schema

8 tables in PostgreSQL (Neon):

| Table | Purpose |
|-------|---------|
| `users` | Auth, profile, TriMind score, streaks |
| `expenses` | Financial transactions (paise precision) |
| `savings_goals` | Target-based savings tracking |
| `study_uploads` | Processed PDFs with flashcards/summaries |
| `quiz_sessions` | Quiz metadata and scores |
| `quiz_answers` | Individual answers with spaced repetition scheduling |
| `interview_sessions` | Mock interview scores (clarity, depth, confidence, structure) |
| `interview_answers` | Per-question feedback and filler word detection |
| `trimind_score_history` | Daily composite score snapshots |

---

## 🔌 API Endpoints

### Backend (Express) — `localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create account |
| `POST` | `/api/auth/login` | Sign in |
| `POST` | `/api/auth/refresh` | Refresh JWT tokens |
| `GET` | `/api/auth/me` | Get current user |
| `GET` | `/api/finance/expenses` | List expenses |
| `POST` | `/api/finance/expenses` | Log expense |
| `GET` | `/api/study/quiz-history` | Quiz session history |
| `POST` | `/api/study/generate-quiz` | AI quiz generation |
| `POST` | `/api/interview/start` | Start mock interview |
| `GET` | `/api/dashboard/summary` | Aggregated dashboard stats |
| `GET` | `/api/rewards/*` | Rewards & achievements |
| `GET` | `/api/profile/*` | Profile data & public cards |

### AI Server (FastAPI) — `localhost:8000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chatbot/chat` | Unified AI chatbot |
| `POST` | `/api/predict-score/predict` | Score prediction |
| `POST` | `/api/notes/summarize` | Smart notes |
| `POST` | `/api/lecture/transcribe` | Lecture transcription |
| `POST` | `/api/spaced-rep/generate` | Spaced repetition cards |
| `POST` | `/api/cgpa/estimate` | CGPA to package |
| `POST` | `/api/resume-gap/analyze` | Resume analysis |
| `POST` | `/api/roast/analyze` | Resume roast |
| `POST` | `/api/scholarship/search` | Scholarship finder |
| `POST` | `/api/code/review` | Code review |
| `GET` | `/docs` | Swagger UI (auto-generated) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite 6, Tailwind CSS 4, Motion (Framer), Radix UI, Recharts, Lucide Icons |
| **Backend** | Node.js 24, Express 5, JWT (access + refresh), bcrypt, Helmet, node-cron |
| **AI Server** | Python 3, FastAPI, Gemini AI, Groq, SQLAlchemy |
| **Database** | PostgreSQL (Neon Serverless), Redis polyfill (file-based) |
| **Dev Tools** | Nodemon, Vite HMR, Uvicorn hot reload |

---

## 👥 Team

| Name | Role | Responsibilities |
|------|------|-----------------|
| **Aditya** | 🧭 Team Lead / Backend Lead / AI Integration | Project architecture, Express API, database design, Gemini/Groq integration, deployment |
| **Hardik** | 🎨 Frontend Developer | React UI, Tailwind styling, dashboard pages, responsive design, animations |
| **Samay** | 🤖 AI/ML Developer | FastAPI AI server, prompt engineering, AI tools (Smart Notes, Resume Roast, Spaced Rep, etc.) |

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ☕ and late nights by <strong>Aditya</strong>, <strong>Hardik</strong> & <strong>Samay</strong>
</p>
