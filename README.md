# Mini CRM

A Mini CRM (Customer Relationship Management) web application built using **HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB**. This project allows users to manage customer leads with full CRUD operations.

---

## 🚀 Features

- Add new customer leads
- View all leads
- Update existing leads
- Delete individual leads
- Delete all leads
- Search leads by name or email
- Filter leads by status
- Dashboard statistics
- Export leads to CSV
- Responsive user interface
- MongoDB database integration
- REST API using Express.js

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

### Clone the repository

```bash
git clone https://github.com/Mohammad-Raziuddin15/FUTURE_FS_02.git
```

### Navigate to the project

```bash
cd mini-crm
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/miniCRM
```

### Start MongoDB

Make sure MongoDB is running.

### Run the backend

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 📌 API Endpoints

### Add Lead

```
POST /api/leads/add
```

### Get All Leads

```
GET /api/leads/all
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

## 📊 Project Features

- Customer Lead Management
- Dashboard Analytics
- Search Functionality
- Status Filter
- CRUD Operations
- CSV Export
- Local MongoDB Database
- Responsive Design

---

## 👨‍💻 Author

**Mohammad Raziuddin**

GitHub:
https://github.com/Mohammad-Raziuddin15

LinkedIn:
https://www.linkedin.com/in/mohammad-raziuddin-4a49b3305

---

## 📄 License

This project is developed for educational and internship purposes.