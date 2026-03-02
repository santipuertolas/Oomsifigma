# Developer Handoff -- oomsi Property Management Platform

> Last updated: March 2, 2026

## Overview

oomsi is a B2B SaaS property management tool for short-term rental owners. The full prototype is built in React + Tailwind CSS v4 with React Router (data mode). Everything is static/mock -- no backend, no auth, no persistence. Your job is to make it real.

**User Journey:**

```
Landing Page (/) --> Sign Up (/signup) --> Onboarding Wizard (/onboarding) --> Dashboard (/dashboard)
Returning users: Login (/login) --> Dashboard (/dashboard)
```

**Mission statement:** "Helping property owners unlock the full earning potential of their properties."

---

## Tech Stack

| Layer        | Current                     | Notes                                         |
| ------------ | --------------------------- | --------------------------------------------- |
| Framework    | React 18 + Vite 6           | Single-page app, no SSR                       |
| Routing      | React Router 7 (data mode)  | `createBrowserRouter` in `/src/app/routes.ts`  |
| Styling      | Tailwind CSS v4             | Theme tokens in `/src/styles/theme.css`        |
| Icons        | lucide-react                | Used throughout all components                 |
| Fonts        | Nunito (headings) + Inter (body) | Imported via Google Fonts in `/src/styles/fonts.css` |
| UI Libraries | Radix primitives, shadcn/ui | Pre-installed, used selectively                |
| Animations   | motion (Framer Motion)      | Installed but not yet used                     |

---

## Brand System

| Token            | Hex       | Usage                               |
| ---------------- | --------- | ----------------------------------- |
| Deep Forest Teal | `#264653` | Sidebar, headings, nav background   |
| Persian Green    | `#2A9D8F` | Primary CTAs, links, success states |
| Soft Periwinkle  | `#A29BFE` | AI features, accents, badges        |
| Warm Sand        | `#E9C46A` | Stars, warnings, status indicators  |
| Vapor White      | `#F8F9FA` | Page backgrounds                    |
| Slate Grey       | `#2D3436` | Body text                           |

**Fonts:** Nunito for headings (`fontWeight: 700-800`), Inter for body/UI (`fontWeight: 400-600`).

Colors and fonts are currently applied via inline styles using constants (`C` and `F` objects) in each component rather than Tailwind theme tokens. Consider migrating to CSS custom properties in `theme.css` for consistency.

---

## File Structure

```
/src
├── app/
│   ├── App.tsx                    # Root -- just <RouterProvider>
│   ├── routes.ts                  # All route definitions
│   ├── components/
│   │   ├── Layout.tsx             # Dashboard shell (sidebar + mobile nav + <Outlet>)
│   │   ├── Sidebar.tsx            # Collapsible desktop sidebar nav
│   │   ├── MobileNav.tsx          # Mobile hamburger nav
│   │   ├── WelcomeHeader.tsx      # Dashboard greeting + stat cards
│   │   ├── Recommendations.tsx    # Collapsible growth recommendations engine
│   │   ├── NeedsAssignment.tsx    # Unassigned tasks requiring action
│   │   ├── CleanerTasks.tsx       # Today's cleaning schedule
│   │   ├── UnifiedCalendar.tsx    # Monthly booking calendar
│   │   ├── AIConciergeInbox.tsx   # AI-drafted guest message previews
│   │   ├── ui/                    # shadcn/ui primitives
│   │   └── figma/                 # Figma-imported helpers (do not modify)
│   └── pages/
│       ├── LandingPage.tsx        # Marketing site (/)
│       ├── SignupPage.tsx         # Registration form (/signup)
│       ├── LoginPage.tsx          # Login form (/login)
│       ├── OnboardingPage.tsx     # Multi-step wizard (/onboarding)
│       ├── LegalPage.tsx          # Shared legal pages (/privacy, /terms, /cookies, /gdpr)
│       ├── DashboardPage.tsx      # Main dashboard (/dashboard)
│       ├── CalendarPage.tsx       # Full calendar view (/dashboard/calendar)
│       ├── InboxPage.tsx          # Guest messaging (/dashboard/inbox)
│       ├── PropertiesPage.tsx     # Property management (/dashboard/properties)
│       ├── TeamPage.tsx           # Team management (/dashboard/team)
│       ├── TasksPage.tsx          # Task management (/dashboard/tasks)
│       ├── SettingsPage.tsx       # Settings (/dashboard/settings)
│       ├── HelpPage.tsx           # Help center (/dashboard/help)
│       └── ProfilePage.tsx        # User profile (/dashboard/profile)
├── styles/
│   ├── fonts.css                  # Google Fonts imports
│   ├── theme.css                  # Tailwind v4 theme tokens + base styles
│   ├── tailwind.css               # Tailwind directives
│   └── index.css                  # Global styles
└── imports/                       # Figma-imported assets (SVGs, markdown)
```

---

## Route Map

| Path               | Component          | Auth Required | Notes                              |
| ------------------- | ------------------ | ------------- | ---------------------------------- |
| `/`                 | LandingPage        | No            | Marketing site                     |
| `/signup`           | SignupPage         | No            | Registration                       |
| `/login`            | LoginPage          | No            | Login                              |
| `/onboarding`       | OnboardingPage     | Yes           | Post-signup wizard                 |
| `/privacy`          | LegalPage          | No            | Shared component, reads pathname   |
| `/terms`            | LegalPage          | No            | "                                  |
| `/cookies`          | LegalPage          | No            | "                                  |
| `/gdpr`             | LegalPage          | No            | "                                  |
| `/dashboard`        | Layout > DashboardPage | Yes       | Main dashboard                     |
| `/dashboard/calendar` | Layout > CalendarPage | Yes     | Full calendar                      |
| `/dashboard/inbox`  | Layout > InboxPage | Yes           | Guest messaging                    |
| `/dashboard/properties` | Layout > PropertiesPage | Yes | Property CRUD                      |
| `/dashboard/team`   | Layout > TeamPage  | Yes           | Team management                    |
| `/dashboard/tasks`  | Layout > TasksPage | Yes           | Task management                    |
| `/dashboard/settings` | Layout > SettingsPage | Yes     | Account settings                   |
| `/dashboard/help`   | Layout > HelpPage  | Yes           | Help center                        |
| `/dashboard/profile` | Layout > ProfilePage | Yes       | User profile                       |

All `/dashboard/*` routes render inside `Layout.tsx` which provides the sidebar + mobile nav chrome.

---

## Page-by-Page Details

### Landing Page (`/`)

Single-page marketing site with anchor-scrolling sections and sticky nav. Section order:

1. **Sticky Nav** -- Logo, section anchor links, "Sign In" text link + "Start 14-Day Free Trial" filled button
2. **Hero** -- Two-column. Left: headline ("Every property has untapped potential. Oomsi unlocks it."), stats strip (15 min setup, 3 platforms, 24/7 WhatsApp). Right: lifestyle image with floating metric widgets
3. **Social Proof Strip** -- Auto-rotating testimonial quotes (5s interval, hard swap -- needs fade transition)
4. **Platform Logos** -- Airbnb, Booking.com, VRBO, WhatsApp, Google (text-based placeholders -- need real SVGs)
5. **Value Props** -- 3 columns: Earn More, Work Less, Grow Faster
6. **Features Grid** -- 8 benefit-oriented cards (2x4 desktop)
7. **How It Works** -- 4 alternating steps with Unsplash placeholder images (need real product screenshots)
8. **Pricing** -- Monthly/annual toggle. Per-property pricing:
   - Starter: $18/prop/mo (up to 3 properties)
   - Professional: $14/prop/mo (up to 20, highlighted "Most Popular")
   - Enterprise: $12/prop/mo (20+, "Contact Sales")
   - Annual: ~17% discount, strikethrough pricing
9. **Testimonials** -- 3 cards with photos, ratings, quotes
10. **FAQ** -- 7 accordion items
11. **Contact** -- Form (name, email, subject, message) -- currently `window.alert` on submit
12. **Final CTA** -- Dark teal block with trial CTA
13. **Footer** -- Mission statement, 4 link columns (Product, Company, Resources, Legal)

### Sign Up (`/signup`)

Split layout: branded panel (left, desktop) + form (right). Collects: first name, last name, email, password, company (optional), property count selector. Google/Apple OAuth buttons mocked. Submit navigates to `/onboarding` with no validation.

### Login (`/login`)

Email/password form. Any submission navigates to `/dashboard`. OAuth buttons mocked.

### Onboarding (`/onboarding`)

3-step wizard: Add Property > Connect Channels > Invite Team. All client-side state only. Skip advances to next step/dashboard.

### Legal Pages (`/privacy`, `/terms`, `/cookies`, `/gdpr`)

Single `LegalPage.tsx` reads `useLocation().pathname` to render appropriate content. Placeholder copy -- not lawyer-reviewed.

### Dashboard (`/dashboard`)

Main operational view. Component render order:

1. **WelcomeHeader** -- Time-based greeting, 3 stat cards (Active Listings, Bookings This Month, Occupancy Rate)
2. **Recommendations** -- Collapsible growth engine (see dedicated section below)
3. **NeedsAssignment** -- Urgent unassigned tasks requiring immediate action
4. **CleanerTasks** -- Today's cleaning/turnover schedule with status tracking
5. **UnifiedCalendar** -- Monthly view with color-coded booking bars by channel
6. **AIConciergeInbox** -- AI-drafted reply previews for recent guest messages

### Dashboard Sub-pages

Each has its own mock data and functional UI:
- **Calendar** -- Full monthly calendar with booking management
- **Inbox** -- Guest messaging with AI reply suggestions
- **Properties** -- Property listing with details, photos, channel connections
- **Team** -- Cleaner/staff management with assignments
- **Tasks** -- Task board/list with status tracking
- **Settings** -- Account, notification, integration settings
- **Help** -- FAQ and support contact
- **Profile** -- User profile editing

---

## Recommendations Widget -- Detailed Spec

**File:** `/src/app/components/Recommendations.tsx`

### Purpose
Guides users through 4 growth stages (Getting Started > Growing > Optimizing > Scaling) with prioritized, actionable recommendations. Each shows revenue uplift, effort level, and a CTA routing to the relevant dashboard page.

### Behavior

**Two display modes:**

1. **Expanded** -- Full view with journey progress bar, stage indicators, featured top recommendation card, and compact list of next 4 recommendations. Shows when user has < 3 completions or manually expands.

2. **Collapsed** -- Slim single-line bar showing:
   - Lightbulb icon + "Unlock More Revenue" title
   - Progress percentage + mini progress bar
   - Next recommendation title + revenue uplift teaser
   - Quick-action button for the top recommendation
   - Click anywhere to expand

**Auto-collapse logic:**
- Threshold: `AUTO_COLLAPSE_THRESHOLD = 3` completed recommendations
- On first visit with < 3 completions: starts expanded
- After completing 3+ items: auto-collapses
- User can manually toggle; preference persists via `localStorage` key `oomsi_recs_collapsed`
- Manual toggle overrides auto-collapse (won't re-expand automatically)

**Position:** Always at top of dashboard (after WelcomeHeader), in both collapsed and expanded states.

### Data Model

```typescript
interface Recommendation {
  id: string;
  title: string;
  description: string;
  revenueUplift: string;      // e.g., "+35%", "+$2.4k"
  revenueDetail: string;      // e.g., "more bookings from dual-channel listing"
  effort: "easy" | "medium" | "hard";
  effortTime: string;         // e.g., "15 min", "Upgrade to Business"
  category: "setup" | "channels" | "pricing" | "operations" | "growth";
  stage: "getting-started" | "growing" | "optimizing" | "scaling";
  status: "todo" | "in-progress" | "completed" | "dismissed";
  icon: LucideIcon;
  actionLabel: string;        // CTA button text
  actionRoute: string;        // Dashboard route to navigate to
  priority: number;           // Lower = higher priority (within stage)
}
```

### Current Mock Recommendations (11 total)

| ID  | Stage           | Title                           | Uplift     | Effort | Status      |
| --- | --------------- | ------------------------------- | ---------- | ------ | ----------- |
| r1  | Getting Started | Complete your property profiles  | +23%       | Easy   | Completed   |
| r2  | Getting Started | Invite your cleaning team       | +8%        | Easy   | Completed   |
| r3  | Getting Started | Connect your first channel      | +12%       | Easy   | Completed   |
| r4  | Growing         | Add Booking.com as a channel    | +35%       | Easy   | Todo        |
| r5  | Growing         | Enable smart pricing            | +30%       | Easy   | Todo        |
| r6  | Growing         | Set up WhatsApp notifications   | +5%        | Easy   | In Progress |
| r7  | Growing         | Add VRBO to your channels       | +20%       | Medium | Todo        |
| r8  | Optimizing      | Launch direct booking website   | +15-20%    | Medium | Todo        |
| r9  | Optimizing      | Review your pricing strategy    | +$2.4k     | Medium | Todo        |
| r10 | Optimizing      | Set up cleaning photo requirements | +4.8 stars | Easy | Todo       |
| r11 | Scaling         | Enable advanced analytics       | +40%       | Hard   | Todo        |

### Sorting Logic
1. Current stage recommendations first, then next stages
2. Within a stage, sorted by `priority` (ascending)
3. Completed and dismissed items are filtered out of active list

### What Needs to Change
- **Replace mock data** with real user state from the backend (which steps they've actually completed)
- **Revenue uplift values** should eventually be personalized based on user's property portfolio
- **Stage progression** should be computed server-side based on actual feature adoption
- **Dismissed state** should persist to the backend, not just component state

### Exported Hook
`useRecommendationsCollapsed()` -- reads localStorage to determine collapsed state. Currently exported but unused after we simplified positioning. Can be removed or repurposed if needed.

---

## What Needs to Be Built (Priority Order)

### P0 -- Critical Path

1. **Authentication**
   - Real signup/login flows (email + password)
   - Google and Apple OAuth (buttons exist, currently mocked)
   - Session management, protected route guards for `/dashboard/*` and `/onboarding`
   - Password reset flow (no UI exists yet)

2. **Database & Data Model**
   - User accounts (name, email, company, plan)
   - Properties (name, address, photos, amenities, check-in instructions, channel connections)
   - Bookings (guest, property, dates, channel source, status)
   - Team members (name, role, contact, assigned properties)
   - Tasks (type, property, assignee, date, status)
   - Messages (guest, property, content, AI draft, read status)
   - Recommendations state (per-user completion/dismissal status)

3. **Onboarding Data Persistence**
   - Wizard currently collects property/channel/team data but discards it
   - Needs to save to database and pre-populate the dashboard

### P1 -- Core Functionality

4. **Real-time Dashboard Data**
   - Replace all hardcoded mock data in dashboard widgets with live queries
   - WelcomeHeader stats (active listings, bookings, occupancy) from real data
   - CleanerTasks from today's actual task schedule
   - UnifiedCalendar from real booking data
   - NeedsAssignment from tasks with no assignee
   - AIConciergeInbox from actual guest messages

5. **Recommendations Engine Backend**
   - Persist completion/dismissal state per user
   - Compute growth stage from actual feature adoption
   - Eventually: personalize uplift estimates based on portfolio data

6. **Contact Form Submission**
   - Currently fires `window.alert()` -- needs email service or CRM integration

7. **Trial & Billing Logic**
   - 14-day free trial is just a label
   - Needs plan selection, trial countdown, payment integration (Stripe?)
   - Property count enforcement per plan tier

### P2 -- Polish

8. **Landing Page Improvements**
   - Replace text-based platform logos with real SVG brand logos
   - Replace Unsplash images in "How It Works" with actual product screenshots
   - Add fade/slide transitions to social proof rotation
   - "Read their story" testimonial links go nowhere -- need case study pages or remove links
   - Add scroll-based animations (motion library is installed but unused)

9. **Legal Copy**
   - All 4 legal pages contain placeholder text -- needs actual lawyer-reviewed copy

10. **Responsive Refinements**
    - Dashboard is functional on mobile but could use more testing/polish
    - Sidebar collapses to mobile nav on `lg:` breakpoint

---

## Dashboard Component Layout

```
┌─────────────────────────────────────────────────────┐
│ Layout.tsx                                          │
│ ┌──────────┬──────────────────────────────────────┐ │
│ │ Sidebar  │  <main>                              │ │
│ │ (desktop)│  ┌──────────────────────────────────┐│ │
│ │          │  │ WelcomeHeader                    ││ │
│ │ nav:     │  │ (greeting + 3 stat cards)        ││ │
│ │ Dashboard│  ├──────────────────────────────────┤│ │
│ │ Calendar │  │ Recommendations                  ││ │
│ │ Inbox (3)│  │ (collapsed: slim bar)            ││ │
│ │ Properties│ │ (expanded: full engine)           ││ │
│ │ Team     │  ├──────────────────────────────────┤│ │
│ │ Tasks    │  │ NeedsAssignment                  ││ │
│ │          │  │ (urgent unassigned tasks)         ││ │
│ │ ──────── │  ├──────────────────────────────────┤│ │
│ │ Settings │  │ CleanerTasks                     ││ │
│ │ Help     │  │ (today's schedule)               ││ │
│ │          │  ├──────────────────────────────────┤│ │
│ │ Profile  │  │ UnifiedCalendar                  ││ │
│ │ Logout   │  │ (monthly booking view)           ││ │
│ │          │  ├──────────────────────────────────┤│ │
│ │          │  │ AIConciergeInbox                 ││ │
│ │          │  │ (AI-drafted guest replies)        ││ │
│ │          │  └──────────────────────────────────┘│ │
│ └──────────┴──────────────────────────────────────┘ │
│ MobileNav (hamburger, visible < lg)                 │
└─────────────────────────────────────────────────────┘
```

---

## Pricing Model Reference

| Plan         | Monthly      | Annual (per month) | Properties | CTA                      |
| ------------ | ------------ | ------------------ | ---------- | ------------------------ |
| Starter      | $18/prop/mo  | $15/prop/mo        | Up to 3    | Start 14-Day Free Trial  |
| Professional | $14/prop/mo  | $11.67/prop/mo     | Up to 20   | Start 14-Day Free Trial  |
| Enterprise   | $12/prop/mo  | $10/prop/mo        | 20+        | Contact Sales            |

Annual pricing shows strikethrough on monthly price + "Save 17%" badge. All plans include 14-day free trial. Enterprise "Contact Sales" scrolls to `#contact` section.

---

## Environment & Dev Notes

- **No `.env` or secrets** exist yet -- you'll need to set up environment variables for auth providers, database connection, email service, etc.
- **No tests** exist -- consider adding as you build real functionality
- **Tailwind v4** -- uses `@theme inline` blocks in CSS, no `tailwind.config.js`. If you need custom theme values, add them to `/src/styles/theme.css`
- **Protected files** -- do not modify `/src/app/components/figma/ImageWithFallback.tsx` or `/pnpm-lock.yaml`
- **Package manager** -- pnpm
- **Date formatting** -- `date-fns` is installed
- The codebase uses inline styles heavily for brand colors/fonts via `C` and `F` constants. This works but doesn't scale well -- consider migrating to Tailwind custom properties or CSS variables as you refactor.
