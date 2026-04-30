# Job Portal Web Application (MERN Stack)

## 📌 Project Overview

The Job Portal Web Application is a full-stack recruitment platform developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It connects job seekers and employers on a single platform, making the hiring and job application process simple, fast, and efficient.

Job seekers can search and apply for jobs, create profiles, and upload resumes, while employers can post jobs, manage listings, and review applications through a dedicated dashboard.

---

## 🚀 Features

### 👨‍💼 Job Seekers

* User registration and secure login
* Create and manage profile
* Browse and search job listings
* Apply for jobs online
* Upload and download resumes

### 🏢 Employers

* Employer registration and authentication
* Post, edit, and delete job listings
* View and manage job applications
* Company profile management

### 🔐 General Features

* Role-based authentication (JWT)
* Responsive UI
* RESTful APIs
* Secure password hashing
* Scalable architecture

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* HTML5, CSS3, JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Tools & Libraries

* JWT (Authentication)
* bcrypt (Password Hashing)
* Axios (API Calls)
* Git & GitHub (Version Control)

---

## 📂 Project Structure

```
Job-Portal-App/
│
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/          # Node.js backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/job-portal-mern.git
cd job-portal-mern
```

### 2️⃣ Install Backend Dependencies

```
cd server
npm install
npm run dev
"@sentry/node": "^10.43.0",
    "@sentry/profiling-node": "^10.43.0",
    "bcrypt": "^6.0.0",
    "cloudinary": "^2.9.0",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.3.0",
    "multer": "^2.1.1",
    "nodemon": "^3.1.14",
    "svix": "^1.88.0"
```

### 3️⃣ Install Frontend Dependencies

Open a new terminal:

```
cd client
npm install
npm run dev
```

---

## 🌐 Running the App

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:5000](http://localhost:5000)

Make sure MongoDB is running locally or connected via MongoDB Atlas.

---

## 🔒 Environment Variables

Create a `.env` file inside the `server` folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 📸 Screenshots

(Add screenshots of your application here)

---

## 📈 Future Enhancements

* Job recommendations 
* Admin dashboard
* Email notifications
* Application status tracking
* Resume parsing

---

## 🤝 Contribution

Contributions are welcome. Fork the repository, create a new branch, and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Shahroz Malik**
Software Engineering Student | MERN Stack Developer

---

⭐ If you
