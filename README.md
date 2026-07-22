# ⚡ SkyMart — Cyber-Minimalist E-Commerce Platform

![SkyMart Header](https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80)

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Router-v7.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 🌟 Overview

**SkyMart** is a next-generation, high-performance **Cyber-Minimalist E-Commerce Platform** built with **React 19**, **Vite**, and **Tailwind CSS v4**. Featuring a sleek obsidian dark theme (`#0A0A0A`), neon accent glows, live multi-currency conversion, an AI-powered shopping assistant, side-by-side product comparison, and real-time order tracking.

---

## 🔥 Key Features

### 🛍️ 1. Dynamic Catalog & Category Filtering
- **39 High-Resolution Cyber Products** across 7 categories: *Electronics*, *Gaming*, *Wearables*, *Smart Home*, *Clothing & Fashion*, *Furniture*, and *Home*.
- Instant search bar with live fuzzy filtering, category pills, and multi-parameter sorting (*Price: Low to High*, *Price: High to Low*, *Customer Rating*).
- SVG Cyber Fallbacks for uninterrupted visual presentation under network drops.

### 🎨 2. Live Cyber Accent Palette Switcher
Change the entire website aesthetic instantly using the Navbar Palette Switcher:
- 🟢 **Cyber Lime** (`#BCFF4E` - Default Primary Brand)
- 🔴 **Neon Crimson** (`#FF3366` - High Contrast Cyber Red)
- ⚡ **Electric Emerald** (`#00FF9D` - High Contrast Cyber Mint)
- 🟡 **Solar Amber** (`#FFB800` - Warm Cyber Gold)

### 🌐 3. Live Multi-Currency Conversion
Real-time currency switcher converting all catalog prices, cart subtotals, checkout totals, and receipts across 5 currencies:
- 🇺🇸 **USD ($)**
- 🇪🇺 **EUR (€)**
- 🇬🇧 **GBP (£)**
- 🇮🇳 **INR (₹)**
- 🇯🇵 **JPY (¥)**

### 🤖 4. AI CyberBot Shopping Assistant
- Floating AI recommendation assistant in the bottom-right corner.
- Filters recommendations dynamically based on user budget (`< $50`, `$50-$150`, `$150+`) and primary interest.

### 🏷️ 5. Promo Code & Discount System
Supported promo codes at checkout:
- **`CYBER20`**: 20% OFF Flash Sale Discount
- **`NEON10`**: $10 OFF Total Order
- **`FREESHIP`**: Free Express Shipping

### ⚡ 6. Flash Sale Live Countdown Banner
- Live ticking countdown timer (`04h : 30m : 00s`) on the home page.
- One-click **"Claim Deal"** button that automatically activates `CYBER20` and opens the Cart Drawer.

### 📄 7. Official Digital Receipts & Invoices
- View digital receipts for any completed order with order ID, date, billing/shipping address, itemized rate breakdown, subtotal, discount, tax, and final amount paid.

### 📦 8. Order History & Live Dispatch Tracking (`/orders`)
- Saved order receipts with item breakdowns and an animated 4-step dispatch progress bar (`Order Placed` ➔ `Dispatched` ➔ `In Transit` ➔ `Delivered`).

### 🖤 9. Saved Wishlist System (`/wishlist`)
- Heart toggle button on all product cards with live badge counter in the Navbar.

### ⚖️ 10. Product Comparison Matrix (`/compare`)
- Side-by-side specification and pricing comparison for up to 3 products simultaneously.

### 💬 11. Category-Tailored Verified Customer Reviews
- Authentic reviews by **Subham Mohanty** customized for each product category (Fashion, Gaming, Wearables, Audio, Furniture).
- Interactive review submission form with star rating selector.

### 👁️ 12. Quick View Product Spotlight
- Overlay modal previewing specifications, stock availability, ratings, and quantity controls without navigating away from the page.

---

## 🛠️ Technology Stack

- **Core**: React 19, Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS v4, Vanilla CSS Custom Variables
- **Icons**: Lucide React
- **State Management**: React Context API (`AppContext.jsx`) & `localStorage` persistence

---

## 🚀 Quick Start & Setup

### Prerequisites
Make sure you have **Node.js (v18+)** and **npm** installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/skymart.git
   cd skymart
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Account Credentials

Use these pre-seeded credentials to test the protected authentication flow:

- **User Account**:
  - Email: `user@skymart.com`
  - Password: `password123`
- **Admin Account**:
  - Email: `admin@skymart.com`
  - Password: `password123`

---

## 📂 Project Structure

```
skymart/
├── public/
├── src/
│   ├── components/
│   │   ├── CartDrawer.jsx          # Slide-over shopping cart drawer
│   │   ├── CheckoutModal.jsx        # Step-by-step SSL checkout modal
│   │   ├── CompareBar.jsx           # Floating comparison queue bar
│   │   ├── CyberBotModal.jsx        # AI Shopping Recommendation Bot
│   │   ├── FeaturedProductCard.jsx  # Hero product showcase card
│   │   ├── FlashSaleBanner.jsx      # Live countdown flash sale banner
│   │   ├── Footer.jsx               # Interactive 4-column footer
│   │   ├── InvoiceModal.jsx         # Official digital receipt overlay
│   │   ├── Navbar.jsx               # Dead-centered navigation header
│   │   ├── ProductCard.jsx          # Responsive product card component
│   │   ├── ProductModal.jsx         # Detailed product modal
│   │   ├── ProtectedRoute.jsx       # Auth guard wrapper
│   │   ├── QuickViewModal.jsx       # Quick view spotlight modal
│   │   └── ToastContainer.jsx       # Global notification toasts
│   ├── context/
│   │   └── AppContext.jsx           # Global state manager (Cart, Wishlist, Currency, Theme)
│   ├── data/
│   │   └── products.js              # 39 curated product items dataset
│   ├── pages/
│   │   ├── AboutPage.jsx            # About, Mission, & FAQ accordion
│   │   ├── ComparePage.jsx          # Side-by-side comparison matrix
│   │   ├── HomePage.jsx             # Hero banner, category grid & top products
│   │   ├── LoginPage.jsx            # User sign-in page
│   │   ├── OrdersPage.jsx           # Order history & live progress tracking
│   │   ├── ProductDetailPage.jsx    # Product details & category-tailored reviews
│   │   ├── RegisterPage.jsx         # Account registration page
│   │   ├── ShopPage.jsx             # Full catalog with search & filters
│   │   └── WishlistPage.jsx         # Saved items wishlist page
│   ├── App.jsx                      # Main router table
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Tailwind v4 configuration & theme tokens
├── package.json
└── README.md
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

<p align="center">
  Crafted with ❤️ by <b>Subham Mohanty</b> & Team
</p>
