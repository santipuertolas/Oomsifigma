import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight, Check, ChevronDown, ChevronRight,
  Calendar, Home, Users,
  Shield, Smartphone, Bell, Globe, Star,
  ClipboardCheck, Menu, X,
  Mail, Send, MessageSquare,
  BarChart3, Clock, TrendingUp,
} from "lucide-react";
import howItWorksStep1 from "figma:asset/bb8e7085586ce16bf7aa9b47e1120469a9a60ec1.png";
import howItWorksStep2 from "figma:asset/a8440c6907bc4ab2ffa8b3d49b213383406615a0.png";
import howItWorksStep3 from "figma:asset/63d1dcb4dadbafb437854fc2c42657d18768320b.png";
import howItWorksStep4 from "figma:asset/764beacfa6773665c2488e62145711850b220223.png";

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
const heroPropertyImg = "https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvY2VhbmZyb250JTIwdmFjYXRpb24lMjB2aWxsYSUyMHBvb2wlMjBzdW5zZXR8ZW58MXx8fHwxNzcyMzkwNzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const testimonial1 = "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMHBvcnRyYWl0JTIwYnVzaW5lc3N8ZW58MXx8fHwxNzcyMzY0NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const testimonial2 = "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXQlMjBzbWlsaW5nfGVufDF8fHx8MTc3MjM2NDQwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const testimonial3 = "https://images.unsplash.com/photo-1591023271640-6050fda73d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3QlMjBzbWlsaW5nfGVufDF8fHx8MTc3MjM4ODk1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

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
];

const valuePillars = [
  {
    icon: BarChart3,
    title: "Earn More",
    description: "Maximize occupancy and revenue with smart pricing tools and multi-channel distribution.",
    color: C.green,
  },
  {
    icon: Clock,
    title: "Work Less",
    description: "Automate messaging, reviews, and task management so you spend time on strategy, not admin.",
    color: C.periwinkle,
  },
  {
    icon: TrendingUp,
    title: "Grow Faster",
    description: "Scale from 1 property to 100+ with tools that grow with your portfolio.",
    color: C.sand,
  },
];

const features = [
  {
    icon: Home,
    title: "All your properties, one view.",
    description: "See occupancy, revenue, and today's tasks at a glance. No more switching between tabs.",
    color: C.green,
  },
  {
    icon: Calendar,
    title: "One calendar. Zero double-bookings.",
    description: "Color-coded booking sources, direct bookings, blocked dates, all in one unified calendar.",
    color: C.teal,
  },
  {
    icon: Globe,
    title: "List everywhere, manage from one place.",
    description: "Connect Airbnb, Booking.com, and VRBO. Calendars, bookings, and rates sync automatically every hour.",
    color: C.periwinkle,
  },
  {
    icon: ClipboardCheck,
    title: "Cleaning on autopilot.",
    description: "A cleaning task is created automatically after every checkout. Your team uploads photos, you review them — all in one place.",
    color: C.sand,
  },
  {
    icon: Users,
    title: "Your team, organized.",
    description: "Invite cleaners and maintenance staff. Assign them to properties, track their work, and manage hourly rates effortlessly.",
    color: C.green,
  },
  {
    icon: Smartphone,
    title: "Your cleaners' own portal.",
    description: "Your cleaning team gets their own mobile portal. They see tasks, accept or decline, and upload photos — no app install needed.",
    color: C.teal,
  },
  {
    icon: Bell,
    title: "Never miss an update.",
    description: "Task assignments, morning briefings, day-before reminders, and urgent pre-checkin alerts — all delivered straight to WhatsApp.",
    color: C.periwinkle,
  },
  {
    icon: Shield,
    title: "Secure by design.",
    description: "Admin dashboard is separate from the cleaner portal. Invite-only access, so only your team can see your data.",
    color: C.slate,
  },
];

const howItWorksData = [
  {
    step: "01",
    title: "Add Your Properties",
    description: "Import from Airbnb or add manually. Set up bedrooms, check-in times, WiFi info, and cleaning photo requirements in minutes.",
    image: howItWorksStep1,
  },
  {
    step: "02",
    title: "Connect Your Channels",
    description: "Link Airbnb, Booking.com, and VRBO in a few clicks. Your bookings, rates, and availability sync automatically every hour.",
    image: howItWorksStep2,
  },
  {
    step: "03",
    title: "Build Your Team",
    description: "Invite your cleaners and maintenance staff by email. Assign them to properties with primary and backup roles.",
    image: howItWorksStep3,
  },
  {
    step: "04",
    title: "Let It Run",
    description: "Sit back. Cleaning tasks are created after every checkout, your team gets WhatsApp notifications, and your calendar stays perfectly in sync.",
    image: howItWorksStep4,
  },
];

const pricingPlans = {
  monthly: [
    {
      name: "Starter",
      price: "18",
      period: "per property / month",
      annualEquiv: "",
      originalPrice: "",
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
      ctaAction: "signup" as const,
    },
    {
      name: "Professional",
      price: "14",
      period: "per property / month",
      annualEquiv: "",
      originalPrice: "",
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
      ctaAction: "signup" as const,
    },
    {
      name: "Enterprise",
      price: "12",
      period: "per property / month",
      annualEquiv: "",
      originalPrice: "",
      description: "For property management companies",
      properties: "20+ properties",
      highlight: false,
      features: [
        "Everything in Professional",
        "Guest check-in (coming soon)",
        "Custom integrations",
        "Dedicated account manager",
        "White-label option",
        "Phone support",
      ],
      cta: "Contact Sales",
      ctaAction: "contact" as const,
    },
  ],
  annual: [
    {
      name: "Starter",
      price: "15",
      period: "per property / month",
      annualEquiv: "$180/property/year",
      originalPrice: "18",
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
      ctaAction: "signup" as const,
    },
    {
      name: "Professional",
      price: "11.67",
      period: "per property / month",
      annualEquiv: "$140/property/year",
      originalPrice: "14",
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
      ctaAction: "signup" as const,
    },
    {
      name: "Enterprise",
      price: "10",
      period: "per property / month",
      annualEquiv: "$120/property/year",
      originalPrice: "12",
      description: "For property management companies",
      properties: "20+ properties",
      highlight: false,
      features: [
        "Everything in Professional",
        "Guest check-in (coming soon)",
        "Custom integrations",
        "Dedicated account manager",
        "White-label option",
        "Phone support",
      ],
      cta: "Contact Sales",
      ctaAction: "contact" as const,
    },
  ],
};

const comparisonData = [
  { feature: "Starting price", oomsi: "From $12/property", competitor: "From $27.51/property" },
  { feature: "Channel connections", oomsi: "Unlimited (Pro)", competitor: "Limited by plan" },
  { feature: "WhatsApp notifications", oomsi: "Included (Pro)", competitor: "Not available" },
  { feature: "Cleaner portal", oomsi: "Included (all plans)", competitor: "Not available" },
  { feature: "Cleaning photo gallery", oomsi: "Included (Pro)", competitor: "Not available" },
  { feature: "Team members", oomsi: "Unlimited (Pro)", competitor: "Extra cost" },
];

const testimonials = [
  {
    name: "Marco Rossi",
    role: "12 properties, Lake Como, Italy",
    image: testimonial1,
    quote: "We cut our cleaning coordination time by 70% in the first month. The WhatsApp automation alone is worth the subscription — our cleaners actually prefer it over the old group chat.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "8 properties, Bali, Indonesia",
    image: testimonial2,
    quote: "Coming from Smoobu, the pricing was a no-brainer. But what really sold me was the cleaner portal — my team finally has a proper tool instead of scattered messages.",
    rating: 5,
  },
  {
    name: "David Muller",
    role: "25 properties, Costa del Sol, Spain",
    image: testimonial3,
    quote: "The unified calendar with colour-coded sources is exactly what I needed. No more double bookings, no more spreadsheets. oomsi just works.",
    rating: 5,
  },
];

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations"],
  Company: ["About", "Contact"],
  Resources: ["Help Center", "Documentation", "Blog"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

/* ─── Component ─── */

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [socialProofIndex, setSocialProofIndex] = useState(0);

  const socialProofQuotes = [
    { quote: "We cut our cleaning coordination time by 70% in the first month.", name: "Marco Rossi", detail: "12 properties, Lake Como" },
    { quote: "The cleaner portal gave my team a proper tool instead of scattered messages.", name: "Sarah Chen", detail: "8 properties, Bali" },
    { quote: "No more double bookings, no more spreadsheets. oomsi just works.", name: "David Muller", detail: "25 properties, Costa del Sol" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSocialProofIndex((prev) => (prev + 1) % socialProofQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [socialProofQuotes.length]);

  const faqs = [
    {
      q: "How does oomsi compare to other PMS tools?",
      a: "oomsi gives you the same core features as the big players — calendar sync, channel management, team coordination — at a fraction of the price. Plus, we include a dedicated cleaner portal and WhatsApp notifications that most competitors don't offer.",
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
      a: "No contracts. All plans are month-to-month and you can cancel anytime. Every plan includes a 14-day free trial so you can try everything risk-free.",
    },
    {
      q: "What booking platforms can I connect?",
      a: "We support Airbnb, Booking.com, and VRBO with full two-way sync. You can also connect any other platform using a simple iCal link for calendar syncing.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes! Every plan comes with a 14-day free trial. No credit card required to start. You get full access to all the features in your chosen plan during the trial period.",
    },
    {
      q: "Do you charge booking fees?",
      a: "No. Never. Per-property pricing only — no booking fees, no hidden costs.",
    },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const activePlans = pricingPlans[billingCycle];

  return (
    <div style={{ backgroundColor: C.white }}>
      {/* NAV */}
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
                Start 14-Day Free Trial
              </button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} style={{ color: C.teal }} /> : <Menu size={24} style={{ color: C.teal }} />}
            </button>
          </div>
        </div>

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
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute top-20 -right-32 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ backgroundColor: C.green }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-[0.04]"
          style={{ backgroundColor: C.periwinkle }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
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
                Every property has untapped potential.{" "}
                <span style={{ color: C.green }}>Oomsi unlocks it.</span>
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
                The all-in-one platform that helps property owners and managers earn more from every booking — with smarter tools, not more work.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <button
                  onClick={() => navigate("/signup")}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:opacity-90"
                  style={{ backgroundColor: C.green, color: "white", fontFamily: F.body, fontSize: "1rem", fontWeight: 600 }}
                >
                  Start Your Free Trial
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

              <div className="grid grid-cols-3 gap-4">
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
                <img src={heroPropertyImg} alt="Luxury oceanfront vacation rental" className="w-full h-auto object-cover" />
              </div>
              <div
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-xl p-4"
                style={{ boxShadow: "0 8px 30px rgba(38,70,83,0.1)" }}
              >
                <p style={{ fontFamily: F.body, fontSize: "0.625rem", color: C.slate, opacity: 0.4 }}>This Month</p>
                <p style={{ fontFamily: F.heading, fontSize: "1.5rem", color: C.green, fontWeight: 700 }}>92%</p>
                <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.5 }}>Occupancy</p>
              </div>
              <div
                className="absolute -top-4 -right-4 sm:-right-8 bg-white rounded-xl p-4"
                style={{ boxShadow: "0 8px 30px rgba(38,70,83,0.1)" }}
              >
                <p style={{ fontFamily: F.body, fontSize: "0.625rem", color: C.slate, opacity: 0.4 }}>Revenue</p>
                <p style={{ fontFamily: F.heading, fontSize: "1.5rem", color: C.teal, fontWeight: 700 }}>$34.2k</p>
                <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.green, fontWeight: 500 }}>+18% vs last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof Strip */}
        <div
          className="py-5 border-t border-b border-gray-100"
          style={{ backgroundColor: C.teal + "06" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p
              className="transition-opacity duration-500"
              style={{ fontFamily: F.body, fontSize: "0.9375rem", color: C.slate, fontStyle: "italic", opacity: 0.6, lineHeight: 1.6 }}
            >
              "{socialProofQuotes[socialProofIndex].quote}"
            </p>
            <p style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.green, fontWeight: 600, marginTop: "0.5rem" }}>
              {socialProofQuotes[socialProofIndex].name}
              <span style={{ color: C.slate, opacity: 0.4, fontWeight: 400 }}>
                {" "} — {socialProofQuotes[socialProofIndex].detail}
              </span>
            </p>
          </div>
        </div>

        {/* Platform logos bar */}
        <div className="py-7">
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

      {/* VALUE PROPOSITION PILLARS */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
            {valuePillars.map((p) => (
              <div key={p.title} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: p.color + "12" }}
                >
                  <p.icon size={26} style={{ color: p.color }} />
                </div>
                <h3 style={{ fontFamily: F.heading, fontSize: "1.25rem", fontWeight: 700, color: C.teal, marginBottom: "0.5rem" }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: F.body, fontSize: "0.875rem", color: C.slate, opacity: 0.55, lineHeight: 1.7 }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-14 sm:py-20" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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

          <div className="space-y-12 lg:space-y-20">
            {howItWorksData.map((step, i) => (
              <div
                key={step.step}
                className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
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
                    <img src={step.image} alt={step.title} className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after How It Works */}
          <div className="text-center mt-14">
            <button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:opacity-90"
              style={{ backgroundColor: C.green, color: "white", fontFamily: F.body, fontSize: "1rem", fontWeight: 600 }}
            >
              Ready to try it? Start your free trial
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
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

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setBillingCycle("monthly")}
                className="px-4 py-2 rounded-lg transition-all"
                style={{
                  fontFamily: F.body,
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  backgroundColor: billingCycle === "monthly" ? C.green : "transparent",
                  color: billingCycle === "monthly" ? "white" : C.slate,
                  opacity: billingCycle === "monthly" ? 1 : 0.5,
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className="px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                style={{
                  fontFamily: F.body,
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  backgroundColor: billingCycle === "annual" ? C.green : "transparent",
                  color: billingCycle === "annual" ? "white" : C.slate,
                  opacity: billingCycle === "annual" ? 1 : 0.5,
                }}
              >
                Annual
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: billingCycle === "annual" ? "rgba(255,255,255,0.2)" : C.green + "15",
                    fontFamily: F.body,
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    color: billingCycle === "annual" ? "white" : C.green,
                  }}
                >
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {activePlans.map((plan) => (
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
                  {plan.originalPrice && (
                    <span style={{ fontFamily: F.heading, fontSize: "1.25rem", fontWeight: 700, color: C.slate, opacity: 0.3, textDecoration: "line-through", marginRight: "0.25rem" }}>
                      ${plan.originalPrice}
                    </span>
                  )}
                  <span style={{ fontFamily: F.heading, fontSize: "2.5rem", fontWeight: 800, color: C.teal }}>
                    ${plan.price}
                  </span>
                  <span style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.slate, opacity: 0.4 }}>
                    / {plan.period}
                  </span>
                </div>
                {plan.annualEquiv && (
                  <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.green, fontWeight: 500, marginBottom: "0.25rem" }}>
                    {plan.annualEquiv}
                  </p>
                )}
                <div
                  className="px-3 py-1.5 rounded-lg mt-2 mb-5 inline-block"
                  style={{ backgroundColor: C.green + "08", fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500 }}
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
                  onClick={() => plan.ctaAction === "contact" ? scrollTo("#contact") : navigate("/signup")}
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
          <div className="max-w-3xl mx-auto mt-14">
            <h3
              className="text-center mb-6"
              style={{ fontFamily: F.heading, fontSize: "1.25rem", fontWeight: 700, color: C.teal }}
            >
              How we compare
            </h3>
            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.05)" }}>
              <div className="grid grid-cols-3 px-5 py-3 border-b border-gray-50">
                <span style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.35, fontWeight: 500 }}>Feature</span>
                <span className="text-center" style={{ fontFamily: F.heading, fontSize: "0.8125rem", color: C.green, fontWeight: 700 }}>oomsi</span>
                <span className="text-center" style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, opacity: 0.35, fontWeight: 500 }}>Industry Average</span>
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

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-14 sm:py-20" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.teal, fontWeight: 600 }}>{t.name}</p>
                    <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.4 }}>{t.role}</p>
                  </div>
                </div>
                <button
                  className="flex items-center gap-1 transition-opacity hover:opacity-70"
                  style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.green, fontWeight: 500 }}
                >
                  Read their story
                  <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
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

      {/* CONTACT */}
      <section id="contact" className="py-14 sm:py-20" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
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

      {/* FINAL CTA */}
      <section className="py-14 sm:py-20">
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
              Ready to unlock your property's<br />full potential?
            </h2>
            <p
              style={{ fontFamily: F.body, fontSize: "1rem", color: "white", opacity: 0.6, maxWidth: "480px", margin: "0 auto 2rem" }}
            >
              Start your 14-day trial — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: C.green, color: "white", fontFamily: F.body, fontSize: "1rem", fontWeight: 600 }}
              >
                Start Your Free Trial
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo("#pricing")}
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

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-1">
              <h3 style={{ fontFamily: F.heading, fontSize: "1.375rem", fontWeight: 800, color: C.teal, marginBottom: "0.75rem" }}>
                oomsi
              </h3>
              <p style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, opacity: 0.4, lineHeight: 1.7 }}>
                Helping property owners unlock the full earning potential of their properties.
              </p>
            </div>

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
                      "Blog": "#features",
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
              &copy; 2026 oomsi. All rights reserved.
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
