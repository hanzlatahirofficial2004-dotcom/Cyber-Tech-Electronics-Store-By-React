# Cyber Tech Electronics Store 🛒⚡
--------------------<img width="701" height="868" alt="image" src="https://github.com/user-attachments/assets/c3e8ab36-9e58-45da-a64d-a14db12ff28a" />


A feature-rich, fully responsive, and highly interactive modern E-Commerce web application built using **React.js**, **React Router**, and **Context API**. 

This platform delivers a complete online tech store experience—featuring dynamic product fetching via RESTful APIs, real-time cart state management, wishlist controls, and an advanced **3-Step Checkout System** (Address Management, Shipment Selection, and Interactive Card Payment Gateway).

---

## 🌟 Key Features

### 🛍️ Core Shopping Experience
- **Dynamic API Fetching:** Seamlessly fetches live electronic product data from external APIs and updates loading/error states.


- **Interactive Product Catalog:** Filter, search, and view granular product details including pricing, ratings, and descriptions.
-------------------<img width="709" height="862" alt="image" src="https://github.com/user-attachments/assets/26c0cfd7-7dd1-44a5-a16d-a225e7dae824" />
- **Smart Shopping Cart:**
<img width="940" height="866" alt="image" src="https://github.com/user-attachments/assets/2503ef4e-9aa1-4621-a242-0ab8b5f57895" />

  - Real-time cart badge quantity counter.
  - Subtotal and total price calculations.
  - Dynamic item increment, decrement, and item removal functions.
- **Wishlist System:** Toggle favorite products with persistent state handling.

### 💳 3-Step Checkout Flow
- **Step 1: Address Manager (Dynamic CRUD)**
--------------------<img width="1402" height="842" alt="image" src="https://github.com/user-attachments/assets/6290ebcb-ba1d-4479-a4e6-652f8def32cc" />

  - Select active shipping addresses with interactive card selection.
  - Add new delivery addresses via a pop-up modal.
  - **In-Place Address Editing:** Click on the edit icon (✏️) to pre-fill and modify existing address details dynamically.
  - Delete address options with built-in validation checks.
- **Step 2: Shipping Method Selection**
--------------------<img width="1403" height="811" alt="image" src="https://github.com/user-attachments/assets/341f0c01-5537-4fd4-a538-5627f9da92e2" />

  - Interactive choice between Free Delivery, Express Shipping ($8.50), and Scheduled Delivery.
  - Real-time top navigation progression (Swaps from *Address → Shipping* to *Shipping → Payment*).
- **Step 3: Interactive Payment Gateway**
--------------------<img width="1124" height="864" alt="image" src="https://github.com/user-attachments/assets/730bfbb5-e814-4f5c-adc6-d2da4aa19d3c" />

  - Multi-payment support tabs: **Credit Card**, **PayPal**, and **PayPal Credit**.
  - **Live ATM Card Preview:** User inputs (Cardholder Name, Card Number) render in real-time on top of a styled credit card preview.
  - "Same as billing address" checkbox integration.

---

## 🛠️ Tech Stack & Architecture
-------------------<img width="1056" height="867" alt="image" src="https://github.com/user-attachments/assets/17dabaeb-a5d2-4adb-9195-38a85d2c4e96" />


- **Frontend Framework:** React.js (Functional Components, Custom Hooks)
- **State Management:** React Context API (Cart Context, Wishlist Context, Checkout State)
- **Routing & Navigation:** React Router DOM v6
- **Styling:** Custom CSS3 & Inline Style Objects (Responsive Flexbox & CSS Grid)
- **HTTP Client:** Native Fetch API / Axios
- **Version Control:** Git & GitHub

---

## 📁 Project Directory Structure

```text
Cyber-Tech-Electronics-Store-By-React/
├── public/
│   └── index.html
├── src/
│   ├── assets/          # Images (Credit Card, Hero Banners, Logos)
│   ├── components/      # Reusable UI Components (Navbar, Footer, Product Cards)
│   ├── context/         # React Context for Global State (Cart, Wishlist)
│   ├── pages/           # Application Views (Home, Cart, Checkout/Shipping)
│   │   ├── HomePage.jsx
│   │   ├── CartPage.jsx
│   │   └── ShippingPage.jsx
│   ├── App.js           # Main App Container & Routing Configuration
│   └── index.js         # React DOM Render Entry
├── package.json
└── README.md
