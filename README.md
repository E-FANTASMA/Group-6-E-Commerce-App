# Mini E-Commerce App

> CSC 202 – Computer Programming II | Group 6 Project  
> Department of Software Engineering | Second Semester

## Project Description
E-Fantasma is a lightweight mini e-commerce platform that allows users to browse products, manage a cart, and simulate checkout.

It was built as a learning project to demonstrate full-stack development with React and Node.js.

---

## Team Members

| Name | Matric No. | Role |
|------|------------|------|
| AJAYI Cathynell | 24120112007 | Frontend |
| BALOGUN Halima | 24120112014 | Frontend |
| FEMI-SIPE Oluwatamilore | 24120112022 |Frontend |
| GABRIEL-LOUIS Onyedikachi | 24120112023 | DevOps Integration |
| MBAMA Elsie | 24120112029 | Frontend |
| OJO Jeremiah | 25120112060 | Backend |
| OSEGHALE Nehireme | 24120112048 | QA/Documentation |
| AGOLO Oghenerukevwe | 24120112006 | QA/Documentation |
| YAKUBU Emmanuel | 24120112059 | Frontend |

---

## Features

- User signup and login
- Product display and filtering
- Product image upload
- Cart management
- Wallet system with demo money
- Checkout and payment
- Order history
- Browse available products
- Add and remove items from cart
- Checkout functionality
- Responsive UI

---

## Tech Stack

Frontend:
- React
- JavaScript (ES6)

Backend:
- Node.js
- Express.js

Database:
- Supabase SQL

Styling:
-  Tailwind CSS

Version Control:
- Git & GitHub

---


## Installation and Setup


### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)



1. Clone the repository:
   git clone https://github.com/E-FANTASMA/Group-6-E-Commerce-App.git
   
2. Navigate into the project folder:
   cd Group-6-E-Commerce-App

### Backend Setup:
```bash
# Navigate to backend folder
cd backend

# Install dependencies
```bash
npm install
```


```
# Create `.env` file and add your Supabase credentials:
```env
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
SUPABASE_SECRET_KEY=your_secret_key
PRODUCT_IMAGES_BUCKET=product-images
WALLET_CURRENCY=NGN
JWT_SECRET=your_secret
PORT=5000
DB_URL=http://localhost:5000`
```

 Run the server:
```bash
npm run dev
```

###  Database Setup
- This project uses **Supabase** as the database
- Run the SQL file in `database/schema.sql` inside your Supabase SQL Editor
- This must be done before using cart, wallet, checkout, payments and orders

---

###  Supabase Storage Setup
Create a bucket in Supabase with these settings:
- **Bucket name:** `product-images`
- **Visibility:** `Public`

---


###  User Roles
| Role | Permissions |
|------|-------------|
| `user` | Browse products |
| `admin` | Create, edit, delete and upload product images |


### Frontend Setup:
  ```bash
cd frontend
npm install
npm run dev
```
5. Start frontend:
   npm start

---

## API Endpoints


> All endpoints require `Authorization: Bearer <token>` unless stated otherwise.

---

###  Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login a user |

---

###  Products
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products (supports filters) | All users |
| POST | `/api/products` | Create a new product | Admin only |
| PUT | `/api/products/:id` | Update a product | Admin only |
| DELETE | `/api/products/:id` | Delete a product | Admin only |
| GET | `/api/products/categories` | Get all categories | All users |
| POST | `/api/products/upload-image` | Upload a product image | Admin only |

#### Product Query Parameters
| Parameter | Description | Example |
|-----------|-------------|---------|
| `category` | Filter by category | `category=Travel` |
| `search` | Search by name or description | `search=bag` |
| `minPrice` | Minimum price | `minPrice=5000` |
| `maxPrice` | Maximum price | `maxPrice=100000` |
| `sortBy` | Sort by field | `sortBy=price` |
| `sortOrder` | Sort direction | `sortOrder=asc` |
| `page` | Page number | `page=1` |
| `limit` | Results per page (max 100) | `limit=10` |

---

###  Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get current cart |
| POST | `/api/cart/items` | Add item to cart |
| PUT | `/api/cart/items/:itemId` | Update item quantity |
| DELETE | `/api/cart/items/:itemId` | Remove item from cart |
| DELETE | `/api/cart/clear` | Clear entire cart |

---

###  Wallet
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wallet` | Get wallet balance |
| POST | `/api/wallet/top-up` | Fund wallet with demo money |
| GET | `/api/wallet/transactions` | Get transaction history |

---

###  Checkout
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/checkout/preview` | Preview cart totals and wallet balance |
| POST | `/api/checkout` | Complete checkout |

---

###  Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get order history |
| GET | `/api/orders/:orderId` | Get single order details |


---

##  Testing

Testing is currently being handled by the QA team. See the full details in the
- [`BUG_REPORT.md`]
- [`QA_CHECKLIST.md`]

Bugs were documented and resolved using GitHub Issues.

##  Git Workflow

- `main` — production-ready code only
- `feature/*` — new features
- `qa/*` — testing and documentation branches
- All changes go through **Pull Requests** before merging


## Project Status

> Last updated: May 23, 2026

| Feature | Status |
|---|---|
| Product Listing Page |   |
| User Authentication |  |
| Shopping Cart |   |
| Checkout Flow |   |
| Order History |   |

**Overall:** Core features are underway. Target completion before final submission deadline.



## License

This project was built for academic purposes — COS 202, University project.


## Live Demo
