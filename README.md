<div align="center">

# 📚 Smart Study Companion

### AI-Powered Learning Platform with Retrieval-Augmented Generation (RAG)

*Learn Smarter • Study Faster • Achieve More*

An intelligent full-stack learning platform that transforms study materials into an interactive AI tutor through **Retrieval-Augmented Generation (RAG)**, enabling document-aware conversations, automated notes, quizzes, mock tests, and study analytics.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_DB-6A1B9A?style=for-the-badge)
![LangChain](https://img.shields.io/badge/LangChain-RAG-00A67E?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google-gemini)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

</div>

---

# 📖 Overview

Smart Study Companion is a **full-stack AI-powered learning platform** that helps students upload study materials, interact with them through an intelligent chatbot, generate notes, create quizzes, and monitor learning progress.

The platform leverages **Retrieval-Augmented Generation (RAG)** by combining **LangChain**, **ChromaDB**, and **Google Gemini** to generate context-aware responses grounded in uploaded documents instead of generic AI knowledge.

---

# ✨ Features

## 🤖 AI Study Assistant

- 💬 Document-aware AI chatbot
- 📄 Context-based question answering
- ⚡ Retrieval-Augmented Generation (RAG)
- 🧠 Conversation memory
- 🎯 Accurate responses grounded in uploaded PDFs
- 📝 AI-generated explanations

---

## 📚 Smart Document Management

- PDF upload
- Automatic text extraction
- Semantic document indexing
- Document library
- Per-user document organization
- Fast document retrieval

---

## 📝 AI Study Tools

- Automatic notes generation
- Quiz generation
- Mock tests
- Flashcard generation
- Important topic extraction
- Chapter summaries

---

## 📊 Learning Analytics

- Study history
- Learning progress tracking
- Dashboard analytics
- Quiz performance
- Productivity insights
- Personalized study recommendations

---

## 🔐 Authentication

- JWT Authentication
- Email OTP Verification
- Secure password hashing
- Protected API routes
- Session management

---

# 🛠 Technology Stack

| Category | Technologies |
|-----------|--------------|
| 🎨 Frontend | Next.js 16, React 19, TypeScript |
| 🎨 Styling | Tailwind CSS, Framer Motion |
| ⚙️ Backend | FastAPI, Uvicorn |
| 🗄 Database | MongoDB |
| 🧠 Vector Database | ChromaDB |
| 🔍 RAG Framework | LangChain |
| 🤖 AI | Google Gemini 2.5 Flash |
| 📄 PDF Processing | PyMuPDF |
| 🔑 Authentication | JWT, bcrypt, Email OTP |

---

# 🏗 System Architecture

```text
                    Next.js Frontend
                           │
                    HTTP + JWT Authentication
                           │
                           ▼
                    FastAPI Backend
                           │
          ┌────────────────┼─────────────────┐
          │                │                 │
          ▼                ▼                 ▼
      MongoDB         PDF Processing      Gemini AI
                           │
                     PyMuPDF Extraction
                           │
                     Text Chunking
                           │
                     LangChain Pipeline
                           │
                       ChromaDB
                           │
               Relevant Context Retrieval
                           │
                           ▼
                 AI-generated Responses
```

---

# ⚙️ RAG Pipeline

```text
Upload PDF
      │
      ▼
Extract Text (PyMuPDF)
      │
      ▼
Chunk Documents
      │
      ▼
Generate Embeddings
      │
      ▼
Store in ChromaDB
      │
      ▼
User Query
      │
      ▼
Semantic Search
      │
      ▼
Retrieve Relevant Chunks
      │
      ▼
Gemini 2.5 Flash
      │
      ▼
Context-Aware Answer
```

---

# 📂 Project Structure

```text
Smart-Study-Companion/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── config/
│   │   └── utils/
│
└── docs/
```

---

# 📚 Core Modules

- 🤖 AI Chat Assistant
- 📄 PDF Upload & Processing
- 🧠 Retrieval-Augmented Generation
- 📝 AI Notes Generator
- ❓ Quiz Generator
- 🎯 Mock Test Generator
- 📊 Study Analytics
- 👤 User Authentication
- 📂 Document Management

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/SmartStudyCompanion.git
```

---

## Backend Setup

Create `.env`

```env
MONGODB_URI=

DATABASE_NAME=

JWT_SECRET_KEY=

GEMINI_API_KEY=

EMAIL_ADDRESS=

EMAIL_PASSWORD=
```

```bash
cd backend

python -m venv .venv

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Frontend Setup

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

```bash
cd frontend

npm install

npm run dev
```

---

# 🔌 API Modules

| Endpoint | Purpose |
|------------|----------|
| `/auth` | Authentication & OTP |
| `/api/chat` | RAG Chat |
| `/api/pdf` | PDF Upload & Management |
| `/api/study` | Notes, Quizzes & Analytics |

---

# 🌟 Highlights

- 🤖 AI-powered Study Assistant
- 🧠 Retrieval-Augmented Generation (RAG)
- 📚 Semantic Search
- 📄 Intelligent PDF Processing
- 🗂 ChromaDB Vector Storage
- 📊 Personalized Learning Analytics
- 🔐 Secure JWT Authentication
- 📧 Email OTP Verification
- ⚡ FastAPI Backend
- 📱 Responsive Next.js Dashboard

---

# 🔮 Future Scope

- 🎙 Voice-based Learning Assistant
- 🎥 Video Lecture Summarization
- 🖼 OCR Support for Handwritten Notes
- 📱 Progressive Web App (PWA)
- 👥 Collaborative Study Groups
- 📅 Smart Study Planner
- 📖 Spaced Repetition System
- 🧩 Adaptive Learning Paths
- 🌍 Multi-language Support

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

Built with ❤️ using **Next.js • FastAPI • LangChain • ChromaDB • Gemini AI • MongoDB**

</div>
