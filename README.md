# 🚀 AI Resume Builder — Full-Stack Premium SaaS

A **premium AI-powered resume builder** built with React.js + Tailwind CSS (frontend) and Node.js + Express.js (backend). Uses **Google Gemini AI** to generate, improve, and ATS-optimize professional resumes in real time.

> 🎯 **Portfolio-ready** — no payment features, clean code, modern SaaS design.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Generation** | Generate a full resume from any job description using Groq AI |
| ✍️ **AI Improvement** | Improve summaries, bullets, skills per-section with one click |
| 📊 **ATS Checker** | Score your resume against a job description with improvement tips |
| 🎨 **4 Pro Templates** | Modern, Classic, Minimalist, Creative — switch anytime |
| 👁️ **Live Preview** | Real-time A4 resume preview as you type |
| 📄 **PDF Export** | Download pixel-perfect PDF resumes |
| 🔐 **JWT Auth** | Register/login with email + password, token auto-refresh |
| 💾 **Auto-Save** | Debounced auto-save every 2 seconds while editing |
| 📱 **Responsive** | Fully responsive across desktop, tablet, and mobile |

---

## 🗂️ Project Structure

```
📁 frontend/          React + Vite + Tailwind CSS
│  ├── src/
│  │   ├── components/
│  │   │   ├── Navbar.jsx
│  │   │   ├── ResumeForm/      (PersonalInfo, Experience, Education, Skills, Projects)
│  │   │   └── ResumePreview/   (4 templates + wrapper)
│  │   ├── pages/               (Landing, Login, Register, Dashboard, Templates, Editor)
│  │   ├── context/             (AuthContext, ResumeContext)
│  │   └── services/            (api.js, resumeService.js, aiService.js)

📁 backend/           Node.js + Express.js
│  ├── src/
│  │   ├── controllers/         (authController, resumeController, aiController)
│  │   ├── routes/              (authRoutes, resumeRoutes, aiRoutes)
│  │   ├── middleware/          (authMiddleware, errorHandler)
│  │   ├── models/              (dataStore.js — in-memory + JSON file)
│  │   └── services/            (aiService.js — Groq integration)
│  └── server.js
```

---

## 🏁 Quick Start

### 1. Get a Groq API Key
Go to → **https://console.groq.com/keys** and create an API key.

### 2. Setup Backend

```bash
cd backend

# Copy and fill env file
copy .env.example .env
# Edit .env: add your GROQ_API_KEY

# Install dependencies (already done)
npm install

# Start backend (port 5000)
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies (already done)
npm install

# Start frontend (port 5173)
npm run dev
```

### 4. Open the App

👉 **http://localhost:5173**

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development

# IMPORTANT: Get key at https://console.groq.com/keys
GROQ_API_KEY=your-groq-api-key-here

JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
No env vars needed for local development — Vite proxies `/api` to `http://localhost:5000`.

---

## 🎨 Tech Stack

### Frontend
- **React 18** — functional components + hooks
- **Tailwind CSS v4** — utility-first styling
- **Vite** — lightning fast dev server
- **React Router v6** — client-side routing
- **Axios** — HTTP client with interceptors
- **react-hot-toast** — premium toast notifications
- **html2canvas + jsPDF** — client-side PDF generation
- **lucide-react** — beautiful icon library

### Backend
- **Node.js + Express.js** — REST API server
- **bcryptjs** — password hashing
- **jsonwebtoken** — JWT authentication
- **groq-sdk** — Groq AI integration
- **uuid** — unique ID generation
- **JSON file persistence** — simple database (swap with MongoDB easily)

---

## 🌐 API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, receive JWT |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/resumes` | ✅ | List user's resumes |
| POST | `/api/resumes` | ✅ | Create resume |
| PUT | `/api/resumes/:id` | ✅ | Update resume |
| DELETE | `/api/resumes/:id` | ✅ | Delete resume |
| POST | `/api/ai/improve` | ✅ | AI improve section |
| POST | `/api/ai/generate` | ✅ | Generate full resume |
| POST | `/api/ai/ats-check` | ✅ | ATS score + keywords |

---

## 🤖 AI Features

### Generate Full Resume
- Paste any job description
- Groq generates: summary, experience, skills, projects, education
- Fully ATS-optimized with quantified achievements

### Improve Sections
- **Summary** — Rewrites to be impactful and ATS-friendly
- **Experience Bullets** — Applies STAR method with strong action verbs
- **Skills** — Organizes and expands skill sets by category
- **Projects** — Improves description impact and clarity

### ATS Check
- Keyword matching against job description
- Section-by-section scoring
- Specific improvement suggestions

---

## 🚀 Deployment

### Backend (Railway / Render / Fly.io)
```bash
# Set environment variables in your platform dashboard
# Deploy: git push / connect repo
```

### Frontend (Vercel / Netlify)
```bash
# Build command: npm run build
# Output dir: dist
# Set VITE_API_URL=https://your-backend-url.com
```

---

## 📝 License

MIT — Free to use, modify, and distribute.