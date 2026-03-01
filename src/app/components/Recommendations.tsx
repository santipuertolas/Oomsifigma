import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Lightbulb, TrendingUp, ArrowRight, Check,
  Home, Globe, Users, DollarSign, BarChart3,
  Megaphone, Link2, Zap, Shield, ChevronRight,
  Clock, Flame, X,
} from "lucide-react";

/* ─── Brand ─── */
const C = {
  teal: "#264653",
  green: "#2A9D8F",
  periwinkle: "#A29BFE",
  sand: "#E9C46A",
  white: "#F8F9FA",
  slate: "#2D3436",
};
const F = { heading: "Nunito, sans-serif", body: "Inter, sans-serif" };

/* ─── Types ─── */

type Stage = "getting-started" | "growing" | "optimizing" | "scaling";
type Effort = "easy" | "medium" | "hard";
type Status = "todo" | "in-progress" | "completed" | "dismissed";
type Category = "setup" | "channels" | "pricing" | "operations" | "growth";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  revenueUplift: string;
  revenueDetail: string;
  effort: Effort;
  effortTime: string;
  category: Category;
  stage: Stage;
  status: Status;
  icon: typeof Home;
  actionLabel: string;
  actionRoute: string;
  priority: number; // lower = higher priority (computed from effort + uplift)
}

/* ─── Journey Stages ─── */

const stages: { key: Stage; label: string; description: string }[] = [
  { key: "getting-started", label: "Getting Started", description: "Set up your properties and team" },
  { key: "growing", label: "Growing", description: "Expand channels and automate" },
  { key: "optimizing", label: "Optimizing", description: "Maximize revenue and efficiency" },
  { key: "scaling", label: "Scaling", description: "Advanced tools for scale" },
];

/* ─── Mock Recommendations ─── */
// Priority: lower number = show first. Based on (effort: easy=1, med=2, hard=3) - (uplift magnitude)

const allRecommendations: Recommendation[] = [
  // GETTING STARTED
  {
    id: "r1",
    title: "Complete your property profiles",
    description: "Add photos, amenities, check-in instructions, and WiFi details to all your properties. Complete profiles get 23% more bookings.",
    revenueUplift: "+23%",
    revenueDetail: "more bookings from complete listings",
    effort: "easy",
    effortTime: "10 min per property",
    category: "setup",
    stage: "getting-started",
    status: "completed",
    icon: Home,
    actionLabel: "Review Properties",
    actionRoute: "/dashboard/properties",
    priority: 1,
  },
  {
    id: "r2",
    title: "Invite your cleaning team",
    description: "Add at least 2 cleaners with primary and backup assignments. Properties with backup cleaners have 94% fewer missed turnovers.",
    revenueUplift: "+8%",
    revenueDetail: "fewer missed turnovers",
    effort: "easy",
    effortTime: "5 min",
    category: "operations",
    stage: "getting-started",
    status: "completed",
    icon: Users,
    actionLabel: "Manage Team",
    actionRoute: "/dashboard/team",
    priority: 2,
  },
  {
    id: "r3",
    title: "Connect your first channel",
    description: "Link your Airbnb account to sync calendars, bookings, and rates automatically. This is the foundation of your multi-channel strategy.",
    revenueUplift: "+12%",
    revenueDetail: "revenue from calendar sync",
    effort: "easy",
    effortTime: "5 min",
    category: "channels",
    stage: "getting-started",
    status: "completed",
    icon: Link2,
    actionLabel: "Connect Airbnb",
    actionRoute: "/dashboard/properties",
    priority: 3,
  },
  // GROWING
  {
    id: "r4",
    title: "Add Booking.com as a channel",
    description: "Properties listed on both Airbnb and Booking.com see an average 35% increase in bookings. Oomsi keeps your calendars perfectly in sync.",
    revenueUplift: "+35%",
    revenueDetail: "more bookings from dual-channel listing",
    effort: "easy",
    effortTime: "15 min",
    category: "channels",
    stage: "growing",
    status: "todo",
    icon: Globe,
    actionLabel: "Connect Booking.com",
    actionRoute: "/dashboard/properties",
    priority: 1,
  },
  {
    id: "r5",
    title: "Enable smart pricing suggestions",
    description: "Turn on AI-powered pricing recommendations based on seasonality, local events, and competitor rates. Smart-priced properties earn 18-30% more.",
    revenueUplift: "+30%",
    revenueDetail: "average revenue increase",
    effort: "easy",
    effortTime: "2 min",
    category: "pricing",
    stage: "growing",
    status: "todo",
    icon: DollarSign,
    actionLabel: "Enable Smart Pricing",
    actionRoute: "/dashboard/settings",
    priority: 2,
  },
  {
    id: "r6",
    title: "Set up WhatsApp notifications",
    description: "Your cleaning team responds 3x faster with WhatsApp alerts. Enable real-time task assignments, morning briefings, and pre-checkin reminders.",
    revenueUplift: "+5%",
    revenueDetail: "from faster turnovers",
    effort: "easy",
    effortTime: "5 min",
    category: "operations",
    stage: "growing",
    status: "in-progress",
    icon: Zap,
    actionLabel: "Set Up WhatsApp",
    actionRoute: "/dashboard/settings",
    priority: 3,
  },
  {
    id: "r7",
    title: "Add VRBO to your channels",
    description: "Triple your channel exposure by adding VRBO. Combined multi-channel listings increase occupancy by 20% on average.",
    revenueUplift: "+20%",
    revenueDetail: "occupancy increase",
    effort: "medium",
    effortTime: "20 min",
    category: "channels",
    stage: "growing",
    status: "todo",
    icon: Globe,
    actionLabel: "Connect VRBO",
    actionRoute: "/dashboard/properties",
    priority: 4,
  },
  // OPTIMIZING
  {
    id: "r8",
    title: "Launch your direct booking website",
    description: "Stop paying 15-20% in OTA commissions. Create a branded booking website with our widget and start accepting direct bookings.",
    revenueUplift: "+15-20%",
    revenueDetail: "saved on commission fees",
    effort: "medium",
    effortTime: "30 min",
    category: "growth",
    stage: "optimizing",
    status: "todo",
    icon: Megaphone,
    actionLabel: "Create Booking Website",
    actionRoute: "/dashboard/settings",
    priority: 5,
  },
  {
    id: "r9",
    title: "Review your pricing strategy",
    description: "Your weekend rates are 12% below market average. Adjusting pricing for weekends and peak seasons could add $2,400/year per property.",
    revenueUplift: "+$2.4k",
    revenueDetail: "per property per year",
    effort: "medium",
    effortTime: "15 min",
    category: "pricing",
    stage: "optimizing",
    status: "todo",
    icon: BarChart3,
    actionLabel: "Review Pricing",
    actionRoute: "/dashboard/properties",
    priority: 6,
  },
  {
    id: "r10",
    title: "Set up cleaning photo requirements",
    description: "Require photo verification after every clean. Properties with photo checklists have 60% fewer guest complaints about cleanliness.",
    revenueUplift: "+4.8",
    revenueDetail: "star average from cleaner reviews",
    effort: "easy",
    effortTime: "5 min per property",
    category: "operations",
    stage: "optimizing",
    status: "todo",
    icon: Shield,
    actionLabel: "Configure Photos",
    actionRoute: "/dashboard/properties",
    priority: 7,
  },
  // SCALING
  {
    id: "r11",
    title: "Enable advanced analytics",
    description: "Get detailed revenue reports, occupancy trends, and property comparisons. Data-driven managers grow their portfolios 2x faster.",
    revenueUplift: "+40%",
    revenueDetail: "faster portfolio growth",
    effort: "hard",
    effortTime: "Upgrade to Business",
    category: "growth",
    stage: "scaling",
    status: "todo",
    icon: BarChart3,
    actionLabel: "Explore Analytics",
    actionRoute: "/dashboard/settings",
    priority: 8,
  },
];

/* ─── Helpers ─── */

const effortConfig: Record<Effort, { label: string; color: string; bg: string }> = {
  easy: { label: "Quick win", color: "#2A9D8F", bg: "#2A9D8F12" },
  medium: { label: "Some effort", color: "#E9C46A", bg: "#E9C46A18" },
  hard: { label: "Project", color: "#A29BFE", bg: "#A29BFE15" },
};

const categoryLabels: Record<Category, string> = {
  setup: "Setup",
  channels: "Channels",
  pricing: "Pricing",
  operations: "Operations",
  growth: "Growth",
};

function getCurrentStage(recs: Recommendation[]): Stage {
  const gettingStartedDone = recs
    .filter((r) => r.stage === "getting-started")
    .every((r) => r.status === "completed" || r.status === "dismissed");
  if (!gettingStartedDone) return "getting-started";

  const growingDone = recs
    .filter((r) => r.stage === "growing")
    .every((r) => r.status === "completed" || r.status === "dismissed");
  if (!growingDone) return "growing";

  const optimizingDone = recs
    .filter((r) => r.stage === "optimizing")
    .every((r) => r.status === "completed" || r.status === "dismissed");
  if (!optimizingDone) return "optimizing";

  return "scaling";
}

function getCompletionPercent(recs: Recommendation[]): number {
  const total = recs.filter((r) => r.status !== "dismissed").length;
  if (total === 0) return 100;
  const done = recs.filter((r) => r.status === "completed").length;
  return Math.round((done / total) * 100);
}

/* ─── Component ─── */

export function Recommendations() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState(allRecommendations);
  const [showCompleted, setShowCompleted] = useState(false);

  const currentStage = getCurrentStage(recommendations);
  const completionPercent = getCompletionPercent(recommendations);

  const activeRecs = recommendations
    .filter((r) => r.status !== "completed" && r.status !== "dismissed")
    .sort((a, b) => {
      // Current stage first, then next stages
      const stageOrder = stages.map((s) => s.key);
      const aStageIdx = stageOrder.indexOf(a.stage);
      const bStageIdx = stageOrder.indexOf(b.stage);
      if (aStageIdx !== bStageIdx) return aStageIdx - bStageIdx;
      return a.priority - b.priority;
    });

  const completedRecs = recommendations.filter((r) => r.status === "completed");

  const handleComplete = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "completed" as Status } : r))
    );
  };

  const handleDismiss = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "dismissed" as Status } : r))
    );
  };

  const topRecommendation = activeRecs[0];
  const restRecommendations = activeRecs.slice(1, 5); // Show next 4

  return (
    <div className="mb-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: C.periwinkle + "15" }}
          >
            <Lightbulb size={16} style={{ color: C.periwinkle }} />
          </div>
          <div>
            <h2
              style={{
                fontFamily: F.heading,
                color: C.teal,
                fontSize: "1.0625rem",
                fontWeight: 700,
              }}
            >
              Unlock More Revenue
            </h2>
            <p
              style={{
                fontFamily: F.body,
                fontSize: "0.6875rem",
                color: C.slate,
                opacity: 0.45,
              }}
            >
              Personalized recommendations to maximize your earnings
            </p>
          </div>
        </div>
        {completedRecs.length > 0 && (
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            style={{
              fontFamily: F.body,
              fontSize: "0.6875rem",
              color: C.green,
              fontWeight: 500,
            }}
          >
            {completedRecs.length} completed
            <ChevronRight
              size={11}
              className="transition-transform"
              style={{ transform: showCompleted ? "rotate(90deg)" : "none" }}
            />
          </button>
        )}
      </div>

      {/* Journey Progress */}
      <div
        className="bg-white rounded-xl px-5 py-4 mb-3"
        style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <p
            style={{
              fontFamily: F.body,
              fontSize: "0.6875rem",
              color: C.slate,
              opacity: 0.5,
              fontWeight: 500,
            }}
          >
            Your growth journey
          </p>
          <span
            style={{
              fontFamily: F.body,
              fontSize: "0.6875rem",
              color: C.green,
              fontWeight: 600,
            }}
          >
            {completionPercent}% complete
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-1.5 rounded-full mb-3"
          style={{ backgroundColor: C.green + "12" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${completionPercent}%`,
              background: `linear-gradient(90deg, ${C.green}, ${C.periwinkle})`,
            }}
          />
        </div>

        {/* Stage indicators */}
        <div className="grid grid-cols-4 gap-2">
          {stages.map((stage, i) => {
            const stageIdx = stages.findIndex((s) => s.key === currentStage);
            const isComplete = i < stageIdx;
            const isCurrent = i === stageIdx;
            const isFuture = i > stageIdx;

            return (
              <div key={stage.key} className="text-center">
                <div className="flex items-center justify-center mb-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: isComplete
                        ? C.green
                        : isCurrent
                          ? C.green + "18"
                          : "#F3F4F6",
                      border: isCurrent ? `2px solid ${C.green}` : "none",
                    }}
                  >
                    {isComplete ? (
                      <Check size={12} style={{ color: "white" }} />
                    ) : (
                      <span
                        style={{
                          fontFamily: F.body,
                          fontSize: "0.5625rem",
                          fontWeight: 700,
                          color: isCurrent ? C.green : C.slate,
                          opacity: isFuture ? 0.25 : 1,
                        }}
                      >
                        {i + 1}
                      </span>
                    )}
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: "0.5625rem",
                    fontWeight: isCurrent ? 600 : 500,
                    color: isCurrent ? C.green : C.slate,
                    opacity: isFuture ? 0.3 : isCurrent ? 1 : 0.5,
                  }}
                >
                  {stage.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Recommendation — featured card */}
      {topRecommendation && (
        <div
          className="bg-white rounded-xl overflow-hidden mb-3"
          style={{
            boxShadow: "0 1px 3px rgba(38,70,83,0.06)",
            border: `1px solid ${C.green}20`,
          }}
        >
          {/* Top priority banner */}
          <div
            className="flex items-center gap-2 px-4 py-2"
            style={{ backgroundColor: C.green + "08" }}
          >
            <Flame size={11} style={{ color: C.green }} />
            <span
              style={{
                fontFamily: F.body,
                fontSize: "0.5625rem",
                color: C.green,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              TOP RECOMMENDATION
            </span>
            <div className="flex-1" />
            <span
              className="px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: effortConfig[topRecommendation.effort].bg,
                fontFamily: F.body,
                fontSize: "0.5625rem",
                fontWeight: 600,
                color: effortConfig[topRecommendation.effort].color,
              }}
            >
              {effortConfig[topRecommendation.effort].label}
            </span>
          </div>

          <div className="px-4 py-4">
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: C.green + "12" }}
              >
                <topRecommendation.icon size={20} style={{ color: C.green }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      style={{
                        fontFamily: F.heading,
                        fontSize: "0.9375rem",
                        fontWeight: 700,
                        color: C.teal,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {topRecommendation.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "0.8125rem",
                        color: C.slate,
                        opacity: 0.55,
                        lineHeight: 1.6,
                      }}
                    >
                      {topRecommendation.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDismiss(topRecommendation.id)}
                    className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
                    title="Dismiss"
                  >
                    <X size={12} style={{ color: C.slate, opacity: 0.25 }} />
                  </button>
                </div>

                {/* Revenue uplift callout */}
                <div
                  className="flex items-center gap-3 mt-3 px-3 py-2.5 rounded-lg"
                  style={{ backgroundColor: "#F0FDF4" }}
                >
                  <TrendingUp size={16} style={{ color: "#16A34A" }} />
                  <div>
                    <span
                      style={{
                        fontFamily: F.heading,
                        fontSize: "1.125rem",
                        fontWeight: 800,
                        color: "#16A34A",
                      }}
                    >
                      {topRecommendation.revenueUplift}
                    </span>
                    <span
                      style={{
                        fontFamily: F.body,
                        fontSize: "0.6875rem",
                        color: "#15803D",
                        opacity: 0.7,
                        marginLeft: "0.375rem",
                      }}
                    >
                      {topRecommendation.revenueDetail}
                    </span>
                  </div>
                </div>

                {/* Action row */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1.5">
                    <Clock size={10} style={{ color: C.slate, opacity: 0.3 }} />
                    <span
                      style={{
                        fontFamily: F.body,
                        fontSize: "0.625rem",
                        color: C.slate,
                        opacity: 0.35,
                      }}
                    >
                      {topRecommendation.effortTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleComplete(topRecommendation.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      style={{
                        fontFamily: F.body,
                        fontSize: "0.6875rem",
                        color: C.slate,
                        opacity: 0.4,
                        fontWeight: 500,
                      }}
                    >
                      <Check size={12} />
                      Done
                    </button>
                    <button
                      onClick={() => navigate(topRecommendation.actionRoute)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white transition-all hover:opacity-90"
                      style={{
                        backgroundColor: C.green,
                        fontFamily: F.body,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {topRecommendation.actionLabel}
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remaining recommendations — compact list */}
      {restRecommendations.length > 0 && (
        <div
          className="bg-white rounded-xl overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
        >
          {restRecommendations.map((rec, i) => {
            const RecIcon = rec.icon;
            const effort = effortConfig[rec.effort];

            return (
              <div
                key={rec.id}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-gray-50/50"
                style={{
                  borderBottom:
                    i < restRecommendations.length - 1
                      ? "1px solid #F3F4F6"
                      : "none",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: C.teal + "08" }}
                >
                  <RecIcon size={16} style={{ color: C.teal, opacity: 0.6 }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      style={{
                        fontFamily: F.body,
                        fontSize: "0.8125rem",
                        color: C.teal,
                        fontWeight: 600,
                      }}
                    >
                      {rec.title}
                    </span>
                    {rec.status === "in-progress" && (
                      <span
                        className="px-1.5 py-0.5 rounded"
                        style={{
                          fontFamily: F.body,
                          fontSize: "0.5rem",
                          color: C.periwinkle,
                          backgroundColor: C.periwinkle + "12",
                          fontWeight: 700,
                          letterSpacing: "0.03em",
                        }}
                      >
                        IN PROGRESS
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="px-1.5 py-0.5 rounded"
                      style={{
                        fontFamily: F.body,
                        fontSize: "0.5625rem",
                        fontWeight: 600,
                        color: effort.color,
                        backgroundColor: effort.bg,
                      }}
                    >
                      {effort.label}
                    </span>
                    <span
                      style={{
                        fontFamily: F.body,
                        fontSize: "0.625rem",
                        color: C.slate,
                        opacity: 0.3,
                      }}
                    >
                      {rec.effortTime}
                    </span>
                  </div>
                </div>

                {/* Revenue uplift badge */}
                <div className="flex items-center gap-1 shrink-0">
                  <TrendingUp size={11} style={{ color: "#16A34A" }} />
                  <span
                    style={{
                      fontFamily: F.heading,
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      color: "#16A34A",
                    }}
                  >
                    {rec.revenueUplift}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleComplete(rec.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    title="Mark as done"
                  >
                    <Check size={13} style={{ color: C.slate, opacity: 0.2 }} />
                  </button>
                  <button
                    onClick={() => navigate(rec.actionRoute)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    title={rec.actionLabel}
                  >
                    <ArrowRight size={13} style={{ color: C.green }} />
                  </button>
                  <button
                    onClick={() => handleDismiss(rec.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    title="Dismiss"
                  >
                    <X size={11} style={{ color: C.slate, opacity: 0.15 }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Completed items (collapsible) */}
      {showCompleted && completedRecs.length > 0 && (
        <div
          className="bg-white rounded-xl overflow-hidden mt-3"
          style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.04)" }}
        >
          <div
            className="px-4 py-2.5"
            style={{ borderBottom: "1px solid #F3F4F6" }}
          >
            <p
              style={{
                fontFamily: F.body,
                fontSize: "0.625rem",
                color: C.slate,
                opacity: 0.35,
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              COMPLETED
            </p>
          </div>
          {completedRecs.map((rec, i) => {
            const RecIcon = rec.icon;
            return (
              <div
                key={rec.id}
                className="flex items-center gap-3 px-4 py-2.5"
                style={{
                  borderBottom:
                    i < completedRecs.length - 1
                      ? "1px solid #F3F4F6"
                      : "none",
                  opacity: 0.5,
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: C.green + "10" }}
                >
                  <Check size={13} style={{ color: C.green }} />
                </div>
                <span
                  style={{
                    fontFamily: F.body,
                    fontSize: "0.75rem",
                    color: C.slate,
                    textDecoration: "line-through",
                    flex: 1,
                  }}
                >
                  {rec.title}
                </span>
                <span
                  style={{
                    fontFamily: F.body,
                    fontSize: "0.625rem",
                    color: C.green,
                    fontWeight: 500,
                  }}
                >
                  {rec.revenueUplift}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* All done state */}
      {activeRecs.length === 0 && (
        <div
          className="bg-white rounded-xl px-5 py-8 text-center"
          style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: C.green + "12" }}
          >
            <Check size={24} style={{ color: C.green }} />
          </div>
          <h3
            style={{
              fontFamily: F.heading,
              fontSize: "1rem",
              fontWeight: 700,
              color: C.teal,
              marginBottom: "0.375rem",
            }}
          >
            You're all caught up!
          </h3>
          <p
            style={{
              fontFamily: F.body,
              fontSize: "0.8125rem",
              color: C.slate,
              opacity: 0.45,
            }}
          >
            We'll surface new recommendations as we add features to your roadmap.
          </p>
        </div>
      )}
    </div>
  );
}
