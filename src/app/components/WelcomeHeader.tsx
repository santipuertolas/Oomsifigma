import { Sun, TrendingUp, Home, CalendarCheck } from "lucide-react";

const stats = [
  { icon: Home, label: "Active Listings", value: "12", color: "#2A9D8F" },
  { icon: CalendarCheck, label: "Bookings This Month", value: "34", color: "#E9C46A" },
  { icon: TrendingUp, label: "Occupancy Rate", value: "87%", color: "#2A9D8F" },
];

export function WelcomeHeader() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sun size={20} style={{ color: "#E9C46A" }} />
            <span
              className="uppercase tracking-widest"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.6875rem",
                color: "#2A9D8F",
                fontWeight: 600,
              }}
            >
              Friday, February 27
            </span>
          </div>
          <h1
            style={{
              fontFamily: "Nunito, sans-serif",
              color: "#264653",
              fontSize: "1.75rem",
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {greeting}, Sarah
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#2D3436",
              fontSize: "0.9375rem",
              opacity: 0.6,
              marginTop: "0.25rem",
            }}
          >
            You have 2 check-ins and 1 turnover today. Everything is on track.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 bg-white rounded-xl px-5 py-4"
            style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ backgroundColor: stat.color + "15" }}
            >
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.75rem",
                  color: "#2D3436",
                  opacity: 0.5,
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.375rem",
                  color: "#264653",
                  fontWeight: 600,
                }}
              >
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
