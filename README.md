#  Mini E-Commerce App

> COS 202 – Computer Programming II | Group 6 Project
> Department of Software Engineering | Second Semester

Vale is a lightweight mini e-commerce platform that allows users to browse products, manage a cart, and simulate checkout. Built as a learning project to demonstrate full-stack development with React and Node.js.

---

##  Links

-  **Live App (Frontend):** https://cosgroup6.netlify.app
-  **Live API (Backend):** https://group-6-e-commerce-app.onrender.com
-  **GitHub Repo:** https://github.com/E-FANTASMA/Group-6-E-Commerce-App
---

##  Team Members

| Name | Matric No. | Role |
|------|------------|------|
| AJAYI Cathynell | 24120112007 | Frontend Developer |
| BALOGUN Halima | 24120112014 | Frontend Developer |
| FEMI-SIPE Oluwatamilore | 24120112022 | Frontend Developer |
| GABRIEL-LOUIS Onyedikachi | 24120112023 | DevOps Integration |
| MBAMA Elsie | 24120112029 | Frontend Developer |
| OJO Jeremiah | 25120112060 | Team Lead & Backend Developer |
| OSEGHALE Nehireme | 24120112048 | QA & Documentation |
| AGOLO Oghenerukevwe | 24120112006 | QA & Documentation |
| YAKUBU Emmanuel | 24120112059 | Frontend Developer |

---

##  Project Structure

Group-6-E-Commerce-App/
├── frontend/              # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
├── backend/               # Node.js + Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── index.js
├── qa/                    # QA and Documentation
│   ├── api.test.js
│   ├── BUG_REPORT.md
│   └── QA_CHECKLIST.md
└── README.md

---

##  Features

- User signup and login
- Product display and filtering
- Product image upload
- Cart management
- Wallet system with demo money
- Checkout and payment
- Order history
- Responsive UI

---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, JavaScript (ES6) |
| Backend | Node.js, Express.js |
| Database | Supabase (PostgreSQL) |
| Styling | Tailwind CSS |
| Version Control | Git & GitHub |

---

##  Installation and Setup

### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/E-FANTASMA/Group-6-E-Commerce-App.git
cd Group-6-E-Commerce-App
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file and add your Supabase credentials:
```
SUPABASE_URL=your_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SECRET_KEY=your_supabase_service_role_key
PRODUCT_IMAGES_BUCKET=product-images
WALLET_CURRENCY=NGN
JWT_SECRET=your_secret
PORT=5000
```

Run the server:
```bash
npm run dev
```

Server runs on http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

##  Database Setup

This project uses **Supabase** as the database.

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL file in `database/schema.sql` inside your Supabase SQL Editor
3. This must be done before using cart, wallet, checkout, payments and orders

### Supabase Storage Setup
Create a bucket in Supabase with these settings:
- **Bucket name:** `product-images`
- **Visibility:** `Public`

---

##  User Roles

| Role | Permissions |
|------|-------------|
| `user` | Browse products, manage cart, checkout |
| `admin` | Create, edit, delete and upload product images |

### Password Rules
- 8+ characters
- 1 uppercase, 1 lowercase, 1 number

---

##  API Endpoints

> All endpoints require `Authorization: Bearer <token>` unless stated otherwise.

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login a user | No |
| GET | `/api/auth/verify` | Verify token | Yes |

### Products
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | All users |
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
| `limit` | Results per page max 100 | `limit=10` |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get current cart |
| POST | `/api/cart/items` | Add item to cart |
| PUT | `/api/cart/items/:itemId` | Update item quantity |
| DELETE | `/api/cart/items/:itemId` | Remove item from cart |
| DELETE | `/api/cart/clear` | Clear entire cart |

### Wallet
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wallet` | Get wallet balance |
| POST | `/api/wallet/top-up` | Fund wallet with demo money |
| GET | `/api/wallet/transactions` | Get transaction history |

### Checkout
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/checkout/preview` | Preview cart totals and wallet balance |
| POST | `/api/checkout` | Complete checkout |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get order history |
| GET | `/api/orders/:orderId` | Get single order details |

---

##  Testing

All 22 API endpoints have been tested and verified by the QA team.
All Frontend pages have been tested and verified by the QA team.

| Test File | Description |
|-----------|-------------|
| `qa/api.test.js` | Automated API test script |
| `qa/QA_CHECKLIST.md` | Full checklist of features tested |
| `qa/BUG_REPORT.md` | Bugs found and resolved during testing |

---

##  Git Workflow

- `frontend` — main branch
- `feature/*` — new features
- `docs/*` — documentation branches
- `qa/*` — testing branches
- All changes go through **Pull Requests** before merging
- Minimum 5-10 commits per student
- Minimum 2 Pull Requests per student

---

##  Project Status

> Last updated: May 2026

| Feature | Status |
|---------|--------|
| User Authentication | Done |
| Product Listing | Done |
| Shopping Cart | Done |
| Wallet System | Done |
| Checkout Flow | Done |
| Order History | Done |
| Frontend UI | Done |
| Deployment | Done |

---

##  License

This project was built for academic purposes — COS 202, Software Engineering Department.
