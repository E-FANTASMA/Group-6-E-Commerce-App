# Bug Report — Mini E-Commerce App

## All Bugs Found During Testing

| Bug ID | Description | Steps to Reproduce | Expected Result | Actual Result | Status |
|--------|-------------|-------------------|-----------------|---------------|--------|
| BUG-01 | Signup and Login failing — Supabase not connecting on live server | POST /api/auth/signup with valid body in Postman | 201 user created successfully | 500 — Database error: TypeError fetch failed | Fixed ✅ |
| BUG-02 | Cart, Wallet, Checkout and Orders all returning 500 — missing database tables | Run node qa/api.test.js | All endpoints pass | 500 — Could not find table public.cart_items in schema cache | Fixed ✅ |
| BUG-03 | PUT /api/cart/items/:itemId returning 404 — cart item ID not saved after POST | Run node qa/api.test.js | 200 item quantity updated | 404 Route not found | Fixed ✅ |
| BUG-04 | DELETE /api/cart/items/:itemId returning 404 — cart item ID not saved after POST | Run node qa/api.test.js | 200 item removed from cart | 404 Route not found | Fixed ✅ |
| BUG-05 | GET /api/checkout/preview timing out | Run node qa/api.test.js | 200 preview data returned | Error fetch failed | Fixed ✅ |

---

## Summary

| Total Bugs Found | Total Fixed | Total Open |
|-----------------|-------------|------------|
| 5 | 5 | 0 |

**Overall:** All bugs found during testing have been identified, reported and fixed.