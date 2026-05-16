# 🏡 Inari Home Care Platform

![Inari Banner](public/logo-black.png)

> **The new standard for home care.** 
> Professional, verified, and transparent home services ecosystem. Built with a focus on premium aesthetics, trust, and frictionless user experiences.

---

## 🌟 Overview

The unorganized home services sector suffers from a lack of transparency, unpredictable pricing, and unreliable professionals. Inari Home Care bridges this gap by acting as a premium, dual-sided marketplace. It provides an intuitive booking wizard for customers, and a streamlined, transparent dashboard for service professionals.

Designed with a **Swiss-Minimalist** and **Glassmorphism-inspired** UI, the platform prioritizes clean typography, breathable layouts, and subtle micro-animations to reduce cognitive load and build user trust.

## ✨ Key Features

- **Progressive Booking Wizard:** A 7-step seamless booking flow (Service Selection ➔ Customization ➔ Pro Selection ➔ Scheduling ➔ Location ➔ Live Summary ➔ Payment) designed to minimize drop-off rates.
- **Dynamic Live Pricing:** Users see a sticky "Live Summary" cart that updates in real-time as they toggle add-ons, adjust hours, or apply discounts.
- **Role-Based Workspaces (RBAC):** 
  - **Customer Dashboard:** Manage upcoming bookings, track service history, and update profiles.
  - **Professional Dashboard:** Track earnings, accept new jobs, and manage identity verification statuses.
- **Premium Animations:** Integrated `GSAP` (GreenSock) for smooth scroll-triggered reveals, page transitions, and subtle element loading without compromising performance.
- **Highly Responsive:** Mobile-first architecture using Tailwind CSS, featuring collapsible menus, sticky bottom-bars on mobile, and optimized touch targets.

## 🛠️ Tech Stack

This project is built with a modern, fast, and scalable frontend stack:

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Routing:** [React Router v6](https://reactrouter.com/) (with `React.lazy()` for code-splitting)
- **Animations:** [GSAP](https://gsap.com/) & [Lenis](https://lenis.darkroom.engineering/) (Smooth Scrolling)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anxthu/Inari-home-service.git
   cd Inari-home-service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application.

## 🏗️ Architecture & Routing

The application utilizes **React.lazy()** and **Suspense** to ensure lightweight initial loads. The routing logic is heavily protected based on the user's authentication context (`AuthContext.tsx`).

### Core Routes:
- `/` - Landing Page
- `/services` - Service Discovery & Catalog
- `/book/:serviceId` - The Booking Engine / Wizard
- `/dashboard` - Protected Customer Hub
- `/pro-dashboard` - Protected Professional Hub
- `/profile` - Universal Settings & Verification

## 📝 License

This project is intended for educational and portfolio purposes. 

---
*Designed & Developed by Ananthu as a comprehensive demonstration of Design Engineering, UX Remediation, and scalable frontend architecture.*
