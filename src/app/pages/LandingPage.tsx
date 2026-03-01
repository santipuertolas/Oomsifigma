import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight, Check, ChevronDown, ChevronRight,
  Calendar, Home, MessageSquare, Users, Sparkles,
  Shield, Smartphone, Bell, Globe, Star,
  Building2, ClipboardCheck, Zap, Camera, Menu, X,
  Mail, Send,
} from "lucide-react";

/* ─── Brand Tokens ─── */
const C = {
  teal: "#264653",
  green: "#2A9D8F",
  periwinkle: "#A29BFE",
  sand: "#E9C46A",
  white: "#F8F9FA",
  slate: "#2D3436",
};

const F = {
  heading: "Nunito, sans-serif",
  body: "Inter, sans-serif",
};

/* ─── Images ─── */
const heroVilla = "https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2YWNhdGlvbiUyMHZpbGxhJTIwcG9vbCUyMHN1bnNldHxlbnwxfHx8fDE3NzIzNjQ0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const beachApt = "https://images.unsplash.com/photo-1768568080838-99d3db4ec953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWFjaCUyMGFwYXJ0bWVudCUyMHJlbnRhbHxlbnwxfHx8fDE3NzIzNjQ0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const chaletImg = "https://images.unsplash.com/photo-1603039531759-1a1bbe4f9f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbW91bnRhaW4lMjBjaGFsZXQlMjBpbnRlcmlvciUyMGZpcmVwbGFjZXxlbnwxfHx8fDE3NzIzNjQ0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const testimonial1 = "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMHBvcnRyYWl0JTIwYnVzaW5lc3N8ZW58MXx8fHwxNzcyMzY0NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const testimonial2 = "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXQlMjBzbWlsaW5nfGVufDF8fHx8MTc3MjM2NDQwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const cleanerImg = "https://images.unsplash.com/photo-1701651545983-c3b357a8387f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGNsZWFuaW5nJTIwc3RhZmYlMjBob3VzZWtlZXBlciUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyMzY0NDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

/* ─── Data ─── */

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const heroStats = [
  { value: "15 min", label: "Setup time" },
  { value: "3", label: "Platforms supported" },
  { value: "24/7", label: "WhatsApp alerts" },
  { value: "Simple", label: "By design" },
];

const features = [
  {
    icon: Home,
    title: "Multi-Property Dashboard",
    description: "See all your properties in one place — occupancy, revenue, and today's tasks at a glance. No more switching between tabs.",
    color: C.green,
  },
  {
    icon: Calendar,
    title: "Unified Calendar & Bookings",
    description: "One calendar for all your properties with colour-coded booking sources, direct bookings, blocked dates, and no more double bookings.",
    color: C.teal,
  },
  {
    icon: Globe,
    title: "Multi-Platform Sync",
    description: "Connect Airbnb, Booking.com, and VRBO. Your calendars, bookings, and rates stay in sync automatically — every hour, hands-free.",
    color: C.periwinkle,
  },
  {
    icon: ClipboardCheck,
    title: "Cleaning & Operations",
    description: "A cleaning task is created automatically after every checkout. Your team uploads photos, you review them — all in one place.",
    color: C.sand,
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Invite your cleaners and maintenance staff. Assign them to properties, track their work, and manage hourly rates effortlessly.",
    color: C.green,
  },
  {
    icon: Smartphone,
    title: "Cleaner Portal",
    description: "Your cleaning team gets their own mobile portal. They see their tasks, accept or decline, and upload photos — no app install needed.",
    color: C.teal,
  },
  {
    icon: Bell,
    title: "WhatsApp Notifications",
    description: "Task assignments, morning briefings, day-before reminders, and urgent pre-checkin alerts — all delivered straight to WhatsApp.",
    color: C.periwinkle,
  },
  {
    icon: Shield,
    title: "Secure & Simple",
    description: "Your admin dashboard is separate from the cleaner portal. Invite-only access, so only your team can see your data.",
    color: C.slate,
  },
  {
    icon: Sparkles,
    title: "Guest Check-in (Coming Soon)",
    description: "Automatically send guests a digital check-in link. ID verification and tourist tax collection — all handled for you.",
    color: C.sand,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Add Your Properties",
    description: "Import from Airbnb or add manually. Set up bedrooms, check-in times, WiFi info, and cleaning photo requirements in minutes.",
    image: heroVilla,
  },
  {
    step: "02",
    title: "Connect Your Channels",
    description: "Link Airbnb, Booking.com, and VRBO in a few clicks. Your bookings, rates, and availability sync automatically every hour.",
    image: beachApt,
  },
  {
    step: "03",
    title: "Build Your Team",
    description: "Invite your cleaners and maintenance staff by email. Assign them to properties with primary and backup roles.",
    image: cleanerImg,
  },
  {
    step: "04",
    title: "Let It Run",
    description: "Sit back. Cleaning tasks are created after every checkout, your team gets WhatsApp notifications, and your calendar stays perfectly in sync.",
    image: chaletImg,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "5",
    period: "per property / month",
    description: "Great for hosts just getting started",
    properties: "Up to 3",
    highlight: false,
    features: [
      "Multi-property dashboard",
      "Unified calendar",
      "1 channel connection",
      "Basic cleaning task management",
      "1 team member",
      "Cleaner portal access",
      "Email support",
    ],
    cta: "Start 14-Day Free Trial",
  },
  {
    name: "Professional",
    price: "9.90",
    period: "per property / month",
    description: "For hosts scaling their portfolio",
    properties: "Up to 20",
    highlight: true,
    features: [
      "Everything in Starter",
      "Unlimited channel connections",
      "WhatsApp notifications",
      "Cleaning photo gallery",
      "Unlimited team members",
      "Unassigned task alerts",
      "Booking widget for your website",
      "Priority email & chat support",
    ],
    cta: "Start 14-Day Free Trial",
  },
  {
    name: "Enterprise",
    price: "7.90",
    period: "per property / month",
    description: "For property management companies",
    properties: "20+ properties",
    highlight: false,
    features: [
      "Everything in Professional",
      "Volume discount pricing",
      "Guest check-in (coming soon)",
      "Custom integrations",
      "Dedicated account manager",
      "White-label option",
      "Phone support",
    ],
    cta: "Contact Sales",
  },
];

const testimonials = [
  {
    name: "Marco Rossi",
    role: "12 properties · Lake Como, Italy",
    image: testimonial1,
    quote: "We cut our cleaning coordination time by 70% in the first month. The WhatsApp automation alone is worth the subscription — our cleaners actually prefer it over the old group chat.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "8 properties · Bali, Indonesia",
    image: testimonial2,
    quote: "Coming from Smoobu, the pricing was a no-brainer. But what really sold me was the cleaner portal — my team finally has a proper tool instead of scattered messages.",
    rating: 5,
  },
  {
    name: "David Müller",
    role: "25 properties · Costa del Sol, Spain",
    image: testimonial1,
    quote: "The unified calendar with colour-coded sources is exactly what I needed. No more double bookings, no more spreadsheets. oomsi just works.",
    rating: 5,
  },
];

const comparisonData = [
  { feature: "Starting price", oomsi: "From $5/property", competitor: "From €27.51/property" },
  { feature: "Channel connections", oomsi: "Unlimited (Pro)", competitor: "Limited by plan" },
  { feature: "WhatsApp notifications", oomsi: "Included (Pro)", competitor: "Not available" },
  { feature: "Cleaner portal", oomsi: "Included (all plans)", competitor: "Not available" },
  { feature: "Cleaning photo gallery", oomsi: "Included (Pro)", competitor: "Not available" },
  { feature: "Team members", oomsi: "Unlimited (Pro)", competitor: "Extra cost" },
  { feature: "Guest check-in", oomsi: "Coming soon", competitor: "Add-on" },
];

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations"],
  Company: ["About", "Contact"],
  Resources: ["Help Center", "Documentation"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

/* ─── Component ─── */

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does oomsi compare to other PMS tools?",
      a: "oomsi gives you the same core features as the big players — calendar sync, channel management, team coordination — at a fraction of the price. Starting at just $5 per property. Plus, we include a dedicated cleaner portal and WhatsApp notifications that most competitors don't offer.",
    },
    {
      q: "Can I import my properties from Airbnb?",
      a: "Yes! Connect your Airbnb account and we'll automatically import all your listings, including photos, descriptions, and pricing. You can also add properties manually.",
    },
    {
      q: "How do WhatsApp notifications work?",
      a: "When a cleaning task is created, your team gets a WhatsApp message with all the details — the property, the cleaning window, and any special instructions. They can accept or decline right from the chat, and even send back cleaning photos.",
    },
    {
      q: "Is there a contract or commitment?",
      a: "No contracts. All plans are month-to-month and you can cancel anytime. Both Starter and Professional include a 14-day free trial so you can try everything risk-free.",
    },
    {
      q: "What booking platforms can I connect?",
      a: "We support Airbnb, Booking.com, and VRBO with full two-way sync. You can also connect any other platform using a simple iCal link for calendar syncing.",
    },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: C.white }}>
      {/* ═══ NAV ═══ */}
      <nav
        className="sticky top-0 z-50"
        style={{ backgroundColor: "rgba(248,249,250,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ fontFamily: F.heading, fontSize: "1.5rem", fontWeight: 800, color: C.teal }}
            >
              oomsi
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, fontWeight: 500, opacity: 0.7 }}
                  className="hover:opacity-100 transition-opacity"
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-100"
                style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.teal, fontWeight: 500 }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2 rounded-lg text-white transition-all hover:opacity-90"
                style={{ backgroundColor: C.green, fontFamily: F.body, fontSize: "0.8125rem", fontWeight: 600 }}
              >
                Try It Free
              </button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} style={{ color: C.teal }} /> : <Menu size={24} style={{ color: C.teal }} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2" style={{ backgroundColor: "rgba(248,249,250,0.98)" }}>
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="block w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-100"
                style={{ fontFamily: F.body, fontSize: "0.875rem", color: C.slate, fontWeight: 500 }}
              >
                {l.label}
              </button>
            ))}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => navigate("/login")}
                className="flex-1 py-2.5 rounded-lg border"
                style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.teal, fontWeight: 500, borderColor: "#E5E7EB" }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="flex-1 py-2.5 rounded-lg text-white"
                style={{ backgroundColor: C.green, fontFamily: F.body, fontSize: "0.8125rem", fontWeight: 600 }}
              >
                Try It Free
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Decorative elements */}
        <div
          className="absolute top-20 -right-32 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ backgroundColor: C.green }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-[0.04]"
          style={{ backgroundColor: C.periwinkle }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{ backgroundColor: C.green + "12", border: `1px solid ${C.green}25` }}
              >
                <Sparkles size={12} style={{ color: C.green }} />
                <span style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.green, fontWeight: 600 }}>
                  The #1 affordable PMS for vacation rentals
                </span>
              </div>

              <h1
                style={{
                  fontFamily: F.heading,
                  fontSize: "clamp(2rem, 5vw, 3.25rem)",
                  fontWeight: 800,
                  color: C.teal,
                  lineHeight: 1.15,
                  marginBottom: "1.25rem",
                }}
              >
                Property management.{" "}
                <span style={{ color: C.green }}>Made simple.</span>
              </h1>

              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "1.0625rem",
                  color: C.slate,
                  opacity: 0.6,
                  lineHeight: 1.7,
                  maxWidth: "520px",
                  marginBottom: "2rem",
                }}
              >
                One dashboard for all your properties, calendars, cleaning teams, and guest messages.
                Connect Airbnb, Booking.com & VRBO — automate everything else.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <button
                  onClick={() => navigate("/signup")}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:opacity-90"
                  style={{ backgroundColor: C.green, color: "white", fontFamily: F.body, fontSize: "1rem", fontWeight: 600 }}
                >
                  Start Your 14-Day Trial
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => scrollTo("#how-it-works")}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl transition-colors hover:bg-gray-100"
                  style={{
                    fontFamily: F.body,
                    fontSize: "0.9375rem",
                    color: C.teal,
                    fontWeight: 500,
                    border: "1px solid #E5E7EB",
                  }}
                >
                  See How It Works
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Social proof stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <p style={{ fontFamily: F.heading, fontSize: "1.375rem", color: C.teal, fontWeight: 700 }}>
                      {s.value}
                    </p>
                    <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.4 }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — hero visual */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(38,70,83,0.12)" }}>
                <img src={heroVilla} alt="Luxury vacation rental" className="w-full h-auto object-cover" />
              </div>
              {/* Floating card — occupancy */}
              <div
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-xl p-4"
                style={{ boxShadow: "0 8px 30px rgba(38,70,83,0.1)" }}
              >
                <p style={{ fontFamily: F.body, fontSize: "0.625rem", color: C.slate, opacity: 0.4 }}>This Month</p>
                <p style={{ fontFamily: F.heading, fontSize: "1.5rem", color: C.green, fontWeight: 700 }}>92%</p>
                <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.5 }}>Occupancy</p>
              </div>
              {/* Floating card — revenue */}
              <div
                className="absolute -top-4 -right-4 sm:-right-8 bg-white rounded-xl p-4"
                style={{ boxShadow: "0 8px 30px rgba(38,70,83,0.1)" }}
              >
                <p style={{ fontFamily: F.body, fontSize: "0.625rem", color: C.slate, opacity: 0.4 }}>Revenue</p>
                <p style={{ fontFamily: F.heading, fontSize: "1.5rem", color: C.teal, fontWeight: 700 }}>$34.2k</p>
                <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.green, fontWeight: 500 }}>↑ 18% vs last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform logos bar */}
        <div className="border-t border-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center mb-5" style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.3, fontWeight: 500, letterSpacing: "0.05em" }}>
              CONNECTS WITH YOUR FAVORITE PLATFORMS
            </p>
            <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap">
              {[
                { name: "Airbnb", color: "#FF5A5F" },
                { name: "Booking.com", color: "#003580" },
                { name: "VRBO", color: "#3B5998" },
                { name: "WhatsApp", color: "#25D366" },
                { name: "Google", color: "#4285F4" },
              ].map((p) => (
                <span
                  key={p.name}
                  style={{ fontFamily: F.heading, fontSize: "1rem", fontWeight: 700, color: p.color, opacity: 0.35 }}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: C.periwinkle + "15", fontFamily: F.body, fontSize: "0.6875rem", color: C.periwinkle, fontWeight: 600 }}
            >
              FEATURES
            </span>
            <h2
              style={{
                fontFamily: F.heading,
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 800,
                color: C.teal,
                marginBottom: "0.75rem",
              }}
            >
              Everything you need. Nothing you don't.
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "1rem", color: C.slate, opacity: 0.5, maxWidth: "580px", margin: "0 auto" }}>
              Built specifically for vacation rental managers who want powerful tools without the complexity or the price tag.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 transition-all hover:shadow-md group"
                style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.05)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: f.color + "12" }}
                >
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 style={{ fontFamily: F.heading, fontSize: "1.0625rem", fontWeight: 700, color: C.teal, marginBottom: "0.5rem" }}>
                  {f.title}
                </h3>
                <p style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, opacity: 0.5, lineHeight: 1.7 }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-20 sm:py-28" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: C.green + "15", fontFamily: F.body, fontSize: "0.6875rem", color: C.green, fontWeight: 600 }}
            >
              HOW IT WORKS
            </span>
            <h2
              style={{
                fontFamily: F.heading,
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 800,
                color: C.teal,
                marginBottom: "0.75rem",
              }}
            >
              Up and running in 15 minutes
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "1rem", color: C.slate, opacity: 0.5, maxWidth: "520px", margin: "0 auto" }}>
              No complex setup. No migration headaches. Just connect and go.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {howItWorks.map((step, i) => (
              <div
                key={step.step}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span
                    style={{
                      fontFamily: F.heading,
                      fontSize: "3rem",
                      fontWeight: 800,
                      color: C.green,
                      opacity: 0.12,
                      display: "block",
                      lineHeight: 1,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {step.step}
                  </span>
                  <h3 style={{ fontFamily: F.heading, fontSize: "1.5rem", fontWeight: 700, color: C.teal, marginBottom: "0.75rem" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: F.body, fontSize: "0.9375rem", color: C.slate, opacity: 0.55, lineHeight: 1.7 }}>
                    {step.description}
                  </p>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 8px 30px rgba(38,70,83,0.08)" }}>
                    <img src={step.image} alt={step.title} className="w-full h-64 sm:h-80 object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: C.sand + "20", fontFamily: F.body, fontSize: "0.6875rem", color: "#B8860B", fontWeight: 600 }}
            >
              PRICING
            </span>
            <h2
              style={{
                fontFamily: F.heading,
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 800,
                color: C.teal,
                marginBottom: "0.75rem",
              }}
            >
              Simple, transparent pricing
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "1rem", color: C.slate, opacity: 0.5, maxWidth: "520px", margin: "0 auto" }}>
              Plans for every size. No hidden fees, no contracts, cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className="relative bg-white rounded-2xl p-6 sm:p-7 flex flex-col"
                style={{
                  boxShadow: plan.highlight ? "0 8px 40px rgba(42,157,143,0.15)" : "0 1px 3px rgba(38,70,83,0.05)",
                  border: plan.highlight ? `2px solid ${C.green}` : "1px solid #F3F4F6",
                }}
              >
                {plan.highlight && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white"
                    style={{ backgroundColor: C.green, fontFamily: F.body, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.03em" }}
                  >
                    MOST POPULAR
                  </span>
                )}

                <h3 style={{ fontFamily: F.heading, fontSize: "1.125rem", fontWeight: 700, color: C.teal }}>
                  {plan.name}
                </h3>
                <p style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.slate, opacity: 0.45, marginTop: "0.25rem", marginBottom: "1rem" }}>
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span style={{ fontFamily: F.heading, fontSize: "2.5rem", fontWeight: 800, color: C.teal }}>
                    ${plan.price}
                  </span>
                  <span style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.slate, opacity: 0.4 }}>
                    / {plan.period}
                  </span>
                </div>
                <div
                  className="px-3 py-1.5 rounded-lg mt-3 mb-5 inline-block"
                >
                  {plan.properties} properties
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={15} style={{ color: C.green, marginTop: "0.125rem", flexShrink: 0 }} />
                      <span style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, opacity: 0.6 }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => plan.cta === "Contact Sales" ? scrollTo("#contact") : navigate("/signup")}
                  className="w-full py-3 rounded-xl transition-all hover:opacity-90"
                  style={{
                    backgroundColor: plan.highlight ? C.green : "transparent",
                    color: plan.highlight ? "white" : C.green,
                    fontFamily: F.body,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    border: plan.highlight ? "none" : `1.5px solid ${C.green}`,
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Competitor comparison */}
          <div className="max-w-3xl mx-auto mt-16">
            <h3
              className="text-center mb-6"
              style={{ fontFamily: F.heading, fontSize: "1.25rem", fontWeight: 700, color: C.teal }}
            >
              How we compare to the leading PMS
            </h3>
            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.05)" }}>
              <div className="grid grid-cols-3 px-5 py-3 border-b border-gray-50">
                <span style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.35, fontWeight: 500 }}>Feature</span>
                <span className="text-center" style={{ fontFamily: F.heading, fontSize: "0.8125rem", color: C.green, fontWeight: 700 }}>oomsi</span>
                <span className="text-center" style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, opacity: 0.35, fontWeight: 500 }}>Leading PMS</span>
              </div>
              {comparisonData.map((row, i) => (
                <div key={row.feature} className="grid grid-cols-3 px-5 py-3" style={{ backgroundColor: i % 2 === 0 ? "#F8F9FA" : "white" }}>
                  <span style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.slate, fontWeight: 500 }}>{row.feature}</span>
                  <span className="text-center" style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.green, fontWeight: 500 }}>{row.oomsi}</span>
                  <span className="text-center" style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.slate, opacity: 0.4 }}>{row.competitor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-20 sm:py-28" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: C.sand + "20", fontFamily: F.body, fontSize: "0.6875rem", color: "#B8860B", fontWeight: 600 }}
            >
              TESTIMONIALS
            </span>
            <h2
              style={{
                fontFamily: F.heading,
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 800,
                color: C.teal,
                marginBottom: "0.75rem",
              }}
            >
              Loved by property managers worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-gray-100"
                style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.04)" }}
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} style={{ color: C.sand }} fill={C.sand} />
                  ))}
                </div>
                <p
                  className="mb-5"
                  style={{ fontFamily: F.body, fontSize: "0.875rem", color: C.slate, opacity: 0.6, lineHeight: 1.7, fontStyle: "italic" }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.teal, fontWeight: 600 }}>{t.name}</p>
                    <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.4 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              style={{
                fontFamily: F.heading,
                fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                fontWeight: 800,
                color: C.teal,
                marginBottom: "0.75rem",
              }}
            >
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden"
                style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.04)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span style={{ fontFamily: F.body, fontSize: "0.875rem", color: C.teal, fontWeight: 500 }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{ color: C.slate, opacity: 0.3, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, opacity: 0.5, lineHeight: 1.7 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="py-20 sm:py-28" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — info */}
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: C.green + "15", fontFamily: F.body, fontSize: "0.6875rem", color: C.green, fontWeight: 600 }}
              >
                GET IN TOUCH
              </span>
              <h2
                style={{
                  fontFamily: F.heading,
                  fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                  fontWeight: 800,
                  color: C.teal,
                  marginBottom: "0.75rem",
                }}
              >
                We'd love to hear from you
              </h2>
              <p style={{ fontFamily: F.body, fontSize: "1rem", color: C.slate, opacity: 0.5, lineHeight: 1.7, marginBottom: "2rem" }}>
                Whether you have a question about features, pricing, or anything else — our team is ready to help.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: C.green + "12" }}
                  >
                    <Mail size={18} style={{ color: C.green }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: F.body, fontSize: "0.875rem", color: C.teal, fontWeight: 600 }}>Email us</p>
                    <a
                      href="mailto:hello@oomsi.com"
                      style={{ fontFamily: F.body, fontSize: "0.9375rem", color: C.green, fontWeight: 500 }}
                    >
                      hello@oomsi.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: C.periwinkle + "12" }}
                  >
                    <MessageSquare size={18} style={{ color: C.periwinkle }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: F.body, fontSize: "0.875rem", color: C.teal, fontWeight: 600 }}>Response time</p>
                    <p style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, opacity: 0.5 }}>
                      We typically reply within a few hours during business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — contact form */}
            <div
              className="bg-white rounded-2xl p-6 sm:p-8"
              style={{ boxShadow: "0 2px 12px rgba(38,70,83,0.06)", border: "1px solid #F3F4F6" }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! We'll be in touch soon.");
                }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl"
                      style={{ fontFamily: F.body, fontSize: "0.875rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl"
                      style={{ fontFamily: F.body, fontSize: "0.875rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                    Subject
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl appearance-none cursor-pointer"
                    style={{ fontFamily: F.body, fontSize: "0.875rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate, backgroundColor: "white" }}
                  >
                    <option>General enquiry</option>
                    <option>Pricing question</option>
                    <option>Feature request</option>
                    <option>Partnership</option>
                    <option>Enterprise / Sales</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl resize-none"
                    style={{ fontFamily: F.body, fontSize: "0.875rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: C.green, fontFamily: F.body, fontSize: "0.875rem", fontWeight: 600 }}
                >
                  <Send size={16} />
                  Send Message
                </button>

                <p className="text-center" style={{ fontFamily: F.body, fontSize: "0.625rem", color: C.slate, opacity: 0.3 }}>
                  Or email us directly at hello@oomsi.com
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-3xl p-10 sm:p-16"
            style={{ backgroundColor: C.teal }}
          >
            <h2
              style={{
                fontFamily: F.heading,
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              Ready to manage your rentals<br />with peace of mind?
            </h2>
            <p
              style={{ fontFamily: F.body, fontSize: "1rem", color: "white", opacity: 0.6, maxWidth: "480px", margin: "0 auto 2rem" }}
            >
              Property management doesn't have to be complicated. Start your 14-day trial — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: C.green, color: "white", fontFamily: F.body, fontSize: "1rem", fontWeight: 600 }}
              >
                Start Your 14-Day Trial
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo("#how-it-works")}
                className="flex items-center gap-2 px-6 py-4 rounded-xl transition-all hover:bg-white/10"
                style={{ color: "white", fontFamily: F.body, fontSize: "0.9375rem", fontWeight: 500, opacity: 0.7 }}
              >
                View Pricing
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h3 style={{ fontFamily: F.heading, fontSize: "1.375rem", fontWeight: 800, color: C.teal, marginBottom: "0.75rem" }}>
                oomsi
              </h3>
              <p style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, opacity: 0.4, lineHeight: 1.7 }}>
                Property management. Made simple.
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4
                  style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, fontWeight: 600, letterSpacing: "0.05em", marginBottom: "0.75rem" }}
                >
                  {category.toUpperCase()}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => {
                    const legalRoutes: Record<string, string> = {
                      "Privacy Policy": "/privacy",
                      "Terms of Service": "/terms",
                      "Cookie Policy": "/cookies",
                      "GDPR": "/gdpr",
                    };
                    const scrollTargets: Record<string, string> = {
                      "Features": "#features",
                      "Pricing": "#pricing",
                      "Integrations": "#features",
                      "Contact": "#contact",
                      "About": "#how-it-works",
                      "Help Center": "#contact",
                      "Documentation": "#features",
                    };
                    return (
                      <li key={link}>
                        <button
                          onClick={() => {
                            if (legalRoutes[link]) navigate(legalRoutes[link]);
                            else if (scrollTargets[link]) scrollTo(scrollTargets[link]);
                          }}
                          className="hover:opacity-70 transition-opacity"
                          style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, opacity: 0.45 }}
                        >
                          {link}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-100 gap-4">
            <p style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.slate, opacity: 0.3 }}>
              © 2026 oomsi. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Twitter", "LinkedIn", "Instagram"].map((s) => (
                <button
                  key={s}
                  className="hover:opacity-70 transition-opacity"
                  style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.slate, opacity: 0.35, fontWeight: 500 }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}