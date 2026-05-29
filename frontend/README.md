# Vale — Frontend Application

> *Will include slogan here eventually*

Vale is a fashion e-commerce web application built with React and TypeScript. This document outlines the current state of the project, its structure, and what has been implemented so far.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Features](#pages--features)
- [Routing](#routing)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Work in Progress](#work-in-progress)

---

## Project Overview

Vale is a styled, multi-page React application for a clothing e-commerce brand. The app currently covers the full authentication flow — splash, sign up, and login — with routing scaffolded for a complete shopping experience including product pages, a cart, checkout, and order confirmation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 with TypeScript |
| Routing | React Router v6 |
| Styling | Inline styles + scoped CSS-in-JS (`<style>` tags) |
| Fonts | Google Fonts — *Plaster*, *Inter*, *Cormorant Garamond* |
| Performance | `reportWebVitals` (web-vitals) |
| Testing | Jest + React Testing Library |
| Bundler | Create React App (`react-scripts`) |

---

## Project Structure

```
src/
├── App.tsx                  # Root component with route definitions
├── App.css                  # Global app styles
├── index.tsx                # Entry point
├── index.css                # Base body/font resets
├── reportWebVitals.ts       # Performance monitoring
├── setupTests.ts            # Jest/testing-library setup
├── react-app-env.d.ts       # CRA type references
│
├── pages/
│   ├── SplashPage.tsx        Complete
│   ├── LoginPage.tsx         Complete
│   ├── SignupPage.tsx        Complete
│   └── HomePage.tsx          Complete
│
└── assets/
    ├── leaves.jpg
    ├── clothes.jpg
    ├── texting.jpg
    ├── homepage phone.jpg
    ├── fashion-circle.jpg
    ├── phone circle.jpg
    ├── beauty-circle.jpg
    └── home-circle.jpg
```

---

## Pages & Features

### SplashPage `/`

The entry point of the application. Designed as a full-screen landing experience.

- Animated intro screen displaying the Vale logo, auto-dismisses after **2.5 seconds**
- Background imagery with a layered gradient overlay
- Marketing copy and CTA buttons — **Get Started** (→ `/signup`) and **I already have an account** (→ `/login`)
- Fade-up entrance animations on all content blocks

---

### LoginPage `/login`

A split-panel authentication screen.

- **Left panel** — decorative image with a welcome message overlay
- **Right panel** — login form containing:
  - Email field with inline icon
  - Password field with show/hide toggle
  - "Remember Me" checkbox
  - "Forgot password" button (UI only, no handler yet)
  - Primary login button with basic client-side validation
  - Social login buttons — Google, Facebook, X (Twitter)
  - Redirect link to the Sign Up page

**Validation:** alerts on invalid or missing email, and on passwords shorter than 6 characters. On success, navigates to `/`.

---

### SignupPage `/signup`

A split-panel registration screen — mirror layout to the Login page, with form on the left and image on the right.

- Full Name, Email, and Password fields with icons
- Password show/hide toggle
- Terms of Service & Privacy Policy checkbox (required)
- Primary sign-up button with client-side validation
- Social sign-up buttons — Google, Facebook, X (Twitter)
- Redirect link to the Login page

**Validation:** checks name presence, valid email format, minimum 6-character password, and terms acceptance. On success, navigates to `/`.

---

### HomePage `/home`

The main screen users land on after authentication. Designed as a **mobile-first phone shell** that simulates a native app experience inside the browser.

**Assets Used**

| Import | File | Role |
|---|---|---|
| `homepagePhone` | `homepage phone.jpg` | Hero banner background image |
| `fashionCircle` | `fashion-circle.jpg` | Fashion category avatar |
| `phoneCircle` | `phone circle.jpg` | Mobile category avatar |
| `beautyCircle` | `beauty-circle.jpg` | Beauty category avatar |
| `homeCircle` | `home-circle.jpg` | Home category avatar |

**Layout Structure**

```
HomePage
├── Phone Shell (.phone)
│   ├── Status Bar          — time, signal, wifi, battery icons (SVG)
│   ├── Top Bar             — greeting text + Vale logo
│   ├── Search Row          — grid icon | search bar | bell icon
│   ├── Hero Banner         — full-width image with 50% discount overlay + CTA
│   ├── Categories Section
│   │   ├── Section Header  — "Categories" + "See all"
│   │   └── Categories Row  — Fashion | Mobile | Beauty | Home (circular avatars)
│   ├── New Arrivals Section
│   │   ├── Section Header  — "New Arrivals"
│   │   └── Products Grid   — 2-column grid of 4 product cards
│   └── Bottom Nav Bar      — Home | Shop | Cart | Account
```

**Styling Notes**

- **Font stack:** `Inter` (UI), `Plaster` (logo), `Cormorant Garamond` (imported but not used on this page)
- **Phone shell:** fixed 375px width, `min-height: 812px`, `border-radius: 0`, centered on a `#2b1d18` dark background
- **Bottom nav:** `position: fixed` at the bottom, `width: 375px` — matches the phone shell width

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Primary Green | `#1a4d2e` | Active nav, logo, headings |
| Accent Green | `#2d7a4f` | Logo accent, hero text, buttons |
| Warm Sand | `#f5f2ec` | Page/shell background |
| Price Red | `#c0392b` | Product price text |
| Border | `#e6e1db` | Input borders, nav divider |

---

## Routing

```
/              → SplashPage
/signup        → SignupPage
/login         → LoginPage
/product/:id   → ProductDetailPage
/cart          → CartPage
/checkout      → CheckoutPage
/confirmation  → ConfirmationPage
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

The app will run at `http://localhost:3000` by default.

---

## Work in Progress

- [ ] Hero banner CTA — wire up `EXPLORE COLLECTION` button navigation
- [ ] Real product images — replace placeholder color blocks with actual assets
- [ ] Product names and prices — connect to a data source or mock API
- [ ] Shop tab — add navigation or view handler
- [ ] Account tab — add navigation to profile/account page
- [ ] Search bar — implement search functionality
- [ ] Bell icon — notifications panel or page
- [ ] "See all" link — navigate to full categories list
- [ ] Horizontal scroll snap — improve UX on category row
- [ ] Responsive layout — adapt phone shell for desktop/tablet views
- [ ] ProductDetailPage — product imagery, description, size/colour selection, add to cart
- [ ] CartPage — item list, quantity controls, order summary
- [ ] CheckoutPage — shipping and payment form
- [ ] ConfirmationPage — order success state
- [ ] Authentication backend integration (currently client-side only)
- [ ] "Forgot password" flow
- [ ] Social OAuth integration
- [ ] Global state management (cart, auth session)

---

*Vale is currently in active development. This README reflects the state of the project as of the files reviewed.*