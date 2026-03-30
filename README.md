# 🚀 Requesta Client Application

Welcome to **Requesta Client** — a modern, AI-powered institutional request management platform designed to replace outdated, manual ERP workflows with a seamless, intelligent, and visually premium experience.

Built using a **data-first + AI-enhanced architecture**, Requesta delivers role-based dashboards, real-time workflows, and actionable insights for Students, Faculty, Department Admins, and Super Admins.

---

# 🌟 Core Vision

Requesta is not just a request system — it is a **workflow intelligence platform**.

### 🎯 Objectives:

* Digitize institutional request processes (Leaves & Certificates)
* Provide **role-specific dashboards with real-time status tracking**
* Integrate **AI-assisted writing, validation, and decision support**
* Deliver **analytics-driven system insights instead of generic outputs**

---

# 🎨 Design Philosophy & UX

Requesta breaks away from traditional ERP systems using a **dark-mode-first SaaS design system**:

### ✨ Visual System

* **Glassmorphism UI:**
  `backdrop-blur-xl`, `bg-white/5`, layered gradients
* **Depth & Motion:**
  GSAP + Motion for fluid transitions and micro-interactions
* **Modern Typography:**
  Clean geometric font hierarchy
* **Color-coded Status System:**

  * 🟡 Pending
  * 🟣 Forwarded
  * 🟢 Approved
  * 🔴 Rejected

### ⚡ UX Highlights

* Smooth dashboard transitions
* Interactive cards & hover states
* Real-time feedback via toast notifications
* Minimal cognitive load with structured layouts

---

# 🧠 AI-Powered Intelligence Layer

Requesta integrates AI not as a gimmick, but as a **workflow accelerator**.

---

## 👨‍🎓 Student AI Tools

### ✍️ AI Request Assistant

* Converts casual input into **professional leave/certificate requests**
* Example:

  > "2 days leave for sister wedding" → fully structured formal request

---

### ✅ AI Validator Panel

* Detects:

  * vague reasons
  * missing details
  * unprofessional tone
* Returns:

  * issues
  * missing elements
  * improved version

---

## 🧑‍💼 Administrative AI Tools

### 🤖 Approval Suggestion Engine

* Evaluates:

  * reason clarity
  * duration
  * document presence
  * historical behavior
* Outputs:

  * Approve / Reject / Review
  * Confidence level
  * Justification

---

### 📊 AI System Insights (Upgraded)

> ⚠️ Unlike generic AI dashboards, Requesta uses a **Data-First + AI Interpretation model**

#### 🔍 Backend:

* MongoDB aggregations generate:

  * leave type distribution
  * student vs faculty trends
  * department-level activity
  * certificate demand analytics
  * approval/rejection ratios

#### 🧠 AI Role:

* Interprets structured data into:

```json
{
  "trends": [],
  "alerts": [],
  "suggestions": []
}
```

#### 🎯 Result:

* No vague outputs ❌
* Real analytics-driven insights ✅

---

# 🏗️ Role-Based Architecture

---

## 👨‍🎓 Student Dashboard

* Apply for:

  * Leave (Medical, Casual)
  * Certificates
* Track request lifecycle in real-time
* Receive instant notifications

---

## 👨‍🏫 Faculty Dashboard

* Apply for personal leaves
* Review student requests
* Forward requests to admin when needed

---

## 🏢 Department Admin Dashboard

* Full department visibility
* Approve/reject forwarded requests
* Access **department-level analytics**

---

## 🌐 Super Admin Console

* System-wide control
* Certificate authorization
* Global analytics across departments
* Monitor institutional workflow efficiency

---

# ⚙️ Tech Stack

| Category        | Technology      |
| --------------- | --------------- |
| Core UI         | React 19 + Vite |
| Styling         | Tailwind CSS v4 |
| Routing         | React Router v7 |
| Animations      | GSAP + Motion   |
| API Layer       | Axios           |
| Icons           | Lucide React    |
| Notifications   | React Toastify  |
| Document Viewer | react-pdf       |

---

# 🧩 Architecture Overview

### 🧠 Clean Separation of Concerns

```text
Frontend (React SPA)
   ↓
Backend API (Node.js / Express)
   ↓
AI Layer (Gemini / OpenRouter)
   ↓
MongoDB (Aggregations + Data)
```

---

## 📁 Project Structure

```text
src/
├── assets/
├── Components/
│   ├── Admin_Dashboard.jsx
│   ├── Student_Dashboard.jsx
│   ├── Loader.jsx
│   ├── FormComponents/
├── utils/
│   ├── GETAllStudents.js
│   ├── POSTLeaveApplication.js
│   ├── GETSystemInsights.js
├── App.jsx
├── main.jsx
```

---

## ⚡ Utils Layer Pattern

* API logic separated from UI
* Components remain clean and declarative
* Ensures scalability and maintainability

---

# 🛠️ Setup & Installation

### 1. Clone Repository

```bash
git clone <repository_url>
cd client/Requesta-Client
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment

Create `.env.local`:

```env
VITE_API_URL=http://localhost:5000
```

---

### 4. Run Development Server

```bash
npm run dev
```

---

### 5. Production Build

```bash
npm run build
```

---

# 🔐 Security & Best Practices

* API keys handled **only in backend**
* JWT-based authentication
* Protected routes via React Router
* Axios interceptors for secure requests

---

# 🚀 Key Innovations

### ✅ AI + Data Hybrid System

* AI does NOT guess
* AI interprets real data

---

### ✅ Role-Aware Intelligence

* Insights change based on user role

---

### ✅ Modular AI Architecture

* Generate
* Validate
* Suggest
* Analyze

---

### ✅ Startup-Grade UI/UX

* Not just functional — premium experience

---

# 📈 Future Enhancements

* 📊 Graph-based analytics (Recharts)
* 🔔 Real-time WebSocket notifications
* 📱 Mobile responsiveness optimization
* 🧠 AI anomaly detection for fraud
* ⚡ Caching AI responses for performance

---

# 🤝 Contribution

Contributions are welcome! Feel free to fork and improve Requesta.

---

# 📌 Final Note

Requesta is designed as a **modern alternative to legacy ERP systems**, combining:

* Clean UI
* Intelligent workflows
* Real analytics
* AI-powered productivity

> Built not just to function — but to scale.

---
