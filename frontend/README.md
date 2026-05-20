# Untitled — Frontend Application

> *Will include slogan here eventually*

“Untitled” is a fashion e-commerce web application built with React and TypeScript. This document outlines the current state of the project, its structure, and what has been implemented so far.

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

“Untitled” is a styled, multi-page React application for a clothing e-commerce brand. The app currently covers the full authentication flow — splash, sign up, and login — with routing scaffolded for a complete shopping experience including product pages, a cart, checkout, and order confirmation.

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
│   ├── SplashPage.tsx       Complete
│   ├── LoginPage.tsx        Complete
