MERN Chat Application
MERN Stack Socket.io React Zustand

A full-featured real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) featuring end-to-end encryption, image sharing, and user authentication.

Live demo here: https://chat-app-wy80.onrender.com

Features
Backend Features
User Authentication: JWT-based login/signup with password hashing

Protected Routes: Middleware for securing API endpoints

Real-time Messaging: Socket.io for instant message delivery

Image Uploads: Cloudinary integration for profile pictures and chat images

Email Verification: OTP verification via Nodemailer

MVC Architecture: Clean separation of concerns

Firebase Notifications: Push notifications (planned feature)

Frontend Features
Modern UI: Responsive design with DaisyUI components

State Management: Zustand for efficient global state

Theming: Multiple themes with theme switcher

User Experience: Toast notifications, loading states, and error handling

User Management: Profile editing, user search

Tech Stack
Backend
Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JSON Web Tokens (JWT)

Real-time: Socket.io

Storage: Cloudinary

Email: Nodemailer

Middleware: Protected routes, error handling

Frontend
Framework: React.js

State Management: Zustand

Styling: Tailwind CSS with DaisyUI

Routing: React Router DOM

HTTP Client: Axios

Notifications: React Toastify

Icons: React Icons

Installation
Prerequisites
Node.js (v18+)

MongoDB Atlas account or local MongoDB installation

Cloudinary account

Email service credentials (Gmail or other SMTP service)

Backend Setup
Navigate to the backend directory:

bash
cd backend
Install dependencies:

bash
npm install
Create a .env file in the backend root with the following variables:

env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
OTP_EXPIRY_MINUTES=10
Start the development server:

bash
npm run dev
Frontend Setup
Navigate to the frontend directory:

bash
cd frontend
Install dependencies:

bash
npm install
Create a .env file in the frontend root:

env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
Start the development server:

bash
npm start
API Routes
Authentication Routes (/api/auth)
POST /register - User registration

POST /login - User login

GET /logout - User logout

GET /current-user - Get current user data

Message Routes (/api/messages)
POST / - Send a new message

GET /:chatId - Get messages for a specific chat

DELETE /:messageId - Delete a message

Verification Routes (/api/verify)
POST /send-otp - Send OTP to user's email

POST /verify-otp - Verify OTP

Implement group chat functionality

Add message read receipts

Integrate video calling feature

Implement message encryption

Add message reactions and replies

Develop mobile applications (React Native)

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a pull request
