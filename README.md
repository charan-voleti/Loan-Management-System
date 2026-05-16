# 🏦 Loan Management System (LMS)

A full-stack Loan Management System where borrowers can apply for loans and internal executives can manage loan processing workflows.

---

# 📌 Tech Stack

| Layer          | Technology                               |
| -------------- | ---------------------------------------- |
| Frontend       | React + Vite + TypeScript + Tailwind CSS |
| Backend        | Node.js + Express.js + TypeScript        |
| Database       | MongoDB + Mongoose                       |
| Authentication | JWT + bcrypt                             |

---

# 📁 Project Structure

```bash
lms/
├── frontend/
├── backend/
└── README.md
```

---

# ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lms
JWT_SECRET=secretkey
```

Run backend:

```bash
npm run dev
```

---

# ⚙️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🔐 Demo Login Credentials

| Role     | Email                                       | Password     |
| -------- | ------------------------------------------- | ------------ |
| Admin    | [admin@lms.com](mailto:admin@lms.com)       | Admin@123    |
| Sanction | [sanction@lms.com](mailto:sanction@lms.com) | Sanction@123 |
| Borrower | [borrower@lms.com](mailto:borrower@lms.com) | Borrow@123   |

---

# 🚀 Features Implemented

## Authentication

* User Signup
* User Login
* JWT Authentication
* Password hashing using bcrypt
* Protected Routes
* Role-Based Access Control (RBAC)

---

## Borrower Module

Borrower can:

* Apply for loans
* View own loans
* Upload salary slip
* Track loan status

---

## BRE (Business Rule Engine)

Loan eligibility validation includes:

* Age validation
* PAN card validation
* Salary validation
* Employment validation

---

## Loan Features

* Loan application
* Interest calculation
* Loan repayment calculation
* Loan status tracking

Loan Lifecycle:

```text
APPLIED → SANCTIONED → DISBURSED
```

Rejected Flow:

```text
APPLIED → REJECTED
```

---

## Sanction Module

Admin/Sanction users can:

* View applied loans
* Sanction loans
* Reject loans

---

## Disbursement Module

Admin users can:

* Mark sanctioned loans as disbursed

---

# 📂 File Upload

Supported Formats:

* PDF
* JPG
* PNG

Uploads handled using:

* Multer

---

# 🔒 Security Features

* JWT Authentication
* Password hashing
* Backend RBAC validation
* Protected APIs

---

# 📊 Database Models

## User

```text
name
email
password
role
```

## Loan

```text
borrower
loanAmount
tenureDays
interestAmount
status
salarySlip
```

---

# 🧮 Loan Calculation

Simple Interest Formula:

```text
SI = (P × R × T) / (365 × 100)
```

Interest Rate:

```text
12% per annum
```

---

# 🛠️ API Endpoints

## Auth

```http
POST /api/auth/signup
POST /api/auth/login
```

## Loans

```http
POST /api/loans/apply
GET /api/loans/my-loans
PATCH /api/loans/sanction/:loanId
PATCH /api/loans/reject/:loanId
PATCH /api/loans/disburse/:loanId
```

## Upload

```http
POST /api/uploads/salary-slip/:loanId
```

---

# ✅ Completed Modules

* Authentication
* Borrower Portal
* BRE Validation
* Loan Application
* Sanction Workflow
* Disbursement Workflow
* Salary Slip Upload
* RBAC

---

# ⚠️ Partial / Future Improvements

* Collection Module
* Sales Dashboard
* EMI Payment Tracking
* Analytics Dashboard
* Multi-Step Loan Form

---

# 👨‍💻 Author

Charan Voleti
