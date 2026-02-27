import {
  BookOpen,
  MessageCircle,
  Video,
  HelpCircle,
  Search,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Mail,
} from "lucide-react";

const categories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Set up your properties, connect channels, and invite your team",
    articles: 12,
    color: "#2A9D8F",
  },
  {
    icon: Sparkles,
    title: "AI Concierge",
    description: "Learn how to configure and optimize AI-powered guest replies",
    articles: 8,
    color: "#A29BFE",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video guides for common workflows",
    articles: 15,
    color: "#E9C46A",
  },
  {
    icon: HelpCircle,
    title: "FAQs",
    description: "Quick answers to the most common questions",
    articles: 24,
    color: "#264653",
  },
];

const popularArticles = [
  "How to connect your Airbnb account",
  "Setting up automated messaging templates",
  "Creating custom cleaning checklists",
  "Understanding the Unified Calendar",
  "Enabling Direct Booking for your properties",
  "Managing team roles and permissions",
  "Configuring AI Concierge tone and behavior",
  "Handling guest reviews and ratings",
];

export function HelpPage() {
  return (
    <div>
      <div className="mb-8 text-center max-w-xl mx-auto">
        <h1 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.75rem", fontWeight: 700 }}>
          How can we help?
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: "#2D3436", opacity: 0.5, marginTop: "0.5rem" }}>
          Find answers, watch tutorials, or reach out to our support team
        </p>
        <div className="relative mt-5">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#2D3436", opacity: 0.3 }} />
          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full pl-11 pr-4 py-3 rounded-xl"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              outline: "none",
              color: "#2D3436",
              boxShadow: "0 1px 3px rgba(38,70,83,0.06)",
            }}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="bg-white rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all"
            style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: cat.color + "15" }}
              >
                <cat.icon size={20} style={{ color: cat.color }} />
              </div>
              <div className="flex-1">
                <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1rem", fontWeight: 700 }}>
                  {cat.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.5, marginTop: "0.25rem", lineHeight: 1.5 }}>
                  {cat.description}
                </p>
                <p className="mt-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: cat.color, fontWeight: 500 }}>
                  {cat.articles} articles
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "#2D3436", opacity: 0.2, marginTop: "2px" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Popular articles */}
      <div className="bg-white rounded-2xl p-6 mb-8" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}>
        <h2 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem" }}>
          Popular Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {popularArticles.map((article) => (
            <button
              key={article}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-left hover:bg-gray-50 transition-colors"
            >
              <BookOpen size={14} style={{ color: "#2A9D8F", opacity: 0.7, flexShrink: 0 }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653" }}>
                {article}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact support */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="bg-white rounded-2xl p-6 text-center"
          style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "#2A9D8F15" }}>
            <MessageCircle size={22} style={{ color: "#2A9D8F" }} />
          </div>
          <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1rem", fontWeight: 700 }}>
            Live Chat
          </h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.5, marginTop: "0.25rem" }}>
            Chat with our support team in real-time
          </p>
          <button
            className="mt-4 px-5 py-2 rounded-lg text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}
          >
            Start Chat
          </button>
        </div>
        <div
          className="bg-white rounded-2xl p-6 text-center"
          style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "#A29BFE15" }}>
            <Mail size={22} style={{ color: "#A29BFE" }} />
          </div>
          <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1rem", fontWeight: 700 }}>
            Email Support
          </h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.5, marginTop: "0.25rem" }}>
            We usually respond within 2 hours
          </p>
          <button
            className="mt-4 px-5 py-2 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: "#A29BFE15", color: "#A29BFE", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
