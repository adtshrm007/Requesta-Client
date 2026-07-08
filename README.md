# ?? Requesta — Client

> **Requesta** is an AI-powered academic request management system. This is the **frontend application** built with React 19 + Vite and styled with Tailwind CSS v4. It provides a rich, role-aware interface for students and admins to manage leave requests, certificate applications, and system analytics.

---

## ?? Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Component Overview](#-component-overview)
- [API Utilities (utils/)](#-api-utilities-utils)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Environment](#-environment)
- [Deployment](#-deployment)

---

## ? Features

- ?? **Dual Authentication** — Separate login flows for Students and Admins
- ?? **Leave Management** — Students submit, admins approve/reject/forward through a multi-stage pipeline
- ?? **Certificate Requests** — Students request academic certificates; Super Admin issues them
- ?? **AI Assistant Panel** — AI-powered request drafting and quality validation for all users
- ?? **AI Validator Panel** — Real-time content scoring and feedback before submission
- ? **AI Approval Suggestions** — Admins receive intelligent approve/reject/forward recommendations
- ?? **Analytics Dashboard** — Rich charts showing approval rates, trends, department breakdowns, and decision intelligence
- ?? **System Insights Panel** — AI-generated narrative analysis of system health and trends
- ??? **Fraud Badge** — Visual indicator for suspicious or duplicate leave patterns
- ?? **Notifications** — Real-time status updates for students and admins
- ?? **Admin Hierarchy Views** — Browse Faculty, Departmental Admins, and manage admin accounts
- ??? **File Upload** — Attach supporting documents (PDFs, images) to leave/certificate requests
- ?? **Responsive Design** — Optimized for desktop and mobile screens
- ?? **Dark Mode UI** — Premium dark-themed interface with glassmorphism and smooth animations

---

## ??? Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| Charts | Recharts |
| Animations | GSAP, Framer Motion (@react-spring/web) |
| Icons | Lucide React |
| Notifications | React Toastify |
| PDF Viewer | react-pdf, pdfjs-dist |
| Scroll | react-scroll |
| Linting | ESLint 9 |

---

## ?? Project Structure

```
Requesta-Client/
+-- index.html                  # HTML entry point
+-- vite.config.js              # Vite + Tailwind CSS plugin config
+-- package.json
+-- eslint.config.js
+-- vercel.json                 # Vercel deployment config (SPA rewrite rules)
¦
+-- public/                     # Static assets
¦
+-- src/
    +-- main.jsx                # App entry — BrowserRouter + all route definitions
    +-- App.jsx                 # Landing page composition (Header, TagLine, etc.)
    +-- index.css               # Global styles
    +-- App.css
    ¦
    +-- assets/                 # Images and static media
    ¦
    +-- Components/             # All React components (pages + UI)
    ¦   +-- Landing Page
    ¦   ¦   +-- Header.jsx
    ¦   ¦   +-- TagLine.jsx
    ¦   ¦   +-- MainSection.jsx
    ¦   ¦   +-- Start_Section.jsx
    ¦   ¦   +-- Footer.jsx
    ¦   ¦
    ¦   +-- Auth
    ¦   ¦   +-- Student_Login.jsx
    ¦   ¦   +-- Student_Registration.jsx
    ¦   ¦   +-- Admin_Login.jsx
    ¦   ¦
    ¦   +-- Student Views
    ¦   ¦   +-- Student_Dashboard.jsx
    ¦   ¦   +-- Student_Profile.jsx
    ¦   ¦   +-- Student_RequestForm.jsx
    ¦   ¦   +-- Notifications.jsx
    ¦   ¦   +-- ChangePassword.jsx
    ¦   ¦
    ¦   +-- Admin Views
    ¦   ¦   +-- Admin_Dashboard.jsx
    ¦   ¦   +-- Admin_Profile.jsx
    ¦   ¦   +-- AddAdmin.jsx
    ¦   ¦   +-- OtherAdmins.jsx
    ¦   ¦   +-- Students.jsx
    ¦   ¦   +-- AdminLeaves.jsx
    ¦   ¦   +-- AdminLeaveNotifications.jsx
    ¦   ¦   +-- NotificationsAndRequests.jsx
    ¦   ¦   +-- NotificationsForAdmin.jsx
    ¦   ¦   +-- ChangeAdminPassword.jsx
    ¦   ¦
    ¦   +-- AI Features
    ¦   ¦   +-- AIAssistantPanel.jsx
    ¦   ¦   +-- AIValidatorPanel.jsx
    ¦   ¦   +-- ApprovalAISuggestion.jsx
    ¦   ¦   +-- SystemInsightsPanel.jsx
    ¦   ¦
    ¦   +-- Analytics
    ¦   ¦   +-- AnalyticsDashboard.jsx
    ¦   ¦
    ¦   +-- Shared
    ¦       +-- ActivityTimeline.jsx
    ¦       +-- FraudBadge.jsx
    ¦       +-- Loader.jsx
    ¦
    +-- utils/                  # Axios API call modules (40+ files)
        +-- GET*.js             # Data fetching utilities
        +-- POST*.js            # Data submission utilities
        +-- UPDATE*.js          # Data update utilities
```

---

## ??? Pages & Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` | `App` (Landing) | Public |
| `/studentlogin` | `Student_Login` | Public |
| `/studentregister` | `Student_Registration` | Public |
| `/adminlogin` | `Admin_Login` | Public |
| `/studentdashboard` | `Student_Dashboard` | Student |
| `/studentprofile` | `Student_Profile` | Student |
| `/notifications` | `Notifications` | Student |
| `/changepassword` | `ChangePassword` | Student |
| `/admindashboard` | `Admin_Dashboard` | Admin |
| `/adminprofile` | `Admin_Profile` | Admin |
| `/students` | `Students` | Admin |
| `/addadmin` | `AddAdmin` | Admin |
| `/otherAdmins` | `OtherAdmins` | Admin |
| `/notificationsAndrequests` | `NotificationsAndRequest` | Admin |
| `/notificationsforadmin` | `NotificationsForAdmin` | Admin |
| `/changeadminpassword` | `ChangeAdminPassword` | Admin |
| `/adminleaves` | `AdminLeaves` | Admin |
| `/adminleavenotifications` | `AdminLeaveNotifications` | Admin |
| `/analytics` | `AnalyticsDashboard` | Admin |

---

## ?? Component Overview

### ?? Landing Page
| Component | Description |
|-----------|-------------|
| `Header.jsx` | Navigation bar with logo and quick-access links |
| `TagLine.jsx` | Animated hero section with GSAP/Motion animations |
| `MainSection.jsx` | Feature highlights and product overview |
| `Start_Section.jsx` | CTA section directing users to register or login |
| `Footer.jsx` | Links, branding, and contact info |

### ?? Auth
| Component | Description |
|-----------|-------------|
| `Student_Login.jsx` | Student login form with JWT token handling |
| `Student_Registration.jsx` | New student onboarding with form validation |
| `Admin_Login.jsx` | Admin login with role-based redirect |

### ????? Student Features
| Component | Description |
|-----------|-------------|
| `Student_Dashboard.jsx` | Overview of leave/certificate status, recent activity |
| `Student_Profile.jsx` | View and edit student profile |
| `Student_RequestForm.jsx` | Submit new leave/certificate request with AI assistance |
| `Notifications.jsx` | List of status updates for the logged-in student |
| `ChangePassword.jsx` | Secure password change with OTP verification |

### ????? Admin Features
| Component | Description |
|-----------|-------------|
| `Admin_Dashboard.jsx` | Stats panel, pending requests, quick actions |
| `Admin_Profile.jsx` | Admin profile editor with leave quota display |
| `AddAdmin.jsx` | Create new Faculty or Departmental Admin accounts |
| `OtherAdmins.jsx` | Browse admins in the hierarchy |
| `Students.jsx` | Search and view all registered students |
| `AdminLeaves.jsx` | Admin's own leave history and new leave submission |
| `AdminLeaveNotifications.jsx` | Pending leave requests assigned to this admin |
| `NotificationsAndRequests.jsx` | Unified view of student leave and certificate requests |
| `NotificationsForAdmin.jsx` | Admin-level notification feed |
| `ChangeAdminPassword.jsx` | Admin password change with OTP verification |

### ?? AI Features
| Component | Description |
|-----------|-------------|
| `AIAssistantPanel.jsx` | Floating panel to draft formal request text via AI |
| `AIValidatorPanel.jsx` | Real-time quality scoring (0–100) with fix suggestions |
| `ApprovalAISuggestion.jsx` | One-click AI approval recommendation for admins |
| `SystemInsightsPanel.jsx` | Narrative AI analysis of system-wide request trends |

### ?? Analytics
| Component | Description |
|-----------|-------------|
| `AnalyticsDashboard.jsx` | Full analytics suite — approval rates, time series, top applicants, department breakdown, decision intelligence |

### ?? Shared / Utility
| Component | Description |
|-----------|-------------|
| `ActivityTimeline.jsx` | Visual audit trail for request actions |
| `FraudBadge.jsx` | Badge shown on suspicious/duplicate requests |
| `Loader.jsx` | Global loading spinner |

---

## ?? API Utilities (`utils/`)

All HTTP calls are abstracted into individual utility modules using Axios. Tokens are read from `localStorage` and attached as `Authorization: Bearer <token>` headers.

### GET Utilities
| File | Description |
|------|-------------|
| `GETstudentData.js` | Fetch logged-in student profile |
| `GETAdminData.js` | Fetch logged-in admin profile |
| `GETStudentDashBoard.js` | Student dashboard aggregated data |
| `GETAdminDashBoard.js` | Admin dashboard statistics |
| `GETAllStudents.js` | List all students (admin) |
| `GETAllLeaves.js` | All leave requests (faculty view) |
| `GETLeavesForAStudent.js` | Leaves for a specific student |
| `GETLeavesForSuperAdmin.js` | All leaves (super admin view) |
| `GETLeavesForDepartmentalAdmin.js` | Forwarded leaves for dept admin |
| `GETLeavesOfAStudentForAdmin.js` | Student leaves from admin perspective |
| `GETAdminLeaves.js` | Admin's own leave history |
| `GETFacultyLeaves.js` | Faculty leaves pending dept admin action |
| `GETDepartmentalAdminLeaves.js` | Dept admin leaves pending super admin action |
| `GETAllCertificateRequests.js` | All certificate requests (super admin) |
| `GETCertificatesForAStudent.js` | Student's own certificates |
| `GETCertificateOfAStudentForAdmin.js` | Certificates from admin perspective |
| `GETOtherAdminsData.js` | Other admins in the hierarchy |
| `GETDepartmentalAdmin.js` | Departmental admin list |
| `GETAnalytics.js` | Summary analytics |
| `GETAdvancedAnalytics.js` | Advanced analytics |
| `GETDecisionIntelligence.js` | Decision intelligence data |
| `GETLeaveInsights.js` | Leave insights for system panel |
| `GETSystemInsights.js` | AI system insights trigger |
| `GETAuditLogs.js` | Fetch audit logs for a request |
| `GETFraudCheck.js` | Fetch fraud/anomaly indicators |

### POST Utilities
| File | Description |
|------|-------------|
| `POSTstudentData.js` | Student login |
| `POSTAdminData.js` | Admin login |
| `POSTLeaveApplication.js` | Submit student leave request |
| `POSTAdminLeaveApplication.js` | Submit admin leave request |
| `POSTCertificateApplication.js` | Submit certificate request |
| `POSTAIGenerateRequest.js` | AI-generate formal request text |
| `POSTAIValidate.js` | AI-validate request quality |
| `POSTAIApprovalSuggestion.js` | AI approval suggestion for admin |

### UPDATE Utilities
| File | Description |
|------|-------------|
| `UPDATEstudents.js` | Update student profile |
| `UPDATEAdmin.js` | Update admin profile |
| `UpdateLeaveStatus.js` | Update student leave status |
| `UPDATEAdminLeaves.js` | Update admin leave status |
| `UPDATECertificateStatus.js` | Update certificate status |
| `UPDATEPassword.js` | Change student password |
| `ChangeAdminPassword.js` | Change admin password |

---

## ?? Getting Started

### Prerequisites

- Node.js **>= 18.0.0** (Vite 7 requirement)
- The Requesta backend server running at `http://localhost:3000` (or set your API URL)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd Requesta-Client

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## ?? Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |

---

## ?? Environment

The client communicates with the backend API. By default, the API base URL is configured in the individual `utils/*.js` files. To change the backend URL (e.g., for production), update the base URL in your utility files or introduce a `.env` variable:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

Then in utility files:
```js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
```

---

## ?? Deployment

The client is deployed to **Vercel**.

The `vercel.json` file includes SPA rewrite rules to ensure React Router works correctly with direct URL navigation:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Build & Deploy

```bash
# Build the app
npm run build

# Deploy using Vercel CLI
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments on every push.

**Production URL:** `https://requesta-client.vercel.app`

---

## ?? Version

**Requesta Client v0.0.0** (React 19 + Vite 7)
