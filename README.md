# 🛍️ Full-Stack E-Commerce Web Application

A full-stack E-Commerce application built with React (Vite) on the frontend and Node.js, Express, and MongoDB on the backend. This project features user authentication, product management, dynamic shopping cart handling, and secure checkout features.

## 🌟 Features

- **User Authentication:** Login and Register workflows with JWT protection (`authController.js`, `authMiddleware.js`).
- **Product Management:** Browse products and view detailed product specs (`productController.js`, `ProductDetails.jsx`).
- **Cart & Checkout System:** Dynamic cart state management and checkout workflow (`CartPage.jsx`, `CheckoutPage.jsx`).
- **RESTful API Backend:** Modular routes for Auth, Products, and Orders with MongoDB integration.
- **Responsive UI:** Modern design styled with Tailwind CSS / CSS.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Routing & State:** React Router / Component State
- **HTTP Client:** Axios (`api.js`)
- **Styling:** CSS / Tailwind CSS

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (MongoDB Atlas cloud instance via Mongoose)
- **Middleware:** Custom Authentication Middleware (`authMiddleware.js`)

---

## 📁 Exact Project Structure

```text
ecommerce-store/
├── public/
│   └── vite.svg
├── server/
│   ├── config/
│   │   └── db.js                 # Database connection logic
│   ├── controllers/
│   │   ├── authController.js    # Auth logic (login, register)
│   │   ├── orderController.js   # Order processing logic
│   │   └── productController.js # Product CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT / Auth protection middleware
│   ├── models/
│   │   ├── Order.js             # Mongoose Order schema
│   │   ├── Product.js           # Mongoose Product schema
│   │   └── User.js              # Mongoose User schema
│   ├── routers/
│   │   ├── authRoutes.js        # Auth API endpoints
│   │   ├── orderRoutes.js       # Order API endpoints
│   │   └── productRoutes.js     # Product API endpoints
│   ├── .env                     # Environment variables (Mongo URI, Port)
│   ├── package.json             # Backend dependencies
│   ├── package-lock.json
│   ├── seeder.js                # Database seeder script
│   └── server.js                # Main server entry point
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Footer.jsx           # Global footer component
│   │   └── Navbar.jsx           # Navigation bar component
│   ├── pages/
│   │   ├── CartPage.jsx         # Shopping cart page
│   │   ├── CheckoutPage.jsx     # Checkout page
│   │   ├── Home.jsx             # Homepage displaying products
│   │   ├── Login.jsx            # User login page
│   │   ├── ProductDetails.jsx   # Single product view
│   │   └── Register.jsx         # User registration page
│   ├── services/
│   │   └── api.js               # Axios instance & API caller helpers
│   ├── App.css                  # Custom styling
│   ├── App.jsx                  # Main application component & routes
│   ├── index.css                # Base stylesheet
│   └── main.jsx                 # Vite React entry point
├── .gitignore
├── eslint.config.js             # ESLint configuration
├── index.html                   # Entry HTML template
├── package.json                 # Frontend dependencies
├── README.md                    # Project documentation
└── vite.config.js               # Vite build configuration
