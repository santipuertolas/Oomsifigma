# Developer Handoff -- oomsi Marketing & Onboarding Flow

## Overview

The public-facing flow is fully built out with static/mock data. No backend, no auth, no real form submissions -- just the UI and navigation wired up. The user journey goes:

**Landing Page (`/`)** > **Sign Up (`/signup`)** > **Onboarding Wizard (`/onboarding`)** > **Dashboard (`/dashboard`)**

Returning users go through **Login (`/login`)** > **Dashboard (`/dashboard`)**

---

## Landing Page (`/`)

Single-page marketing site with anchor-scrolling sections: Hero, Platform Bar, Features (9-card grid), How It Works (4 steps), Pricing, Competitor Comparison, Testimonials, FAQ (accordion), Contact Us, and a Final CTA. Sticky nav with mobile hamburger menu.

Key things to know:

- **Pricing tiers are Starter ($5/property/mo), Professional ($9.90/property/mo), and Enterprise ($7.90/property/mo).** Starter and Professional CTAs both say "Start 14-Day Free Trial" and navigate to `/signup`. Enterprise CTA says "Contact Sales" and scrolls to the `#contact` section instead.
- **Contact section** has a form (name, email, subject dropdown, message) and displays `hello@oomsi.com`. The form currently just fires a `window.alert` on submit -- needs to be wired to an actual endpoint.
- **Footer links** for Product/Company/Resources scroll to the relevant anchor on the page. Legal links (Privacy Policy, Terms of Service, Cookie Policy, GDPR) navigate to their own routes.
- No "free tier" exists. All references to free plans have been removed. The only "free" language is about the 14-day trial.

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

Motto: **"Property Management. Made Simple."** -- used consistently in the hero, footer, signup branding panel, and login page.
