# Requesta Client — Artificial Intelligence Command Center

![Requesta Banner](https://img.shields.io/badge/Status-Production_Ready-indigo?style=for-the-badge) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=Greensock&logoColor=white)

The **Requesta Client** is the highly-optimized, frontend graphical interface of the Requesta institutional platform. Built with a ruthless focus on premium executive aesthetics and real-time data visualization, it serves as the operational nexus for students to file documentation requests, and for administrative tiers to orchestrate approvals via intelligent, AI-augmented workflows.

Rather than relying on basic CRUD table generation, this application implements a full **Bento-Grid Command Center Layout**, utilizing hardware-accelerated animations and responsive glassmorphic design systems to construct a deeply immersive user experience.

---

## 🎨 Advanced UI & Design Architecture

### 1. High-Fidelity Glassmorphism & Adaptive Mesh Theming
The entirety of the Requesta platform is styled using a modern **glassmorphism** design system, heavily leveraging Tailwind's `/opacity` matrix paired with `backdrop-blur`.
Core components are overlaid on dynamically generated ambient mesh glows.
- **Dynamic Context Rendering:** Internal components, such as the `AIValidatorPanel`, are context-aware. They dynamically mount and inject stylistic classes that change the global color palette depending on specific student interactions. For instance, interacting with a standard **Leave of Absence Validation** casts Indigo drop-shadows and mesh glows. Interacting with a **Certificate Protocol** will seamlessly interpolate into Purple aesthetic models. 
- **GSAP DOM Orchestration:** Standard React state changes are supplemented with the GreenSock Animation Platform (`GSAP`). `GSAP` orchestrates timelines to manage staggering stagger effects, interpolation curves, and unmounting operations. This prevents the traditional "snapping" or layout thrashing native to heavy single-page application lifecycle rendering.

### 2. Categorized Bento-Grid Dashboards
Lengthy, unsorted arrays mapped into mundane HTML `<table>` elements have been universally deprecated. 
- Dashboard layouts are hydrated into responsive, mathematical **Bento-Grid layouts**.
- Categorical mappings parse raw numerical payloads to divide statistics between `Student Requests`, `Faculty Workflows`, `System Volumetrics`, and `Platform Security`.
- Differential analytics are computed directly on the frontend UI, allowing users to rapidly view actionable intelligence rather than raw JSON outputs.

---

## ⚙️ Core Technical Modules & Capabilities

### Decision Intelligence & AI Execution Models
Requesta intercepts standard forms before they ever reach the network layer, parsing user input into a local **Assistant Validator**.
- **Contextual Vagueness Flagging:** Identifies inputs that might be deemed "too informal" for an institutional repository.
- **Parametric Risk Calculators:** Calculates policy Risk (Low/Medium/High) by scanning date parameters over standard academic calendars.
- **Formal Generative Drafting:** Captures colloquial sentences ("I need to go home because I'm sick") and feeds them into a generation model that drafts a highly formal, corporate-ready letter explicitly tailored for institutional approval.

### Seamless Security & Stateful Authentication
- **Axios Interceptors:** Uses localized singleton configurations to catch 401 unauthenticated headers, gracefully routing users to secure logon ports without breaking application flow.
- **Session Boundaries:** Granularly guarded context arrays are implemented. A Student token attempting to fetch a URL strictly bound to the `SystemInsightsPanel` triggers immediate eviction. 
- **OTP Extirpation:** Previously faulty, asynchronous "Get Email OTP" systems have been entirely severed from the application logic. The authentication layer operates strictly on an immediate, hyper-secure password hashing schema against the backend database, ensuring frictionless environment transition and 100% login accessibility.

---

## 📂 Exhaustive Directory Structure

```text
src/
├── assets/                     # Immutable SVGs, high-res PNGs, institutional branding
├── Components/                 # The physical UI Library
│   ├── AIValidatorPanel.jsx    # Handles generative drafting context displays
│   ├── SystemInsightsPanel.jsx # Parses Super Admin analytics into the Bento-Grid
│   ├── Admin_Dashboard.jsx     # Handles conditional formatting based on active Admin Role
│   ├── Student_Login.jsx       # Stripped, pure-credential execution environment
│   └── ChangePassword.jsx      # Safe-zone credential resetting utilities
├── templates/                  # Reusable, unstyled component frames
├── utils/                      # Asynchronous Network Layer and API Calls
│   ├── GETAdminDashBoard.js
│   ├── GETStudentDashBoard.js
│   ├── UPDATEPassword.js       # Secured via oldPassword check
│   └── ...                     # Axios promises decoupling network fetching from UI presentation
├── App.jsx                     # Global browser-routing matrix via react-router-dom
├── main.jsx                    # Core DOM mounting process
└── index.css                   # Global Tailwind layer imports + Webkit animation overrides
```

---

## 🚀 Deployment & Operations Lifecycle

### System Prerequisites
Ensure your build environment is capable of deploying Vite compilation architectures.
- Protocol: `HTTPS` over standard TCP/IP.
- Node.js >= `v18.0.0`
- NPM >= `v9.0.0` or Yarn equivalents.

### Development Instantiation
1. Clone the repository and navigate explicitly to the frontend envelope:
   ```bash
   cd client/Requesta-Client
   ```
2. Rehydrate the `node_modules` dependency tree:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Boot the Vite Development Server locally on Port 5173 with HMR (Hot Module Replacement) enabled:
   ```bash
   npm run dev
   ```

### Production Compilation
Execute the Rollup build chain to optimize, chunk, and tree-shake the application code for static deployments.
```bash
npm run build
```
Verify the static payload executes correctly utilizing Vite's preview module:
```bash
npm run preview
```

## 🌐 Environment Variables
A `.env` schema must be provided in the root `Requesta-Client` directory. Failing to inject `VITE_API_URL` will cause `Axios` instances to fault on `undefined` fetch strings.

| Variable | Type | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `string(URL)` | The fully qualified root endpoint pointing to the Requesta Express server. Example: `https://requesta-server.onrender.com`. Do NOT append trailing slashes. |

---
**Maintained by the Requesta Engineering Team**
