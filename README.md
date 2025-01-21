# Library Management System

## Overview

The **Library Management System** is a web-based application for managing the library of the Computer Science Engineering department. It allows users (students and teachers) to request, return, and search books, view book details, manage their profiles, and interact with library events. The librarian, as the admin, can manage books, approve/reject book requests, and perform various administrative tasks like adding events and users.

### Key Features

#### **Admin (Librarian) Features:**

- **Create, Update, Delete Books:** Manage library books.
- **Manage User Profiles:** Update and block users as necessary.
- **Create Events:** Add library-related events for users.
- **Approve/Reject Book Requests:** Approve or reject book issue requests.
- **Make New Admin:** Assign admin privileges to users.
- **Book History:** View detailed book history and transactions.
- **Feedback & Reviews:** View and manage user feedback and reviews.

#### **User (Student/Teacher) Features:**

- **Request/Return Books:** Request books or return borrowed ones.
- **View Book Details:** Search and see book information.
- **Profile Management:** View and update personal profile.
- **View Requested Books:** Track and manage requested books.
- **Cancel Book Request:** Cancel a book request if needed.
- **View History:** See book issue history.
- **Add Feedback & Reviews:** Provide feedback and review books.
- **Attend Events:** Participate in library events.
- **Search and Filter Books:** Search books by name, semester, and filter based on availability.
- **Read PDFs:** Open and read books in PDF format directly within the application.

## Technologies Used

- **Frontend:** React, Bootstrap, React Router, React Hook Form, React Toastify
- **Backend:** Node.js, Express.js, MySQL, JWT Authentication, Nodemailer
- **PDF Viewer:** React PDF Viewer, PDF.js
- **Authentication:** JWT (JSON Web Tokens), Bcrypt for password hashing
- **Others:** Axios, Moment.js, Multer (for file uploads), React Bootstrap, Chart.js, Recharts
