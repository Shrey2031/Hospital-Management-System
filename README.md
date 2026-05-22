# 🏥 Health Record Management System

A full-stack web application for secure management of patient health records, enabling seamless interaction between patients, doctors, and healthcare facilities — with role-based access, real-time messaging, and appointment booking.

🔗 **Live Demo:** [hospital-management-system-sigma-umber.vercel.app](https://hospital-management-system-1-g2qu.onrender.com)
📁 **GitHub:** [Shrey2031/Hospital-Management-System](https://github.com/Shrey2031/Hospital-Management-System)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Role-Based Access](#role-based-access)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## Overview

The Health Record Management System is designed to digitize and secure patient health records. Patients can book appointments, doctors can access patient history and medical reports, and healthcare facilities can register and manage their services — all within a unified, role-protected platform.

---

## ✨ Features

### 👤 Patient
- Register and log in securely
- View personal health records and reports
- Book appointments with available doctors
- Real-time messaging with doctors via Socket.IO
- Role-specific dashboard

### 👨‍⚕️ Doctor
- Access full patient history and uploaded reports
- Manage and view appointments
- Real-time chat with patients
- Role-specific dashboard

### 🏨 Facility (Hospital/Clinic)
- Register as a healthcare facility
- Manage doctors and departments
- View facility-level appointment data
- Role-specific dashboard

### 🔐 Security & Auth
- Passwords hashed with **bcrypt**
- Authentication via **JWT tokens**
- Role-based route protection (Patient / Doctor / Facility)
- Protected API endpoints

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| React Router | Client-side routing |
| Axios | HTTP client |
| Socket.IO Client | Real-time messaging |
| CSS / Tailwind | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| Socket.IO | Real-time bidirectional communication |
| JSON Web Tokens (JWT) | Authentication |
| bcrypt | Password hashing |

---

## 📁 Project Structure

```
Hospital-Management-System/
├── health-record-backend/
│   ├── controllers/        # Route handler logic
│   ├── middleware/         # JWT auth & role-check middleware
│   ├── models/             # Mongoose schemas (User, Doctor, Facility, Appointment)
│   ├── routes/             # Express route definitions
│   ├── socket/             # Socket.IO event handlers
│   ├── .env.example
│   └── server.js           # Entry point
│
└── health-record-frontend/
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Dashboard pages (Patient, Doctor, Facility)
    │   ├── context/        # Auth context / global state
    │   ├── routes/         # Protected route wrappers
    │   └── App.jsx
    └── public/
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/Shrey2031/Hospital-Management-System.git
cd Hospital-Management-System
```

### 2. Setup Backend

```bash
cd health-record-backend
npm install
cp .env.example .env    # Fill in your environment variables
npm start
```

### 3. Setup Frontend

```bash
cd health-record-frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (frontend) and `http://localhost:3000` (backend).

---

## 🔧 Environment Variables

Create a `.env` file in `health-record-backend/` with the following:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

---

## 🔐 Role-Based Access

The system uses JWT-based role authentication. On login, the server issues a token that includes the user's role (`patient`, `doctor`, or `facility`). The frontend reads this role and redirects to the appropriate dashboard.

| Role | Dashboard Route | Access |
|---|---|---|
| Patient | `/patient/dashboard` | Health records, appointments, messages |
| Doctor | `/doctor/dashboard` | Patient histories, reports, appointments |
| Facility | `/facility/dashboard` | Facility info, doctor management |

All protected backend routes validate the JWT token and check the role using middleware before processing the request.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/users/register` | Register a new user (patient/doctor/facility) |
| POST | `/api/v1/users/login` | Login and receive JWT |

### Patient
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/patient/records` | Get own health records |
| GET | `/api/patient/appointments` | View booked appointments |

### Doctor
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/doctor/patients` | View assigned patients |
| GET | `/api/doctor/patient/:id/history` | View a patient's full history |

### Appointments
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/appointments/book` | Book appointment (patient only) |
| GET | `/api/appointments/:id` | View appointment details |
| PATCH | `/api/appointments/:id/status` | Update status (doctor/facility) |

### Facility
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/facility/register` | Register a facility |
| GET | `/api/facility/doctors` | List doctors under facility |

---

## 💬 Real-Time Messaging (Socket.IO)

The app uses **Socket.IO** for real-time chat between patients and doctors.

Key events:
- `join_room` — User joins a chat room (keyed by appointment or user ID)
- `send_message` — Send a message to the room
- `receive_message` — Receive message in real time
- `disconnect` — Handle user disconnection

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ by [Shrey2031](https://github.com/Shrey2031)
