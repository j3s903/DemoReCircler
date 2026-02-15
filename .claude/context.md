# ReCircler — Project Context for Claude Code

## Project Overview

ReCircler is a community-driven platform for sharing, lending, and donating items to reduce waste and promote sustainability. This is a **frontend-only prototype** — no backend, no database, no API calls. All data is hardcoded mock data. The purpose is **team alignment on vision** so the team can see, click through, and agree on the product direction before building the real thing.

---

## Tech Stack

- **Framework:** React 18+ with Vite
- **Routing:** React Router v6 (multi-page app with proper URL paths)
- **Styling:** Tailwind CSS
- **Map:** Leaflet (with `react-leaflet`) using OpenStreetMap tiles — interactive map with dummy pins
- **Icons:** Lucide React (preferred) or React Icons
- **Charts (for dashboards):** Recharts
- **State:** React `useState` / `useContext` only — no Redux, no Zustand
- **No backend:** All data comes from local mock JSON/JS files. No fetch calls, no Firebase, no Supabase.

---

## Design System & Visual Identity

### Brand

- **Name:** ReCircler
- **Logo:** Text-based for now (stylized "ReCircler" with a recycling-inspired accent, e.g., a circular arrow on the "R" or a leaf icon beside the name)
- **Tagline:** "Share more. Waste less."

### Colour Palette (Environment-Optimistic)

| Role             | Colour       | Hex       | Usage                                    |
|------------------|-------------|-----------|------------------------------------------|
| Primary          | Leaf Green  | `#4CAF50` | Buttons, links, active states            |
| Primary Light    | Mint Green  | `#E8F5E9` | Backgrounds, cards, highlights           |
| Primary Dark     | Forest Green| `#2E7D32` | Hover states, headings                   |
| Secondary        | Sky Blue    | `#42A5F5` | Accents, info badges, secondary actions  |
| Background       | Off-White   | `#FAFFFE` | Page backgrounds                         |
| Surface          | White       | `#FFFFFF` | Cards, modals, dropdowns                 |
| Text Primary     | Charcoal    | `#212121` | Body text                                |
| Text Secondary   | Grey        | `#757575` | Captions, placeholders                   |
| Success          | Green       | `#66BB6A` | Success toasts, completion states        |
| Warning          | Amber       | `#FFA726` | Warnings, pending states                 |
| Error            | Soft Red    | `#EF5350` | Errors, delete actions                   |
| Accent           | Earth Brown | `#8D6E63` | Badges, earthy accents                   |

### Typography

- **Headings:** Inter or Poppins (clean, modern, rounded)
- **Body:** Inter or system font stack
- **Sizes:** Follow Tailwind defaults (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.)

### Design Principles

- Clean, airy layouts with generous whitespace
- Rounded corners on cards and buttons (`rounded-xl` or `rounded-2xl`)
- Subtle shadows (`shadow-sm`, `shadow-md`) — not heavy drop shadows
- Consistent 8px spacing rhythm
- Mobile-first responsive design (but desktop is fine for prototype)
- Eco-friendly, optimistic, warm — NOT corporate or sterile
- Use emoji sparingly in UI for category labels and badges

---

## Project Structure

```
recircler-prototype/
├── public/
│   └── images/              # Placeholder item images, avatars
├── src/
│   ├── assets/              # Static assets (logo SVG, etc.)
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, Sidebar, PageWrapper
│   │   ├── common/          # Button, Card, Badge, Modal, SearchBar, StarRating
│   │   ├── items/           # ItemCard, ItemGrid, ItemDetail, ItemForm
│   │   ├── map/             # MapView, MapMarker, MapCluster
│   │   ├── messaging/       # ConversationList, ChatWindow, MessageBubble
│   │   ├── dashboard/       # StatsCard, ImpactChart, Leaderboard
│   │   └── profile/         # ProfileHeader, BadgeDisplay, ReviewList
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── BrowsePage.jsx
│   │   ├── ItemDetailPage.jsx
│   │   ├── CreateListingPage.jsx
│   │   ├── MapPage.jsx
│   │   ├── MessagesPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── DashboardPage.jsx         # Personal impact
│   │   ├── PlatformImpactPage.jsx    # Platform-wide stats
│   │   ├── RequestsPage.jsx          # Wishlist/requests
│   │   ├── CharitiesPage.jsx
│   │   ├── LeaderboardPage.jsx
│   │   ├── TransactionsPage.jsx
│   │   ├── AdminPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── data/
│   │   ├── mockUsers.js
│   │   ├── mockItems.js
│   │   ├── mockMessages.js
│   │   ├── mockTransactions.js
│   │   ├── mockCharities.js
│   │   ├── mockRequests.js
│   │   ├── mockBadges.js
│   │   └── mockStats.js
│   ├── context/
│   │   └── AuthContext.jsx   # Fake auth context (toggle logged in/out)
│   ├── hooks/                # Custom hooks if needed
│   ├── utils/
│   │   ├── categories.js     # Category list with icons/emojis
│   │   ├── co2Calculator.js  # CO2 savings formulas
│   │   └── formatters.js     # Date, distance, currency formatters
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css             # Tailwind imports + any global styles
├── tailwind.config.js
├── package.json
├── vite.config.js
└── README.md
```

---

## Feature Tiers

### Tier 1 — Core Features (Fully Interactive with Mock Data)

These pages should feel like a real app. Clicking through should tell the full story.

1. **Home Page** — Hero section, featured items grid, impact stats banner, "How it works" section, CTA to browse/list
2. **Browse & Search Page** — Item grid with filters (category, type, condition, distance, date), keyword search bar, toggle between grid and map view
3. **Item Detail Page** — Full item info, image gallery, owner mini-profile, "I'm Interested" button (opens mock conversation), estimated CO₂ savings badge, similar items section
4. **Create Listing Page** — Form with all fields (title, description, category, condition, images upload placeholder, type toggle donate/lend, date range for lend). Submitting shows a success toast — doesn't actually save.
5. **Map Page** — Full-screen Leaflet map with OpenStreetMap tiles. Dummy pins for items scattered around a chosen city (use Newcastle, UK as default location: lat 54.9783, lng -1.6178). Click pin → item preview popup. Category filter on map.
6. **User Profile Page** — View own profile with stats, badges, listed items, reviews received. View other users' profiles too.
7. **Messaging Page** — Conversation list sidebar + chat window. Hardcoded conversation threads with realistic messages about item pickups. Show unread indicators.
8. **Personal Dashboard** — Impact metrics (CO₂ saved, items shared, trees equivalent, money saved), visual charts (Recharts), badge progress, ranking.
9. **Login / Register Pages** — Forms that look real. "Logging in" just sets a mock auth state via context. Registration form collects name, email, password, location, bio.

### Tier 2 — Static Demo Pages (Visible, Navigable, But Minimal Interactivity)

These exist so the team can see the vision, but they don't need full mock logic.

10. **Transaction Management Page** — Static table/list showing mock transactions in various states (Pending, Accepted, In Progress, Completed, Cancelled). Click a transaction to see details. No state-change buttons needed (or fake ones that show toasts).
11. **Requests / Wishlist Page** — List of mock requests people have made. "Post a Request" button opens a form (can be non-functional or show a toast). Show "X people looking for this" badges.
12. **Charities Page** — Grid of pre-seeded charity cards with name, description, accepted categories, location. "Donate to Charity" flow can be a simple modal or toast.
13. **Platform-Wide Impact Page** — Big hero numbers (total CO₂ saved, total items shared, total users), charts, leaderboard preview. All hardcoded.
14. **Leaderboard Page** — Static ranked list (All-Time, Monthly, Weekly tabs). Hardcoded top users with avatars, stats, badges.
15. **Admin Panel** — Static dashboard with user count, item count, transaction count, and a mock table of users/items. No actual moderation actions needed.
16. **Rating & Review** — Show reviews on profile pages. A mock "Rate this transaction" modal can appear but doesn't need to enforce the mandatory flow.

---

## Mock Data Guidelines

- Use **realistic names, descriptions, and locations** around Newcastle, UK
- Item images: use placeholder image services (e.g., `https://picsum.photos/400/300?random=1`) or solid colour placeholders
- Include **15-20 mock items** across various categories, conditions, and types (donate/lend mix)
- Include **5-8 mock users** with different ratings, badge counts, and activity levels
- Include **3-5 mock conversations** with 5-10 messages each
- Include **5-10 mock transactions** in various states
- Include **5 pre-seeded charities** (Food Bank Network, Furniture Reuse Network, Tech for Good, Green Earth Recycling, Community Tool Library)
- CO₂ values per category: Furniture 50kg, Electronics 30kg, Tools 15kg, Clothing 10kg, Food 5kg, Books 3kg, Other 10kg, Sports & Recreation 12kg, Home & Garden 15kg

---

## Routing Map

| Path                        | Page                    | Tier |
|-----------------------------|-------------------------|------|
| `/`                         | HomePage                | 1    |
| `/browse`                   | BrowsePage              | 1    |
| `/items/:id`                | ItemDetailPage          | 1    |
| `/items/new`                | CreateListingPage       | 1    |
| `/map`                      | MapPage                 | 1    |
| `/profile/:id`              | ProfilePage             | 1    |
| `/profile/edit`             | EditProfilePage         | 1    |
| `/messages`                 | MessagesPage            | 1    |
| `/messages/:conversationId` | MessagesPage (with chat)| 1    |
| `/dashboard`                | DashboardPage           | 1    |
| `/login`                    | LoginPage               | 1    |
| `/register`                 | RegisterPage            | 1    |
| `/transactions`             | TransactionsPage        | 2    |
| `/requests`                 | RequestsPage            | 2    |
| `/charities`                | CharitiesPage           | 2    |
| `/impact`                   | PlatformImpactPage      | 2    |
| `/leaderboard`              | LeaderboardPage         | 2    |
| `/admin`                    | AdminPage               | 2    |
| `*`                         | NotFoundPage            | —    |

---

## Navigation Structure

### Main Navbar (always visible)

- Logo / ReCircler (links to `/`)
- Browse (links to `/browse`)
- Map (links to `/map`)
- Requests (links to `/requests`)
- Charities (links to `/charities`)
- **When logged in:** Messages (with unread badge), Profile dropdown (My Profile, Dashboard, My Transactions, Leaderboard, Settings, Logout)
- **When logged out:** Login / Register buttons
- "+ List an Item" prominent green CTA button

### Footer

- About ReCircler
- How It Works
- Platform Impact (links to `/impact`)
- Contact / Help
- Social media placeholders
- "Made with 💚 for the planet"

---

## Key Interactions to Prototype

1. **Login/Logout flow** — clicking Login fills mock auth context, UI updates to show logged-in state
2. **Browse with filters** — filters visually update the grid (can be simple JS filtering on mock data)
3. **Search** — typing in search bar filters items by title/description match
4. **Item detail → "I'm Interested"** — navigates to messages page with a pre-populated conversation
5. **Create listing form** — form validates and shows success toast on submit
6. **Map interaction** — click pins, see popups, filter by category
7. **Message sending** — type a message, it appears in the chat (local state only)
8. **Tab switching** — leaderboard tabs (All-Time/Monthly/Weekly), transaction status filters

---

## Important Notes for Claude Code

- **No backend. No API calls. No database.** Everything is mock data in JS files.
- **No localStorage/sessionStorage** for critical state — use React context and state.
- Use **placeholder images** — don't reference real images that might break.
- Every page should have a **consistent navbar and footer**.
- The prototype should be **runnable with `npm run dev`** immediately after setup.
- Keep components **modular and well-organised** — even though it's a prototype, the structure should reflect how the real app would be built.
- Prioritise **visual completeness** over functional completeness — it's better to have a beautiful page with mock data than an ugly page with working logic.
- Use **Tailwind's green palette** (`green-50` through `green-900`) as the foundation, supplemented by the custom colours in the design system above.
- Add **subtle animations** where appropriate (hover effects on cards, smooth page transitions) using Tailwind's transition utilities.