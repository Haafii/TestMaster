# TestMaster

TestMaster is a web application designed to manage online tests. The application allows teachers to create and assign tests to students. Students can take the assigned tests, and teachers can evaluate the submissions.

## Project Overview

The application is built using:

- **Front-End:** React (Vite) with TailwindCSS for styling
- **Back-End:** Node.js (Express) with MongoDB as the database

## Features

- Teacher and Student authentication
- Teachers can create and manage tests
- Students can view and take assigned tests
- Teachers can evaluate student submissions

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later)
- **MongoDB** (local or cloud instance)

## Installation

### 1. Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/Haafii/TestMaster
cd testmaster
```

### 2. Set Up the Backend

Navigate to the backend directory and install the required dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and add your MongoDB connection string and other environment variables:

```dotenv
MONGO_URI=mongodb://localhost:27017/testmaster
JWT_SECRET=your_jwt_secret
```

### 3. Set Up the Frontend

Navigate to the frontend directory and install the required dependencies:

```bash
cd ../frontend
npm install
```

### 4. Configure TailwindCSS

Ensure TailwindCSS is properly configured in `frontend/tailwind.config.js`:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B2B2B",
        secondary: "#3B3B3B",
        'custom-black': '#141721',
        'custom-black-light': 'rgba(20, 23, 33, 0.8)',
      },
    },
  },
  plugins: [],
};
```

Add the Tailwind directives to your `frontend/src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Running the Application

### 1. Start the Backend Server

Navigate to the backend directory and start the server:

```bash
cd backend
nodemon start
```

The backend server should now be running on http://localhost:5000.

### 2. Start the Frontend Development Server

Navigate to the frontend directory and start the development server:

```bash
cd ../frontend
npm run dev
```

The frontend development server should now be running on http://localhost:3000.

## Folder Structure

```
testmaster/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Test.js
│   │   └── Submission.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── testRoutes.js
│   │   └── submissionRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── .env
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

## Usage

### Teacher

- **Login:** Teachers can log in using their credentials.
- **Create Test:** Teachers can create tests by adding questions (multiple-choice, short answer, essay).
- **Assign Test:** Assign tests to students.
- **Evaluate Submissions:** View and evaluate student submissions.

### Student

- **Login:** Students can log in using their credentials.
- **View Assigned Tests:** View tests assigned by teachers.
- **Take Test:** Complete and submit tests.
