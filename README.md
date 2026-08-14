# CineNoir — Production Movie Ticket Booking Portal 🎬

A complete, production-grade **Movie Ticket Booking Portal** featuring a cinematic dark theme built around the **Masterpiece Red** color system (`#5A2132`), 3D interactive seat maps, real-time seat lock timers, dynamic digital ticket generation with QR codes, personal movie analytics, and a full staff/admin management console.

---

## 🎨 Design System & Visual Palette

- **Masterpiece Red (`#5A2132`)**: Used for primary call-to-actions, selected seat states, active navigation indicators, and glowing highlights.
- **Dirty White (`#EFE9E9`)**: High-contrast typography and clean surface labels.
- **Deep Dark (`#0B0F12`)**: Primary obsidian dark background with glassmorphism overlays and radial projector lighting.
- **Typography**: Integrated `Playfair Display` (Headlines), `Hanken Grotesk` (Body & Titles), and `JetBrains Mono` (Labels & Identifiers).

---

## 🚀 Key Features

### 🎬 1. Complete Payment-Free Booking Flow
> **Home → Advanced Discovery → Movie Details → Select Location & Theatre → Select Date & Showtime → 3D Curved Screen & Interactive Seat Map → 5-Min Seat Lock Timer → Apply Promo Offer → Confirm Reservation → Digital Ticket with Dynamic QR Code**

* **NO PAYMENT GATEWAYS**: The booking engine directly confirms reservations upon seat selection without asking for credit cards, UPI, or payment processing.

### 🔍 2. Predictive Live Auto-Complete Search
* Instant suggestions as you type (e.g. `av` → *Avatar*, *Avengers*; `dune` → *Dune: Part Two*, Denis Villeneuve).
* Search by title, actor, director, or genre.

### 💺 3. Interactive 3D Cinema Seat Map & 5-Min Lock Engine
* Realistic seating tiers: **VIP Recliners** (₹450), **Premium** (₹300), **Standard** (₹200), and **Accessible**.
* Real-time 5-minute Seat Lock Timer (`Seats held for 04:59`). Automatically releases seats upon countdown expiry.
* Dynamic price calculation bar and Masterpiece Red seat selection animations.

### 🎟️ 4. Digital Ticket & Dynamic QR Engine
* Rendered digital ticket with dashed perforation line design.
* Dynamic SVG QR Code containing encrypted booking details (`CN-984-XLV2`).
* Interactive triggers for **Download PDF**, **Add to Calendar**, **Share Ticket**, and **Confetti Celebrations**.

### ⏱️ 5. My Bookings & Showtime Countdown
* Dynamic countdown clock for upcoming showtimes (`02 Days 04 Hours 32 Minutes`).
* Reservation history tracking with view ticket, download, and cancellation options.

### 📊 6. Personal Movie Analytics
* Profile dashboard displaying **Movies Watched**, **Favorite Formats**, and **Watchlist**.
* Interactive SVG bar charts (monthly viewing trends) and donut charts (format breakdown).

### 🛡️ 7. Admin Console & Staff QR Scanner
* Bento metrics grid (Total Bookings, Est. Revenue, Active Movies).
* Live 3D screen occupancy visualizer.
* Movie inventory CRUD modal (Add, Edit, Delete movies).
* **Staff QR Scanner Simulator**: Enter or paste a Booking ID (`CN-984-XLV2`) to validate customer check-in.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Custom CSS System + Tailwind CSS with Forms & Container Queries
- **Icons**: Lucide Icons & Material Symbols Outlined
- **Animations & Effects**: Canvas Confetti, CSS 3D Perspectives, Glassmorphism
- **Fonts**: Google Fonts (`Playfair Display`, `Hanken Grotesk`, `JetBrains Mono`)

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/akhilgandloji789/MOVIETICKETS.git
   cd MOVIETICKETS
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License

Distributed under the MIT License. Designed & Developed for CineNoir Cinemas.
