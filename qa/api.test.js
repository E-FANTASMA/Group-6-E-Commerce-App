// qa/api.test.js — Full API Test for Group 6 Mini E-Commerce App
// Run with: node qa/api.test.js

const BASE_URL = "https://group-6-e-commerce-app.onrender.com/api";

// These will be filled automatically during tests
let token = "";
let productId = "";
let cartItemId = "";
let orderId = "";

// ─── HELPER FUNCTIONS ─────────────────────────────────

async function test(name, fn) {
  try {
    await fn();
  } catch (e) {
    console.log(`❌ ${name} — ERROR: ${e.message}`);
  }
}

function log(name, res, data) {
  if (res.ok) {
    console.log(`✅ ${name} — PASSED (${res.status})`);
  } else {
    console.log(`❌ ${name} — FAILED (${res.status}) → ${data?.message || JSON.stringify(data)}`);
  }
}

// ─── 1. AUTH TESTS ────────────────────────────────────

async function testAuth() {
  console.log("\n📌 AUTH TESTS");

  // SIGNUP
  await test("POST /api/auth/signup", async () => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Rukevwe Agolo",
        email: "rukevwe.test99@gmail.com",
        password: "SecurePass123",
        confirmPassword: "SecurePass123",
        phoneNumber: "+2348012345678"
      })
    });
    const data = await res.json();
    log("POST /api/auth/signup", res, data);
    if (data?.data?.token) {
      token = data.data.token;
      console.log("   🔑 Token saved from signup");
    }
  });

  // LOGIN
  await test("POST /api/auth/login", async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "rukevwe.test99@gmail.com",
        password: "SecurePass123"
      })
    });
    const data = await res.json();
    log("POST /api/auth/login", res, data);
    if (data?.data?.token) {
      token = data.data.token;
      console.log("   🔑 Token saved from login");
    }
  });

  // VERIFY TOKEN
  await test("GET /api/auth/verify", async () => {
    const res = await fetch(`${BASE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/auth/verify", res, data);
  });

  // VERIFY WITH NO TOKEN
  await test("GET /api/auth/verify — no token (expect 401)", async () => {
    const res = await fetch(`${BASE_URL}/auth/verify`);
    res.status === 401
      ? console.log(`✅ GET /api/auth/verify no token — PASSED (401 as expected)`)
      : console.log(`❌ GET /api/auth/verify no token — UNEXPECTED (${res.status})`);
  });
}

// ─── 2. PRODUCT TESTS ─────────────────────────────────

async function testProducts() {
  console.log("\n📌 PRODUCT TESTS");

  // GET ALL PRODUCTS
  await test("GET /api/products", async () => {
    const res = await fetch(`${BASE_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/products", res, data);
    if (data?.data?.length > 0) {
      productId = data.data[0].id;
      console.log(`   📦 Product ID saved: ${productId}`);
    }
  });

  // FILTER BY MAX PRICE
  await test("GET /api/products?maxPrice=100000", async () => {
    const res = await fetch(`${BASE_URL}/products?maxPrice=100000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/products?maxPrice=100000", res, data);
  });

  // FILTER BY CATEGORY
  await test("GET /api/products?category=Travel", async () => {
    const res = await fetch(`${BASE_URL}/products?category=Travel`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/products?category=Travel", res, data);
  });

  // SORT BY PRICE
  await test("GET /api/products?sortBy=price&sortOrder=asc", async () => {
    const res = await fetch(`${BASE_URL}/products?sortBy=price&sortOrder=asc`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/products?sortBy=price&sortOrder=asc", res, data);
  });

  // GET CATEGORIES
  await test("GET /api/products/categories", async () => {
    const res = await fetch(`${BASE_URL}/products/categories`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/products/categories", res, data);
  });

  // NO TOKEN
  await test("GET /api/products — no token (expect 401)", async () => {
    const res = await fetch(`${BASE_URL}/products`);
    res.status === 401
      ? console.log(`✅ GET /api/products no token — PASSED (401 as expected)`)
      : console.log(`❌ GET /api/products no token — UNEXPECTED (${res.status})`);
  });
}

// ─── 3. CART TESTS ────────────────────────────────────

async function testCart() {
  console.log("\n📌 CART TESTS");

  // GET CART
  await test("GET /api/cart", async () => {
    const res = await fetch(`${BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/cart", res, data);
  });

  // ADD ITEM TO CART
  await test("POST /api/cart/items", async () => {
    const res = await fetch(`${BASE_URL}/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: productId,
        quantity: 2
      })
    });
    const data = await res.json();
    log("POST /api/cart/items", res, data);
    console.log("   📦 Full cart response:", JSON.stringify(data, null, 2));

    // Try all possible locations of cart item ID
    if (data?.data?.id) {
      cartItemId = data.data.id;
      console.log(`   🛒 Cart Item ID saved: ${cartItemId}`);
    } else if (data?.data?.items?.[0]?.id) {
      cartItemId = data.data.items[0].id;
      console.log(`   🛒 Cart Item ID saved from items array: ${cartItemId}`);
    } else if (data?.data?.cartItem?.id) {
      cartItemId = data.data.cartItem.id;
      console.log(`   🛒 Cart Item ID saved from cartItem: ${cartItemId}`);
    } else {
      console.log(`   ⚠️ Could not find cart item ID in response`);
    }
  });

  // UPDATE CART ITEM
  await test("PUT /api/cart/items/:itemId", async () => {
    if (!cartItemId) {
      console.log("   ⚠️ PUT /api/cart/items/:itemId — SKIPPED (no cart item ID)");
      return;
    }
    const res = await fetch(`${BASE_URL}/cart/items/${cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ quantity: 3 })
    });
    const data = await res.json();
    log("PUT /api/cart/items/:itemId", res, data);
  });

  // REMOVE CART ITEM
  await test("DELETE /api/cart/items/:itemId", async () => {
    if (!cartItemId) {
      console.log("   ⚠️ DELETE /api/cart/items/:itemId — SKIPPED (no cart item ID)");
      return;
    }
    const res = await fetch(`${BASE_URL}/cart/items/${cartItemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("DELETE /api/cart/items/:itemId", res, data);
  });

  // CLEAR CART
  await test("DELETE /api/cart/clear", async () => {
    const res = await fetch(`${BASE_URL}/cart/clear`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("DELETE /api/cart/clear", res, data);
  });
}

// ─── 4. WALLET TESTS ──────────────────────────────────

async function testWallet() {
  console.log("\n📌 WALLET TESTS");

  // GET WALLET
  await test("GET /api/wallet", async () => {
    const res = await fetch(`${BASE_URL}/wallet`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/wallet", res, data);
  });

  // FUND WALLET
  await test("POST /api/wallet/top-up", async () => {
    const res = await fetch(`${BASE_URL}/wallet/top-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: 500000,
        description: "Demo funding"
      })
    });
    const data = await res.json();
    log("POST /api/wallet/top-up", res, data);
  });

  // WALLET TRANSACTIONS
  await test("GET /api/wallet/transactions", async () => {
    const res = await fetch(`${BASE_URL}/wallet/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/wallet/transactions", res, data);
  });
}

// ─── 5. CHECKOUT TESTS ────────────────────────────────

async function testCheckout() {
  console.log("\n📌 CHECKOUT TESTS");

  // Add item back to cart first
  await fetch(`${BASE_URL}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ productId: productId, quantity: 1 })
  });

  // CHECKOUT PREVIEW
  await test("GET /api/checkout/preview", async () => {
    const res = await fetch(`${BASE_URL}/checkout/preview`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/checkout/preview", res, data);
  });

  // COMPLETE CHECKOUT
  await test("POST /api/checkout", async () => {
    const res = await fetch(`${BASE_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        paymentMethod: "wallet",
        notes: "Leave at the front desk",
        shippingAddress: {
          fullName: "Rukevwe Agolo",
          phoneNumber: "+2348012345678",
          line1: "12 Marina Road",
          city: "Lagos",
          state: "Lagos",
          country: "Nigeria"
        }
      })
    });
    const data = await res.json();
    log("POST /api/checkout", res, data);
  });
}

// ─── 6. ORDER TESTS ───────────────────────────────────

async function testOrders() {
  console.log("\n📌 ORDER TESTS");

  // GET ALL ORDERS
  await test("GET /api/orders", async () => {
    const res = await fetch(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/orders", res, data);
    if (data?.data?.length > 0) {
      orderId = data.data[0].id;
      console.log(`   🧾 Order ID saved: ${orderId}`);
    }
  });

  // GET SINGLE ORDER
  await test("GET /api/orders/:orderId", async () => {
    if (!orderId) {
      console.log("⚠️  GET /api/orders/:orderId — SKIPPED (no order ID found)");
      return;
    }
    const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/orders/:orderId", res, data);
  });
}

// ─── RUN ALL TESTS ────────────────────────────────────

async function runAllTests() {
  console.log("🚀 Starting API Tests — Group 6 Mini E-Commerce App");
  console.log("=".repeat(52));

  await testAuth();
  await testProducts();
  await testCart();
  await testWallet();
  await testCheckout();
  await testOrders();

  console.log("\n" + "=".repeat(52));
  console.log("🏁 All tests finished!");
  console.log("=".repeat(52));
}

runAllTests();