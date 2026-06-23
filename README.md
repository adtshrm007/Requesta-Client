# Requesta Client

The frontend web application for the **Requesta** institutional management platform. Built for students, faculty, and administrators to seamlessly manage leave of absence applications, certificate requests, and institutional analytics.

## What This Project Does

The Requesta Client is a highly interactive, dashboard-based application that serves distinct user roles:

- **Student Portal**: Students can submit formal leave applications and certificate requests. They can view the real-time status of their applications (Pending, Approved, Rejected) and track their historical records.
- **AI Request Assistant**: Students who are unsure how to write a formal letter can input a brief, informal reason. The integrated AI (`AIValidatorPanel`, `AIAssistantPanel`) automatically expands this into a professionally drafted institutional letter.
- **Administrator & Faculty Dashboards**: Departmental and Super Admins have access to comprehensive grid-based dashboards (`Admin_Dashboard`, `AnalyticsDashboard`). They can review incoming requests, manage other faculty members, and view activity timelines.
- **AI-Powered Admin Tools**: Admins receive AI-generated insights (`SystemInsightsPanel`) on institutional trends, AI suggestions (`ApprovalAISuggestion`) on whether to approve specific requests based on historical data, and fraud detection badges (`FraudBadge`) for suspicious applications.

## How It Is Built

The frontend is built using a modern, high-performance web stack:

- **Core Framework**: **React 19** and **Vite 7** for rapid development, fast hot-module replacement, and highly optimized production builds.
- **Styling**: **Tailwind CSS v4** is used for a responsive, modern "glassmorphism" UI design that looks great on mobile and desktop.
- **Animations**: **GSAP**, **Framer Motion**, and **React Spring** are utilized extensively to provide smooth page transitions, dynamic mesh backgrounds, and interactive feedback.
- **Data Fetching**: **Axios** is used to make secure HTTP requests to the backend API, with interceptors to handle authentication tokens.
- **Routing**: **React Router DOM v7** manages secure, protected navigation, ensuring students cannot access admin pages and vice versa.
- **Data Visualization**: **Recharts** is used to render the visual analytics and interactive graphs on the Admin Dashboard.
- **Document Viewing**: `react-pdf` and `pdfjs-dist` allow users to view uploaded certificates and documents natively without leaving the browser.

## Architecture

- **Client-Server Separation**: The React app is fully decoupled from the backend. It handles all UI rendering and local state, only interacting with the backend via REST APIs.
- **Component-Based Structure**: The UI is divided into modular, reusable components inside `src/Components/` (e.g., separate files for login forms, dashboards, and AI panels).
- **Decoupled Network Layer**: All API calls are extracted into individual files inside the `src/utils/` folder (e.g., `POSTLeaveApplication.js`, `GETAnalytics.js`), keeping the React components clean and focused strictly on the UI.

## Benefits for the User

- **For Students**: Removes the stress of writing formal letters and provides immediate transparency on the status of their requests.
- **For Admins**: Replaces tedious spreadsheet rows with visual analytics. Deep AI insights help identify trends (e.g., sudden spikes in leave requests), while fraud detection features protect the institution.

## Getting Started

### Prerequisites
- Node.js (v18+)

### Installation & Setup
1. Navigate to the client directory:
   ```bash
   cd client/Requesta-Client
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the client folder with the following:
   ```env
   VITE_API_URL=http://localhost:5000  # URL of your Express backend
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
