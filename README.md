# Role-Based Student ERP & Academic Workflow System

## 📌 Overview

The **Role-Based Student ERP & Academic Workflow System** is a full-stack web application designed to digitize and streamline academic administrative workflows in educational institutions. The system replaces manual, paper-based processes such as leave approvals and certificate requests with a secure, role-driven, and transparent digital platform.

This project demonstrates **real-world product architecture**, focusing on scalability, security, and clean separation of responsibilities across different user roles.

🔗 **Live Demo:** *[Add link]*
🔗 **GitHub Repository:** *[Add link]*

---

## 🎯 Key Objectives

* Digitize academic workflows end-to-end
* Implement strict **role-based access control (RBAC)**
* Provide real-time status tracking for requests
* Ensure secure authentication and authorization
* Build a scalable, production-ready MERN stack application

---

## 👥 User Roles & Responsibilities

### 1️⃣ Student

* Submit leave requests and certificate requests
* Upload supporting documents securely
* Track request status in real time (Pending / Approved / Rejected)
* View request history and responses

### 2️⃣ Faculty / Mentor

* Review student requests assigned to them
* Approve or reject requests with remarks
* Forward requests to higher authorities based on workflow hierarchy

### 3️⃣ Admin / HOD / Authority

* Final approval or rejection of requests
* View all requests across departments
* Manage users and enforce role permissions

Each role has **strictly enforced permissions**—users can only access actions and data relevant to their role.

---

## 🧠 System Architecture

The system follows a **client–server architecture**:

* **Frontend:** React.js (role-specific dashboards)
* **Backend:** Node.js + Express.js (RESTful APIs)
* **Database:** MongoDB (NoSQL, schema-based via Mongoose)
* **Authentication:** JWT-based stateless authentication

```
Client (React) → REST API (Express) → MongoDB
                ↑ JWT Authentication ↑
```

---

## 🔐 Authentication & Authorization

### Authentication

* Secure login using **JSON Web Tokens (JWT)**
* Tokens issued upon successful login
* Tokens validated on every protected API request

### Authorization (RBAC)

* Middleware-based role validation
* Fine-grained access control per route
* Prevents unauthorized data access and actions

Example:

* Students cannot approve requests
* Faculty cannot access admin-only endpoints

---

## 🔄 Academic Workflow Management

### Leave Request Workflow

1. Student submits leave request
2. Request assigned to Faculty/Mentor
3. Faculty reviews and forwards or rejects
4. Admin/HOD gives final approval
5. Status updates reflected in real time

### Certificate Request Workflow

1. Student submits certificate request with documents
2. Multi-level approval based on institution hierarchy
3. Secure storage and verification of uploaded files

All workflows are **hierarchical and configurable**, mimicking real academic approval chains.

---

## 📊 Role-Based Dashboards

Each user sees a **custom dashboard** based on their role:

### Student Dashboard

* New request submission forms
* Status tracker
* Request history

### Faculty Dashboard

* Pending approvals list
* Action buttons (Approve / Reject / Forward)
* Remarks and audit trail

### Admin Dashboard

* Global request overview
* Final decision controls
* System-wide visibility

Dashboards update dynamically to reflect real-time request changes.

---

## 📁 Document Upload & Validation

* Secure file uploads for certificates and proof documents
* Server-side validation for file type and size
* Files linked to specific requests
* Prevents unauthorized access to sensitive documents

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Role-based UI rendering
* Axios for API communication

### Backend

* Node.js
* Express.js
* RESTful API architecture

### Database

* MongoDB
* Mongoose ODM

### Security

* JSON Web Tokens (JWT)
* Role-Based Access Control (RBAC)

---

## 📦 API Design

* Clean RESTful endpoints
* Separate routes for auth, users, and requests
* Middleware for authentication and role validation

Example API Flow:

* `POST /auth/login`
* `POST /requests/create`
* `PUT /requests/:id/approve`
* `GET /requests/my-requests`

---

## 🚀 Installation & Setup

### Prerequisites

* Node.js
* MongoDB
* npm / yarn

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Create a `.env` file with:

```
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_uri
```

---

## 🧪 Features Implemented

* ✔ Role-based authentication & authorization
* ✔ Multi-level approval workflows
* ✔ Real-time request tracking
* ✔ Secure document uploads
* ✔ Scalable backend architecture

---

## 📈 Future Enhancements

* Notifications via email / WhatsApp
* Analytics dashboard for admins
* Integration with college ERP systems
* Audit logs and reporting

---

## 🎓 What This Project Demonstrates

* Real-world MERN stack development
* Secure backend design
* RBAC and workflow-based systems
* Production-focused thinking, not demo-level code

---

## 📬 Contact

If you’d like to discuss this project or collaborate:

**Aditya**
GitHub: *[your link]*
LinkedIn: *[your link]*

---

⭐ If you find this project useful, consider starring the repository!
