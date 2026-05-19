# Bug Report — Mini E-Commerce App

## Bug Report

| Bug ID | Description | Steps to Reproduce | Expected Result | Actual Result | Status |
|--------|-------------|-------------------|-----------------|---------------|--------|
| BUG-01 | Signup fails on live server | POST /api/auth/signup with valid body in Postman | 201 user created | 500 — Database error: TypeError fetch failed | Open |
| BUG-02 | Login fails on live server | POST /api/auth/login with valid body in Postman | 200 login successful | 500 — Database error: TypeError fetch failed | Open |