/* ─── Oomsi Brand Tokens v2.0 ─── */

export const C = {
  /* Primary */
  primary: "#34D399",       // Oomsi Sage — CTAs, active states, success
  primaryDeep: "#1B6B50",   // Deep Forest — primary buttons, headline accents
  primarySoft: "#6EE7B7",   // Soft sage
  pine: "#1B4332",          // Dark backgrounds, sidebar, footer

  /* Neutrals */
  bg: "#FAF7F2",            // Warm Linen — primary page background
  bgAccent: "#FFF9F0",      // Morning Light — card backgrounds, feature sections
  border: "#E8DFD1",        // Sand — borders, dividers
  ink: "#2A3330",           // Primary text, headings
  text: "#3D4A44",          // Body text
  textMid: "#6B7C74",       // Secondary text, descriptions
  textLight: "#97A79F",     // Tertiary text, placeholders
  white: "#FFFFFF",

  /* Accents */
  coral: "#E07A5F",         // Terracotta — alerts, urgent badges
  sky: "#7EB8DA",           // Pool Blue — links, info states
  violet: "#A78BFA",        // Lavender — AI/smart feature hints (use sparingly)
} as const;

export const F = {
  display: "'Instrument Serif', serif",          // H1, H2, taglines
  heading: "'Sora', sans-serif",                 // H3, H4, card titles, wordmark
  body: "'Plus Jakarta Sans', sans-serif",       // Body, UI, buttons, nav
  mono: "'JetBrains Mono', monospace",           // Metrics, stats, data
} as const;
