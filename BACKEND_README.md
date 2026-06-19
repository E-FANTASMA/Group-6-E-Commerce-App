# Group 6 E-Commerce Backend

Backend for our e-commerce project. Currently working on user authentication.

## What We're Building
- ✅ User Signup & Login
- 🔄 Product Display (Admin)
- 🔄 Wallet System
- 🔄 Checkout & Payment

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file and add your Supabase credentials:
```
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
SUPABASE_SECRET_KEY=your_secret_key
JWT_SECRET=your_secret
PORT=5000
```

3. Run the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Routes

### Signup
```
POST /api/auth/signup
{
  "fullName": "John",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "phoneNumber": "+1234567890"
}
```

### Login
```
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### Verify Token
```
GET /api/auth/verify
Headers: Authorization: Bearer <token>
```

## Database Setup

Run this in Supabase SQL:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Password Rules
- 8+ characters
- 1 uppercase, 1 lowercase, 1 number
