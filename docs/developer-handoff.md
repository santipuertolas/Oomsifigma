# Developer Handoff -- oomsi Marketing & Onboarding Flow

## Overview

The public-facing flow is fully built out with static/mock data. No backend, no auth, no real form submissions -- just the UI and navigation wired up. The user journey goes:

**Landing Page (`/`)** > **Sign Up (`/signup`)** > **Onboarding Wizard (`/onboarding`)** > **Dashboard (`/dashboard`)**

Returning users go through **Login (`/login`)** > **Dashboard (`/dashboard`)**

---

## Landing Page (`/`)

Single-page marketing site with anchor-scrolling sections. Sticky nav with mobile hamburger menu. Sections flow top-to-bottom:

1. **Sticky Navigation** -- Logo, section links, "Sign In" text link + "Start 14-Day Free Trial" filled teal button
2. **Hero** -- Two-column layout. Left: headline ("Every property has untapped potential. Oomsi unlocks it."), subheadline, "Start Your Free Trial" CTA + "See How It Works" secondary CTA, stats strip (15 min setup, 3 platforms, 24/7 WhatsApp). Right: oceanfront vacation property lifestyle image with floating metric widgets (92% occupancy, $34.2k revenue +18%).
3. **Social Proof Strip** -- Rotating testimonial quote with customer name/location, auto-cycles every 5 seconds
4. **Platform Integration Logos** -- Airbnb, Booking.com, VRBO, WhatsApp, Google (text-based logos, grayscale)
5. **Value Proposition Pillars** -- 3 columns: Earn More (BarChart icon), Work Less (Clock icon), Grow Faster (TrendingUp icon)
6. **Features Grid** -- 8 cards (2x4 on desktop) with benefit-oriented headlines (e.g., "All your properties, one view." not "Multi-Property Dashboard"). No "Coming Soon" cards.
7. **How It Works** -- 4 steps in alternating left/right layout with actual Oomsi product screenshots (Add Property, Connect Channels, Invite Team, Dashboard). CTA button at end of section.
8. **Pricing** -- Monthly/annual toggle (default: monthly). Three per-property tiers:
   - **Starter**: $18/property/mo, up to 3 properties, "Start 14-Day Free Trial" CTA
   - **Professional**: $14/property/mo, up to 20 properties, highlighted as "Most Popular", "Start 14-Day Free Trial" CTA
   - **Enterprise**: $12/property/mo, 20+ properties, "Contact Sales" CTA scrolls to #contact
   - Annual toggle shows strikethrough on monthly price + equivalent monthly price ($15/$11.67/$10) with "Save 17%" badge
   - Followed by "How we compare" table (oomsi vs Industry Average)
9. **Testimonials** -- 3 cards (Marco Rossi, Sarah Chen, David Muller) with 5-star ratings, quotes, photos, and "Read their story" links
10. **FAQ** -- 7 accordion items including "Is there a free trial?" and "Do you charge booking fees?"
11. **Contact** -- Form (name, email, subject dropdown, message) + hello@oomsi.com. Form currently just fires `window.alert`.
12. **Final CTA** -- Dark teal block with "Ready to unlock your property's full potential?" headline. "Start Your Free Trial" + "View Pricing" links.
13. **Footer** -- Mission: "Helping property owners unlock the full earning potential of their properties." Four columns: Product, Company, Resources (includes Blog), Legal.

Key design decisions:
- **CTA consistency**: "Start 14-Day Free Trial" is the primary CTA on pricing cards and nav. Hero and final CTA use "Start Your Free Trial".
- **No "Coming Soon" features** shown in the features grid (Enterprise pricing card does list "Guest check-in (coming soon)")
- **Per-property pricing** -- not flat monthly
- **Lifestyle images** in the hero (oceanfront property). Product screenshots in How It Works section.
- **Tighter section spacing** compared to original version (~30% reduction in vertical padding)

## Legal Pages (`/privacy`, `/terms`, `/cookies`, `/gdpr`)

All four share a single component (`LegalPage.tsx`) that reads `useLocation().pathname` to determine which content to render. The content is hardcoded in a `legalContent` record -- placeholder legal copy, not lawyer-reviewed. Each page has a "Back to oomsi" link that navigates to `/`.

## Sign Up (`/signup`)

Split layout -- branded panel on the left (desktop only), form on the right. Collects first name, last name, email, password, company (optional), and a property count selector (1-2, 3-5, 6-20, 20+). Google and Apple OAuth buttons are mocked. On submit, it just navigates to `/onboarding` with no validation or data persistence.

## Onboarding Wizard (`/onboarding`)

Multi-step wizard (Add Property > Connect Channels > Invite Team). All steps are client-side only with local state. Completing the wizard navigates to `/dashboard`. The "Skip" option on each step also advances to the next step or dashboard.

## Login (`/login`)

Simple email/password form. No real auth -- any submission navigates to `/dashboard`. Google and Apple OAuth buttons are mocked.

---

## What Needs to Be Built

1. **Auth** -- real signup/login/OAuth flows (all currently mocked with `navigate()`)
2. **Contact form submission** -- currently just an alert, needs an API or email service behind it
3. **Onboarding data persistence** -- wizard collects property/channel/team data but doesn't save it anywhere
4. **Legal copy review** -- content is placeholder, needs legal sign-off before going live
5. **Trial logic** -- the 14-day trial is only a label right now, no billing or expiration logic exists
6. **Platform logos** -- currently text-based, should be replaced with actual brand logos (SVG/PNG)
7. **"Read their story" links** -- testimonial cards link nowhere, need case study pages or removal
8. **Social proof animation** -- currently a hard content swap, could benefit from a fade/slide transition

---

## Brand Reference

| Token            | Value     | Usage                        |
| ---------------- | --------- | ---------------------------- |
| Deep Forest Teal | `#264653` | Headers, nav, headings       |
| Persian Green    | `#2A9D8F` | Primary actions, CTAs, links |
| Soft Periwinkle  | `#A29BFE` | AI highlights, accents       |
| Warm Sand        | `#E9C46A` | Success/status, stars        |
| Vapor White      | `#F8F9FA` | Page backgrounds             |
| Slate Grey       | `#2D3436` | Body text                    |
| Nunito           | --        | Headings                     |
| Inter            | --        | Body/UI                      |

Tagline: **"Every property has untapped potential. Oomsi unlocks it."** -- used in the hero section.

Mission: **"Helping property owners unlock the full earning potential of their properties."** -- used in the footer.
