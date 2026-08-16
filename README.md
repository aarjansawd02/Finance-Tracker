# 💰 Finance Tracker

A full-stack **MERN Finance Tracker** application for managing personal finances. Users can securely register and log in, manage income and expenses, organize transactions by categories, and view financial summaries through a dashboard.

## 🚀 Features

### 🔐 Authentication

* User registration
* User login
* Password hashing with bcrypt
* JWT-based authentication
* Protected routes
* Secure user-specific data access

### 💳 Transaction Management

* Create transactions
* View transactions
* Update transactions
* Delete transactions
* Track income and expenses
* Associate transactions with categories

### 🏷️ Category Management

* Create categories
* View categories
* Update categories
* Delete categories
* User-specific categories

### 📊 Dashboard

* Total balance
* Total income
* Total expenses
* Financial summary
* Category-based breakdown
* Aggregated financial data using MongoDB

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* JavaScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS

## 📁 Project Structure

```text
Finance_Tracker/
│
├── Backend/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   ├── dashboard.controller.js
│   │   └── transaction.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── category.model.js
│   │   └── transaction.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   ├── dashboard.routes.js
│   │   └── transaction.routes.js
│   │
│   ├── services/
│   │   ├── category.service.js
│   │   ├── dashboard.service.js
│   │   └── transaction.service.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── validators/
│   │   ├── category.validator.js
│   │   └── transaction.validator.js
│   │
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── routes/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/aarjansawd02/Finance-Tracker.git
cd Finance-Tracker
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `Backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never commit your `.env` file to GitHub. It is already excluded through `.gitignore`.

### 4. Start the backend

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## 🔑 Authentication Flow

The application uses JWT authentication.

```text
User
 │
 ├── Register
 │      ↓
 │   Backend
 │      ↓
 │   Password hashed
 │      ↓
 │   MongoDB
 │
 └── Login
        ↓
     JWT Token
        ↓
     Frontend
        ↓
   Protected API Requests
```

Protected backend routes verify the JWT before allowing access to user-specific data.

## 📡 API Overview

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Categories

| Method | Endpoint              | Description     |
| ------ | --------------------- | --------------- |
| POST   | `/api/categories`     | Create category |
| GET    | `/api/categories`     | Get categories  |
| GET    | `/api/categories/:id` | Get a category  |
| PUT    | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

### Transactions

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| POST   | `/api/transactions`     | Create transaction |
| GET    | `/api/transactions`     | Get transactions   |
| GET    | `/api/transactions/:id` | Get transaction    |
| PUT    | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

### Dashboard

| Method | Endpoint         | Description                     |
| ------ | ---------------- | ------------------------------- |
| GET    | `/api/dashboard` | Get financial dashboard summary |

## 🔒 Security

The application includes:

* JWT authentication
* Password hashing with bcrypt
* Protected API routes
* User-specific database queries
* Environment variables for secrets
* Request validation
* CORS configuration

Sensitive files such as `.env` and `node_modules` are excluded from version control.

## 🧪 Development

Backend:

```bash
cd Backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

## 📌 Future Improvements

Potential future features include:

* [ ] Monthly financial reports
* [ ] Advanced transaction filtering
* [ ] Date-range filtering
* [ ] Data visualization and charts
* [ ] Export transactions to CSV/PDF
* [ ] Recurring transactions
* [ ] Budget management
* [ ] Dark mode
* [ ] Responsive/mobile improvements
* [ ] Deployment

## 👨‍💻 Author

**Aarjan Sawd**


### GitHub

https://github.com/aarjansawd02

---

⭐ If you find this project useful, consider giving it a star!
