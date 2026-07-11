# Mini CRM

A **Mini CRM (Customer Relationship Management)** web application built using **HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB**. This project helps users manage customer leads with complete CRUD (Create, Read, Update, Delete) functionality through a modern and responsive interface.

---

## 🚀 Features

- Add New Leads
- View All Leads
- Update Existing Leads
- Delete Individual Leads
- Delete All Leads
- Search Leads by Name or Email
- Filter Leads by Status
- Dashboard Statistics
- Export Leads to CSV
- Responsive User Interface
- REST API Integration
- MongoDB Database Support

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (ES6)
- Font Awesome

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### API Testing
- Postman

---

## 📂 Project Structure

```
mini-crm/
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   └── Lead.js
│   │
│   ├── routes/
│   │   └── leadRoutes.js
│   │
│   └── server.js
│
├── index.html
├── style.css
├── script.js
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone  https://github.com/Mohammad-Raziuddin15/FUTURE_FS_02.git
```

### Navigate to Project

```bash
cd YOUR_REPOSITORY_NAME
```

### Install Dependencies

```bash
npm install
```

### Create `.env` File

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/miniCRM
```

### Start MongoDB

Make sure the MongoDB service is running.

### Start Backend Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 📌 API Endpoints

### Get All Leads

```
GET /api/leads/all
```

### Add Lead

```
POST /api/leads/add
```

### Update Lead

```
PUT /api/leads/:id
```

### Delete Lead

```
DELETE /api/leads/:id
```

### Delete All Leads

```
DELETE /api/leads/delete-all
```

---

## 🌐 Live Demo

### Frontend

```
https://mohammad-raziuddin15.github.io/YOUR_REPOSITORY_NAME/
```

### Backend API

```
http://localhost:5000
```

---

## 📊 Project Features

- Customer Lead Management
- Dashboard Analytics
- Search Functionality
- Status Filter
- CRUD Operations
- CSV Export
- MongoDB Database Integration
- RESTful API
- Responsive Design

---

## 👨‍💻 Author

**Mohammad Raziuddin**


---

## 📄 License

This project is created for educational and internship purposes under the **Future Interns Full Stack Web Development Internship Program**.