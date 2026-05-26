# Bug Report — Mini E-Commerce App

## Bug Report

| Bug ID | Description | Steps to Reproduce | Expected Result | Actual Result | Status |
|--------|-------------|-------------------|-----------------|---------------|--------|
| BUG-01 | Signup fails on live server | POST /api/auth/signup with valid body in Postman | 201 user created | 500 — Database error: TypeError fetch failed | Open |
| BUG-02 | Login fails on live server | POST /api/auth/login with valid body in Postman | 200 login successful | 500 — Database error: TypeError fetch failed | Open |
| BUG-01 | Signup fails — Supabase not connecting | POST /api/auth/signup | 201 success | 500 fetch failed | Fixed ✅ |
| BUG-03 | Cart, Wallet, Checkout, Orders all return 500 | Run node qa/api.test.js | All pass | 500 server errors | Open |
| BUG-04 | Cart returns 500 — missing database table | GET /api/cart with valid token in Postman | 200 cart data returned | 500 — Could not find table public.cart_items in schema cache | Open |
