# QA Checklist — Mini E-Commerce App


## Backend API

### Auth
- [x] POST /api/auth/signup — registers a new user successfully
- [x] POST /api/auth/signup — fails with 400 if fields are missing
- [x] POST /api/auth/signup — fails with 409 if email already exists
- [x] POST /api/auth/login — logs in with correct credentials
- [x] POST /api/auth/login — fails with 401 if password is wrong
- [x] GET /api/auth/verify — returns 200 with valid token
- [x] GET /api/auth/verify — returns 401 with no token or expired token

### Products
- [x] GET /api/products — returns all products when logged in
- [x] GET /api/products?maxPrice=100000 — filters by max price
- [x] GET /api/products?category=Travel — filters by category
- [x] GET /api/products?sortBy=price&sortOrder=asc — sorts correctly
- [x] GET /api/products/categories — returns list of categories
- [x] GET /api/products — fails with 401 if not logged in

### Cart
- [x] GET /api/cart — returns current cart
- [x] POST /api/cart/items — adds item to cart successfully
- [ ] POST /api/cart/items — fails if productId is missing
- [ ] PUT /api/cart/items/:itemId — updates item quantity
- [ ] DELETE /api/cart/items/:itemId — removes item from cart
- [x] DELETE /api/cart/clear — clears entire cart

### Wallet
- [x] GET /api/wallet — returns wallet balance
- [x] POST /api/wallet/top-up — funds wallet with demo money
- [x] GET /api/wallet/transactions — returns transaction history

### Checkout
- [x] GET /api/checkout/preview — returns cart totals and wallet balance
- [x] POST /api/checkout — completes checkout successfully
- [x] POST /api/checkout — fails if wallet balance is insufficient

### Orders
- [x] GET /api/orders — returns all orders for logged in user
- [x] GET /api/orders/:orderId — returns a single order correctly

## Frontend Pages
- [x] Home/Product page loads correctly
- [x] Cart page shows correct items and total
- [x] Checkout page submits correctly
- [x] All pages are mobile friendly
- [x] No broken links or blank pages

## General
- [ ] App loads without errors
- [ ] All buttons work correctly
- [ ] Error messages display properly
- [ ] JWT token is sent correctly on all protected routes

